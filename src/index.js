import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import { typeDefs } from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { dbKeys } from "../config.js";

// development  change mongodb user password & access

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

//connect to the mongodb database
mongoose
	.connect(dbKeys.MONGODB, {
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
