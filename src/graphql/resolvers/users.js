import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { dbKeys } from "../../../config";
import User from "../../models/User";

const userResolvers = {
	Mutation: {
		async register(
			_,
			{ registerInput: { password, email } },
			context,
			info
		) {
			/*

            todo 
            -  Valitate user data
            -  Make sure user doesnt exist already
            +  hash the password & create auth token
            +  Switch to Argon2 hashing from bcrypt

            fixme  
            +  argon2 import problem

            */
			let emailSplit = String(email).split("@");
			let username = emailSplit[0];

			// note  hashing passwords before they are saved on the database
			password = await argon2.hash(password, {
				type: argon2.argon2id,
				hashLength: 41,
			});

			const newUser = new User({
				account: {
					username: username,
					tag: username,
					password: password,
					email: email,
					createdAt: new Date().toISOString(),
					lastOnline: new Date().toISOString(),
					private: false,
					blockIds: [],
					pro: false,
				},
				profile: {
					bannerUrl: "default",
					pictureUrl: "default",
					description: "I'm new to Deveelo!",
					followingIds: [],
					followerIds: [],
					friendIds: [],
					friendRqIds: [],
					badges: [],
					linkedProfiles: [],
				},
				status: "online",
				Social: {
					postIds: [],
					blogIds: [],
					groupIds: [],
					betaIds: {
						hostedIds: [],
						joinedIds: [],
					},
					chatIds: [],
				},
			});

			const res = await newUser.save();

			const token = jwt.sign(
				{
					id: res.id,
					email: res.account.email,
					tag: res.account.tag,
				},
				dbKeys.SECRET_KEY,
				{ expiresIn: 900 } //15 minutes
			);

			return {
				id: res._id,
				...res._doc,
				token,
			};
		},
	},
};

export default userResolvers;
