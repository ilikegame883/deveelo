import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import "dotenv/config";

import { typeDefs } from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { authMiddlewares } from "./graphql/middleware";

// development  change mongodb user password & access

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const middleware = [...authMiddlewares];

const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const server = new ApolloServer({
	schema: schemaWithMiddleware,
	context: ({ req, res }) => ({ req, res }),
});

//connect to the mongodb database
mongoose
	.connect(process.env.MONGODB_KEY!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("database connected");
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url} 🎉`);
	});
