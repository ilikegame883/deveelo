import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-errors";

import ValidateRegisterInput from "../../../util/validators";
import { dbKeys } from "../../../config";
import User from "../../models/User";

const userResolvers = {
	Mutation: {
		async login(_, { input, password }) {
			//check if email or username [tag]
			const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
			const isEmail = input.match(regEx);

			//validate input
			if (isEmail) {
				let { valid, errors } = ValidateRegisterInput(input, "email");
				if (!valid) {
					throw new UserInputError("Errors", { errors });
				}
			} else {
				let { valid, errors } = ValidateRegisterInput(input, "username");
				if (!valid) {
					throw new UserInputError("Errors", { errors });
				}
			}

			//validate password
			let { valid, errors } = ValidateRegisterInput(password, "password");
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			//check if user exists
			let user;
			if (isEmail) {
				user = await User.findOne({ "account.email": input });
			} else {
				user = await User.findOne({ "account.tag": input });
			}

			if (!user) {
				if (isEmail) {
					throw new UserInputError("email not found", {
						errors: {
							email: "no user is registered with this email",
						},
					});
				} else {
					throw new UserInputError("username not found", {
						errors: {
							username: "no user is registered with this username",
						},
					});
				}
			}
			return user;
		},
		async register(_, { registerInput: { password, email } }) {
			/*

            todo 
            +  Valitate user data
			+  check & generate random number tags
            +  Make sure user doesnt exist already
            +  hash the password & create auth token
            +  Switch to Argon2 hashing from bcrypt
			- refresh & access token setup

            */

			email = String(email).trim();

			// note
			//#region Validate Input
			//validate email before using it to make the username
			let { valid, errors } = ValidateRegisterInput(email, "email");
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			let emailSplit = String(email).split("@");
			let username = String(emailSplit[0].trim()).replaceAll("@", "");

			//validate username
			({ valid, errors } = ValidateRegisterInput(username, "username"));
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			let tag = username;

			//validate password
			({ valid, errors } = ValidateRegisterInput(password, "password"));
			if (!valid) {
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

			// note  this is where ba stopped at 26:46, registers user data in database but does not handle tokens yet

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
