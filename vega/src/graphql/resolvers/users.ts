import argon2 from "argon2";
import { UserInputError } from "apollo-server-errors";
import { ObjectID } from "mongodb";

import ValidateRegisterInput from "../../util/validators";
import User, { UserType } from "../../models/User";
import Context from "../../context";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "../../util/auth";

const successfulLoginHandler = (user: UserType, { res }: Context): string => {
	sendRefreshToken(res, createRefreshToken(user));
	console.log(`Attempted login w/ user \n ${user.account.email}`);

	return createAccessToken(user);
};

const userResolvers = {
	Query: {
		async myAccount(_parent: any, _args: any, context: Context): Promise<UserType> {
			const user: UserType = await User.findById(new ObjectID(context.payload!.id));
			console.log("my Account attempted");

			if (!user) {
				throw new Error("user not found");
			}

			return user;
		},
	},
	Mutation: {
		async login(_: any, { input, password }: { input: string; password: string }, context: Context) {
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
			let user: UserType;
			if (isEmail) {
				user = await User.findOne({ "account.email": input });
			} else {
				user = await User.findOne({ "account.tag": input });
			}

			if (!user) {
				if (isEmail) {
					throw new UserInputError("User not found", {
						errors: {
							general: "no user is registered with this email",
						},
					});
				} else {
					throw new UserInputError("User not found", {
						errors: {
							general: "no user is registered with this username",
						},
					});
				}
			}

			const match = await argon2.verify(user.account.password, password);
			if (!match) {
				throw new UserInputError("Wrong credentials", {
					errors: {
						general: "incorrect password",
					},
				});
			}

			// note  successful login
			console.log("login success stage 1");

			sendRefreshToken(context.res, createRefreshToken(user));

			return {
				accessToken: successfulLoginHandler(user, context),
				user,
			};
		},
		async register(_: any, { email, password }: { email: string; password: string }, context: Context) {
			email = String(email).trim();

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
			const CheckAndGenerateUsername = async (length: number, testTag: string, repeat: boolean, cycleNum: number): Promise<void> => {
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

				tag = testTag;
				return;
			};

			//check if a user with the tag already exists & add a random # to tag
			await CheckAndGenerateUsername(max, tag, false, 0);

			//check if user exists
			const user: UserType = await User.findOne({ "account.email": email });
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

			await User.init();

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
					blockedIds: [],
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

			try {
				await newUser.save();
			} catch (error) {
				throw new Error("Unable to save user to database");
			}

			return {
				accessToken: successfulLoginHandler(newUser, context),
				newUser,
			};
		},
	},
};

export default userResolvers;
