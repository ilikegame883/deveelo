import { model, Schema } from "mongoose";
import { UserType } from "./User";

const postSchema = new Schema({
	imageUrls: [String],
	body: String,
	tags: [String],
	createdAt: String,
	username: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	comments: [
		{
			body: String,
			imageUrl: String,
			user: {
				username: String,
				tag: String,
				picutreUrl: String,
				status: String,
			},
		},
	],
	likes: [
		{
			user: {
				username: String,
				tag: String,
				picutreUrl: String,
				status: String,
			},
			createdAt: String,
		},
	],
});

export interface PostType {
	imageUrls: [string];
	body: string;
	tags: [string];
	createdAt: string;
	username: string;
	user: UserType;
	comments: [
		{
			body: string;
			imageUrl: string;
			user: {
				username: string;
				tag: string;
				picutreUrl: string;
				status: string;
			};
		}
	];
	likes: [
		{
			user: {
				username: string;
				tag: string;
				picutreUrl: string;
				status: string;
			};
			createdAt: string;
		}
	];
}

export default model("Post", postSchema);
