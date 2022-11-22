import Image from "next/image";

import NameGroup from "../micro/NameGroup";
import styles from "../../styles/posts/postcard.module.css";

import { postLoader } from "../../hooks/loaders";
import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { timeAgo } from "../../lib/time";
import { PostType } from "../../lib/postTypes";
import { SearchUserIdType } from "../../lib/userTypes";

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
					<div className={styles.nameWrapper}>
						<NameGroup username={user.account.username} badges={user.profile.badges} size={4} showBadges={true} disableSpacer={true} />
					</div>
					<p className={styles.date}>{timeAgo(createdAt)} ago</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
