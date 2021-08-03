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

export interface UserType {
	id: string;
	token: string;
	account: {
		username: string;
		tag: string;
		short: string;
		password: string;
		email: string;
		createdAt: string;
		lastOnline: string;
		private: boolean;
		blockedIds: [string];
		pro: boolean;
	};
	profile: {
		bannerUrl: string;
		pictureUrl: string;
		description: string;
		followingIds: [string];
		followerIds: [string];
		friendIds: [string];
		friendRqIds: [string];
		badges: [string];
		linkedProfiles: [string];
	};
	status: string;
	social: {
		postIds: [string];
		blogIds: [string];
		groupIds: [string];
		betaIds: {
			hostedIds: [string];
			joinedIds: [string];
		};
		chatIds: [string];
	};
}

export default model("User", userSchema);
