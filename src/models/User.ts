import { model, Schema } from "mongoose";

const userSchema = new Schema({
	id: String,
	token: String,
	account: {
		username: String,
		tag: String,
		short: String,
		password: String,
		email: String,
		createdAt: String,
		lastOnline: String,
		private: Boolean,
		blockedIds: [String],
		pro: Boolean,
	},
	profile: {
		bannerUrl: String,
		pictureUrl: String,
		description: String,
		followingIds: [String],
		followerIds: [String],
		friendIds: [String],
		friendRqIds: [String],
		badges: [String],
		linkedProfiles: [String],
	},
	status: String,
	social: {
		postIds: [String],
		blogIds: [String],
		groupIds: [String],
		betaIds: {
			hostedIds: [String],
			joinedIds: [String],
		},
		chatIds: [String],
	},
});

export default model("User", userSchema);
