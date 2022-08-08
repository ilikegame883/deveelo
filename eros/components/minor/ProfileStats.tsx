import statStyles from "../../styles/minor/profilestats.module.css";

interface StatsProps {
	following: number;
	followers: number;
	posts: number;
}

const ProfileStats = ({ following, followers, posts }: StatsProps) => {
	console.log(posts);

	return (
		<div className={statStyles.largeWrapper}>
			<div className={statStyles.item}>
				{/* sometimes postsids is undefined */}
				<p className={statStyles.statistic}>{posts ? posts : 0}</p>
				<p className={statStyles.label}>Posts</p>
			</div>
			<div className={statStyles.divider} />
		</div>
	);
};

export default ProfileStats;
