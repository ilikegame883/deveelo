import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware as applyGqlMiddle } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { authMiddlewares } from "./graphql/middleware";
import User, { UserType } from "./models/User";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "./util/auth";

// development  change mongodb user password & access - cors origin to site domain
const initServer = async () => {
	const app = express();

	app.use(
		cors({
			origin: "https://studio.apollographql.com", //http://localhost:3000
			credentials: true,
		})
	);
	//api routes
	app.use(cookieParser());
	app.get("/", (_req, res) => res.send("hello"));
	app.post("/refresh_token", async (req, res) => {
		//check if refresh token is correct & send new access token
		const token = req.cookies.lid;
		if (!token) {
			//they are not signed in
			return res.send({ ok: false, accessToken: "" });
		}

		let payload: any = null;
		try {
			payload = verify(token, process.env.REFRESH_TOEKEN_SECRET!);
		} catch (error) {
			console.log(error);
			return res.send({ ok: false, accessToken: "" });
		}

		//token is valid, send access token
		const user: UserType = await User.findById(payload.id);

		if (!user) {
			return res.send({ ok: false, accessToken: "" });
		}

		//refresh the refresh token
		sendRefreshToken(res, createRefreshToken(user));

		//login the user (send access token)
		return res.send({ ok: true, accessToken: createAccessToken(user) });
	});

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const middleware = [...authMiddlewares];
	const schemaWithMiddleware = applyGqlMiddle(schema, ...middleware);

	const server = new ApolloServer({
		schema: schemaWithMiddleware,
		context: ({ req, res }) => ({ req, res }),
	});

	await server.start();

	server.applyMiddleware({
		app,
		cors: false, // development  set cors paths
	});

	//connect to the mongodb database
	mongoose
		.connect(process.env.MONGODB_KEY!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("📬 - database connected");
			return app.listen(parseInt(process.env.PORT!), () => {
				console.log(`🚀 - Server running at http://localhost:4000`);
			});
		});
};

initServer().catch((err) => {
	console.log(err);
});
