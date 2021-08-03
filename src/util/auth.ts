import { UserType } from "../models/User";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export const createAccessToken = (user: UserType): string => {
	return sign(
		{
			id: user.id,
			tag: user.account.tag,
		},
		process.env.ACCESS_TOKEN_SECRET!,
		{ expiresIn: "15m" } //15 minutes
	);
};

export const createRefreshToken = (user: UserType): string => {
	return sign(
		{
			id: user.id,
		},
		process.env.REFRESH_TOEKEN_SECRET!,
		{ expiresIn: "7d" } //15 minutes
	);
};
