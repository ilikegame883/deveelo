import { ResolversComposerMapping, composeResolvers } from "@graphql-tools/resolvers-composition";

import resolvers from "../resolvers";
import { MyResolversComposition } from "src/util/middlewareType";
import { loggedInOnlyAuth } from "./isAuth";

//where auth middleware is compiled

//middleware that does nothing, put into compostion for resolvers w/o middleware
const noMiddleware = (): MyResolversComposition => (next) => async (parent, args, context, info) => {
	//eventually, this will become a universal metrics middleware for gauging total site activity
	const result = await next(parent, args, context, info);
	return result;
};

//list of resolvers which use middleware
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

//based on that list, assign a number of specified middlewares to each resolver
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
const composedResolvers = composeResolvers(resolvers, resolversComposition);
