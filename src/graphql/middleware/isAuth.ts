import { NewIMiddlewareResolver } from "src/util/middlewareType";

const loggedInOnlyAuth: NewIMiddlewareResolver = async (reslolve, parent, args, context, info) => {};

export const isAuth = {
	Query: {
		getPosts: loggedInOnlyAuth,
	},
};
