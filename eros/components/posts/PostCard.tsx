import { PostType } from "../../lib/postTypes";
import styles from "../../styles/posts/postcard.module.css";

interface PC_Props {
	post: PostType;
}

const PostCard = ({ post }: PC_Props) => {
	const { body, imageUrls, user_id, createdAt, likes, comments } = post;

	return <div>PostCard</div>;
};

export default PostCard;
