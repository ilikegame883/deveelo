import Image from "next/image";
import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { postLoader } from "../../hooks/loaders";
import { PostType } from "../../lib/postTypes";
import { timeAgo } from "../../lib/time";
import { SearchUserIdType } from "../../lib/userTypes";
import styles from "../../styles/posts/postcard.module.css";

interface PC_Props {
	post: PostType;
}

const PostCard = ({ post }: PC_Props) => {
	const { body, imageUrls, user_id, createdAt, likes, comments } = post;

	const { data, loading, error } = useFindCardUsersByIdsQuery({
		variables: {
			idList: [user_id],
		},
	});

	if (loading && !data) {
		return <div />;
	}
	if (error) {
		return <div>Error occurred</div>;
	}

	const user = data.findUsersById[0] as SearchUserIdType;

	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<Image loader={postLoader} src={imageUrls[0]} className={styles.image} layout="fill" priority={true} objectFit="cover" />
			</div>
			<div className={styles.header}>
				<div className={styles.nameGroup}>
					<p className={styles.date}>{timeAgo(createdAt)} ago</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
