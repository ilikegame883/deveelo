import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware as applyGqlMiddle } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { typeDefs } from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { authMiddlewares } from "./graphql/middleware";

// development  change mongodb user password & access - cors origin to site domain
const initServer = async () => {
	const app = express();

	app.use(
		cors({
			origin: "https://studio.apollographql.com", //http://localhost:3000
			credentials: true,
		})
	);
	app.get("/", (_req, res) => res.send("hello"));
	app.post("/", (_req, res) => res.send("post test"));

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
