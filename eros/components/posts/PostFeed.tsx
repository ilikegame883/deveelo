import { useNewPostsQuery } from "../../hooks/backend/generated/graphql";
import { PostType } from "../../lib/postTypes";
import feedStyles from "../../styles/posts/feed.module.css";
import PostCard from "./PostCard";

export const PostFeed = ({ amount }: { amount: number }) => {
	const { data, loading, error } = useNewPostsQuery({
		variables: {
			number: amount,
		},
		fetchPolicy: "no-cache",
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const posts: PostType[] = data.getPosts as any;

	return (
		<div className={feedStyles.contentContainer}>
			{posts.map((post) => (
				<PostCard key={posts.indexOf(post).toString()} post={post} />
			))}
		</div>
	);
};
