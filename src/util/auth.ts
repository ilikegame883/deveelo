import { UserType } from "../models/User";
import { sign } from "jsonwebtoken";

import { dbKeys } from "../../config";

export const createAccessToken = (user: UserType): string => {
	return sign(
		{
			id: user.id,
			tag: user.account.tag,
		},
		dbKeys.SECRET_KEY,
		{ expiresIn: "15m" } //15 minutes
	);
};

export const createRefreshToken = (user: UserType): string => {
	return sign(
		{
			id: user.id,
		},
		dbKeys.R_SECRET_KEY,
		{ expiresIn: "7d" } //15 minutes
	);
};
