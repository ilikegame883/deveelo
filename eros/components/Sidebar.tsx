import Image from "next/image";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import sidebarStyles from "../styles/sidebar.module.css";
import NameGroup from "./micro/NameGroup";
import TextButton from "./micro/TextButton";
import ProfilePicture from "./micro/ProfilePicture";
import SocialList from "./minor/SocialList";

import { useFindMinProfileByTagQuery, useFollowMutation, useMyAccountMinProfileQuery, useRandomMinProfileQuery, useUnfollowMutation } from "../hooks/backend/generated/graphql";
import { getPayload } from "../accessToken";
import { updateSidebar } from "../hooks/socialhooks";

/* todo 
	-  Move follow logic back to hook
	-  Switch to unfollow button
	-  Persist unfollow button
	-  Preview sidebar loading display
	-  Content animate in
*/

interface sidebarProps {
	hardEdge?: boolean;
}

const Sidebar = ({ hardEdge }: sidebarProps) => {
	const [followUser] = useFollowMutation();
	const [unfollowUser] = useUnfollowMutation();

	hardEdge ??= true;

	//componentwide establishment of if we are logged in
	//and if we are, our user's id through the payload.id
	//if we get a payload back, we know that we are logged in
	let payload: any = getPayload();
	const loggedIn = payload !== null;

	//this is who's profile will be loaded into the sidebar
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
	const [rerender, setRerender] = useState(0);

	//used to increase follow count and change button on new follow
	const [followMod, setFollowMod] = useState(0);

	//handle seting local store update on mount
	useEffect(() => {
		const handleUpdate = (e: CustomEvent) => {
			if (e.detail === null) {
				/*
				> Arbitrary reloading of the sidebar
				This can be used to rerender the sidebar any number of times:
				uses the current second and millisecond to generate
				a new number to set that new state int value
				*/
				const date = new Date();
				let randomSeed = date.getSeconds() + date.getMilliseconds();
				setRerender(randomSeed);
			} else if (e.detail === "newfollow") {
				/*
				> When the user clicks the follow button
				set the followMod to 1, this will be used to add a 1 to
				the follower count and also change the button to unfollow,
				this has to be done manually the first time, then it will
				be handled automatically by the gql queries
				*/
				setFollowMod(1);
			} else if (e.detail === "newunfollow") {
				/*
				> When the user clicks the unfollow button
				set the followMod to -1, this will be used to subtract 1 from
				the follower count and also change the button to follow
				*/
				setFollowMod(-1);
			} else {
				//update to change the profile shown without link change
				setSideProf(e.detail);
			}
		};
		setTimeout(() => {
			//add event listener to the sidebar which
			//listens for events telling to update sidebar
			//the source of these dispatched events are socialhoots.ts
			const side = document.getElementById("sidebar");

			if (side) {
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

	//the following ifesle will determine buttons loaded
	let buttons: any = null;
	if (uTag !== null && uTag !== "") {
		//logged in, possibly showing other profile
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
			if (user._id === payload.id) {
				buttons = (
					<>
						<TextButton colorKey="gold" text="Edit Profile" />
					</>
				);
			}
		}

		const handleFollow = async (id: string) => {
			try {
				const response = await followUser({
					variables: {
						targetId: id,
					},
				});

				if (response && response.data) {
					//check if the operation went through w/o errors
					if (response.data.follow.success) {
						//when user clicks the follow button, increase
						//the follower number of the current user bc it
						//will not realize the new follow until next reload
						updateSidebar("newfollow");
					}
				}
			} catch (error) {
				console.log(error);
			}

			return;
		};

		const handleUnfollow = async (id: string) => {
			try {
				const response = await unfollowUser({
					variables: {
						targetId: id,
					},
				});

				if (response && response.data) {
					//check if the operation went through w/o errors
					if (response.data.unfollow.success) {
						//when user clicks the follow button, increase
						//the follower number of the current user bc it
						//will not realize the new follow until next reload
						updateSidebar("newunfollow");
					}
				}
			} catch (error) {
				console.log(error);
			}

			return;
		};

		//add the un/follow user acions, then make the resolver, and call it from socialhooks.ts
		buttons ??= (
			<>
				<TextButton colorKey="gold" text="Follow" action={() => handleFollow(user._id)} />
				<TextButton colorKey="green" text="Friend" />
			</>
		);
	} else if (loggedIn) {
		//logged in, no selected so show self
		const { data, loading, error } = useMyAccountMinProfileQuery();
		if (loading && !data) {
			return loadingSidebar;
		}
		if (error) {
			return <div>An error has occured</div>;
		}

		//after data fetch
		user = data.myAccount;

		buttons = (
			<>
				<TextButton colorKey="gold" text="Edit Profile" />
			</>
		);
	} else {
		//logged out, show random
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

	//reduce to variable bc we will be using this a bit in the html
	let userFollowerCount = user.profile.followerIds.length;

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
								<p className={sidebarStyles.p_stats_num}>{userFollowerCount + followMod}</p>
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
