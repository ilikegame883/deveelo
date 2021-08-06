import { verify } from "jsonwebtoken";
import { NewIMiddlewareResolver } from "src/util/middlewareType";

const loggedInOnlyAuth: NewIMiddlewareResolver = async (_reslolve, _parent, _args, context, _info) => {
	//header looks like: bearer 1234abcd...
	const authorization = context.req.headers["authorization"];
	if (!authorization) {
		throw new Error("not authenticated");
	}

	try {
		const token = authorization.split(" ")[1];
		const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
		context.payload = payload;
	} catch (err) {
		console.log(err);
		throw new Error("not authenticated");
	}
};

export const isAuth = {
	Query: {
		myAccount: loggedInOnlyAuth,
	},
};
