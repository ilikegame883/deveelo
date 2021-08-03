import postsResolvers from "./posts";
import userResolvers from "./users";

const resolvers = {
	Query: {
		...postsResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
};

export default resolvers;
