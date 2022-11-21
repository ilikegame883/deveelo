import Image from "next/image";
import { postLoader } from "../../hooks/loaders";
import { PostType } from "../../lib/postTypes";
import styles from "../../styles/posts/postcard.module.css";

interface PC_Props {
	post: PostType;
}

const PostCard = ({ post }: PC_Props) => {
	const { body, imageUrls, user_id, createdAt, likes, comments } = post;

	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<Image loader={postLoader} src={imageUrls[0]} className={styles.image} layout="fill" priority={true} objectFit="cover" />
			</div>
		</div>
	);
};

export default PostCard;
