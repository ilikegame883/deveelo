import { ResolversComposition, ResolversComposerMapping } from "@graphql-tools/resolvers-composition";
import resolvers from "../resolvers";

import { isAuth, loggedInOnlyAuth } from "./isAuth";

export const authMiddlewares = [isAuth]; //middle, where auth middleware is compiled

//assign middleware to resolvers
// const resolversComposition: ResolversComposerMapping<typeof resolvers> = {
//     Query: {
// 		myAccount: [loggedInOnlyAuth()],
// 	},
// 	// Mutation: {
// 	// 	logout: loggedInOnlyAuth(),
// 	// 	follow: loggedInOnlyAuth(),
// 	// 	unfollow: loggedInOnlyAuth(),
// 	// 	updateProfile: loggedInOnlyAuth(),
// 	// },
// };

interface MiddlewareEnabledResolvers {
	Query: {
		myAccount: any;
	};
	Mutation: {
		logout: any;
		follow: any;
		unfollow: any;
		updateProfile: any;
	};
}

const resolversComposition: ResolversComposerMapping<MiddlewareEnabledResolvers> = {
	Query: {
		myAccount: [loggedInOnlyAuth()],
	},
	Mutation: {
		logout: [loggedInOnlyAuth()],
		follow: [loggedInOnlyAuth()],
		unfollow: [loggedInOnlyAuth()],
		updateProfile: [loggedInOnlyAuth()],
	},
};
