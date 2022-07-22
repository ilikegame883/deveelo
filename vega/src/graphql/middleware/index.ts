import { ResolversComposerMapping } from "@graphql-tools/resolvers-composition";

import { loggedInOnlyAuth } from "./isAuth";

//where auth middleware is compiled

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

//compose the resolver map, send to index.ts, use in schema
