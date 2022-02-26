import { useEffect, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import sidebarStyles from "../styles/sidebar.module.css";
import NameGroup from "./micro/NameGroup";
import TextButton from "./micro/TextButton";
import ProfilePicture from "./micro/ProfilePicture";
import Image from "next/image";

import { useFindMinProfileByTagQuery, useMyAccountMinProfileQuery, useRandomMinProfileQuery } from "../hooks/backend/generated/graphql";
import { getAccessToken } from "../accessToken";
import SocialList from "./minor/SocialList";

interface sidebarProps {
	hardEdge?: boolean;
}

const Sidebar = ({ hardEdge }: sidebarProps) => {
	hardEdge ??= true;

	const token = getAccessToken();
	const loggedIn: boolean = token !== "";
	let user: any = null;

	const loadingSidebar = (
		<div className={hardEdge ? sidebarStyles.sidebar_full : sidebarStyles.sidebar}>
			{/*Banner*/}
			<div className={sidebarStyles.banner} />
			{/*User Profile*/}
			<div className={sidebarStyles.profileContainer}>
				<div className="loading" />
			</div>
		</div>
	);

	if (!window) {
		return loadingSidebar;
	}

	const storage = window.localStorage;
	const [uTag, setSideProf] = useState(storage.getItem("side_prof"));

	//handle seting local store update on mount
	useEffect(() => {
		const handleUpdate = (e: CustomEvent) => {
			setSideProf(e.detail);
		};
		setTimeout(() => {
			const side = document.getElementById("sidebar");

			if (side) {
				console.log("binded");

				side.addEventListener("updateSidebar", handleUpdate);
			}
		}, 1000);

		return () => {
			//remove listener on unmount
			const side = document.getElementById("sidebar");

			if (side) {
				side.removeEventListener("updateSidebar", handleUpdate);
			}
		};
	}, []);

	let buttons: any = null;
	if (uTag !== null && uTag !== "") {
		const { data, loading, error } = useFindMinProfileByTagQuery({
			variables: {
				tagInput: uTag,
			},
		});

		if (loading && !data) {
			return loadingSidebar;
		}
		if (error) {
			return (
				<div className={hardEdge ? sidebarStyles.sidebar_full : sidebarStyles.sidebar}>
					<p>{error.message}</p>
				</div>
			);
		}

		user = data.findUserByTag;

		if (loggedIn) {
			const payload: any = jwt_decode<JwtPayload>(token);

			if (user._id === payload.id) {
				buttons = (
					<>
						<TextButton colorKey="gold" text="Edit Profile" />
					</>
				);
			}
		}

		buttons ??= (
			<>
				<TextButton colorKey="red" text="Unfollow" />
				<TextButton colorKey="green" text="Friend" />
			</>
		);
	} else if (loggedIn) {
		const { data, loading, error } = useMyAccountMinProfileQuery();
		if (loading && !data) {
			return loadingSidebar;
		}
		if (error) {
			return <div>An error has occured</div>;
		}

		//after data fetch
		user = data.myAccount;

		// if(user.account.tag === mytag){

		// }
		buttons = (
			<>
				<TextButton colorKey="gold" text="Edit Profile" />
			</>
		);
	} else {
		const { data, loading, error } = useRandomMinProfileQuery();

		if (loading && !data) {
			return loadingSidebar;
		}
		if (error) {
			return <div>An error has occured</div>;
		}

		//after data fetch
		user = data.randomUser;
		buttons = (
			<>
				<TextButton colorKey="gold" text="Follow" />
				<TextButton colorKey="green" text="Friend" />
			</>
		);
	}

	return (
		<div id="sidebar" className={hardEdge ? sidebarStyles.sidebar_full : sidebarStyles.sidebar}>
			<SimpleBar className="fillfill">
				{/*Banner*/}
				<div className={sidebarStyles.banner}>
					<Image className={sidebarStyles.bannerImage} alt="profile banner" src="/user_content/p_banners/pinkdunes.png" layout="fill" priority={true} objectFit="cover" />
				</div>
				{/*User Profile*/}
				<div className={sidebarStyles.profileContainer}>
					<div className={sidebarStyles.p_cvlayoutzero}>
						{/*layout group with pfp & followers/ing*/}
						<div className={sidebarStyles.p_chlayout15}>
							<div className={sidebarStyles.p_stats}>
								<p className={sidebarStyles.p_stats_num}>{user.profile.followingIds.length}</p>
								<p className={sidebarStyles.p_stats_label}>Following</p>
							</div>
							<ProfilePicture size="large" source={user.profile.pictureUrl} status={user.status} />
							<div className={sidebarStyles.p_stats}>
								<p className={sidebarStyles.p_stats_num}>{user.profile.followerIds.length}</p>
								<p className={sidebarStyles.p_stats_label}>Followers</p>
							</div>
						</div>
						{/*name & badges*/}
						<NameGroup username={user.account.username} size={1} showBadges={true} badges={user.profile.badges} />
						<p className={sidebarStyles.p_tag}>@{user.account.tag}</p>
					</div>

					<p className={sidebarStyles.p_description}>{user.profile.description}</p>

					<div className={sidebarStyles.buttonContainer}>{buttons}</div>

					{/* Following/Friend List */}
					<SocialList followingIds={user.profile.followingIds} friendIds={user.profile.friendIds} />
				</div>
			</SimpleBar>
		</div>
	);
};

export default Sidebar;
