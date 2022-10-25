import { model, Schema } from "mongoose";

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
				picutreUrl: String,
				status: String,
			},
		},
	],
	likes: [
		{
			user: {
				username: String,
				picutreUrl: String,
				status: String,
			},
			createdAt: String,
		},
	],
});

export default model("Post", postSchema);
