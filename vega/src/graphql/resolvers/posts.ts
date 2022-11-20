import Context from "src/context";
import Post from "../../models/Post";

const postsResolvers = {
	Query: {
		getPosts: async (_parent: any, { number }: { number: number }, _context: Context) => {
			try {
				const posts = await Post.find({ $query: {}, $orderby: { $natural: -1 } }).limit(number);
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

export default postsResolvers;
