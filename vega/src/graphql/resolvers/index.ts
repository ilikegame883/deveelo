import postsResolvers from "./posts";
import userResolvers from "./users";

const resolvers = {
	Query: {
		...userResolvers.Query,
		...postsResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
};

export default resolvers;
