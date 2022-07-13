import { GraphQLUpload } from "graphql-upload";

import postsResolvers from "./posts";
import userResolvers from "./users";

const resolvers = {
	// This maps the `Upload` scalar to the implementation provided
	// by the `graphql-upload` package.
	Upload: GraphQLUpload,

	Query: {
		...userResolvers.Query,
		...postsResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
};

export default resolvers;
