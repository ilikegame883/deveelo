import sidebarStyles from "../styles/sidebar.module.css";
import NameGroup from "./NameGroup";
import TextButton from "./TextButton";
import ProfilePicture from "./ProfilePicture";
import Image from "next/image";

const Sidebar = () => {
	const user = {
		Username: "Maddyfrombur",
		Tag: "maddyfrompittsburg",
		Description: "Epic gamedev person and reactjs💖 developer. Worked with both Unity & Unreal Engine",
		Badges: ["verified"],
	};
	const followers = "17.4k";
	const following = "1.3k";

	return (
		<div className={sidebarStyles.sidebar}>
			{/*Banner*/}
			<div className={sidebarStyles.banner}>
				<Image className={sidebarStyles.bannerImage} alt="profile banner" src="/user_content/p_banners/pinkdunes.png" layout="fill" objectFit="cover" />
			</div>
			{/*User Profile*/}
			<div className={sidebarStyles.profileContainer}>
				<div className={sidebarStyles.p_cvlayoutzero}>
					{/*layout group with pfp & followers/ing*/}
					<div className={sidebarStyles.p_chlayout15}>
						<div className={sidebarStyles.p_stats}>
							<p className={sidebarStyles.p_stats_num}>{following}</p>
							<p className={sidebarStyles.p_stats_label}>Following</p>
						</div>
						<ProfilePicture size="large" source="/user_content/p_pictures/maddy.jpg" />
						<div className={sidebarStyles.p_stats}>
							<p className={sidebarStyles.p_stats_num}>{followers}</p>
							<p className={sidebarStyles.p_stats_label}>Followers</p>
						</div>
					</div>
					{/*name & badges*/}
					<NameGroup username={user.Username} size={1} showBadges={true} badges={user.Badges} />
					<p className={sidebarStyles.p_tag}>@{user.Tag}</p>
				</div>

				<p className={sidebarStyles.p_description}>{user.Description}</p>

				<div className={sidebarStyles.buttonContainer}>
					<TextButton colorKey="gold" text="Follow" />
					<TextButton colorKey="green" text="Friend" />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
