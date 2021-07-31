import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-errors";

import ValidateRegisterInput from "../../../util/validators";
import { dbKeys } from "../../../config";
import User from "../../models/User";

const userResolvers = {
	Mutation: {
		async register(_, { registerInput: { password, email } }) {
			/*

            todo 
            -  Valitate user data
			+  check & generate random number tags
            +  Make sure user doesnt exist already
            +  hash the password & create auth token
            +  Switch to Argon2 hashing from bcrypt

            fixme  
            +  argon2 import problem

            */

			email = String(email).trim();

			//#region Validate Input  note
			//validate email before using it to make the username
			const emailRes = ValidateRegisterInput(email, "email");
			if (!emailRes.valid) {
				const errors = emailRes.errors;
				throw new UserInputError("Errors", { errors });
			}

			let emailSplit = String(email).split("@");
			let username = String(emailSplit[0].trim()).replaceAll("@", "");

			//validate username
			const usernameRes = ValidateRegisterInput(username, "username");
			if (!usernameRes.valid) {
				const errors = usernameRes.errors;
				throw new UserInputError("Errors", { errors });
			}

			let tag = username;

			//validate password
			const passwordRes = ValidateRegisterInput(password, "password");
			if (!passwordRes.valid) {
				const errors = passwordRes.errors;
				throw new UserInputError("Errors", { errors });
			}
			//#endregion
			let max = 9;
			const CheckAndGenerateUsername = async (length, testTag, repeat, cycleNum) => {
				const matchUser = await User.findOne({
					"account.tag": testTag,
				});

				if (matchUser) {
					//the username is already taken
					if (repeat) {
						//reset test-tag before adding numbers if the numbered name was taken
						testTag = tag;
					}
					testTag += Math.floor(Math.random() * length) + 1;

					if (max < 999 || cycleNum > 10) {
						//add 9 to end of number for next pass
						max = parseInt(`${max}${9}`);
					}

					return await CheckAndGenerateUsername(max, testTag, true, cycleNum++);
				}

				return (tag = testTag);
			};

			//check if a user with the tag already exists & add a random # to tag
			await CheckAndGenerateUsername(max, tag, false, 0);

			//check if user exists
			const user = await User.findOne({ "account.email": email });
			if (user) {
				throw new UserInputError("email taken", {
					errors: {
						email: "An account is already registered with email",
					},
				});
			}

			//hashing passwords before they are saved on the database
			password = await argon2.hash(password, {
				type: argon2.argon2id,
				hashLength: 41,
			});

			const newUser = new User({
				account: {
					username: username,
					tag: tag,
					short: "",
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
