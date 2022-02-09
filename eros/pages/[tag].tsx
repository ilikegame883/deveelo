import React from "react";
import { useRouter } from "next/router";
import { setSideBarByTag } from "../hooks/setSidebar";
import Meta from "../components/micro/Meta";
import { useFindMinProfileByTagQuery } from "../hooks/backend/generated/graphql";

const ProfilePage = () => {
	const router = useRouter();
	const { tag } = router.query;

	const { data, loading, error } = useFindMinProfileByTagQuery({
		variables: {
			tagInput: tag as string,
		},
	});

	setSideBarByTag(tag as string);

	if (loading && !data) {
		return null;
	} else if (error) {
		return null;
	}
	const user = data.findUserByTag;
	const postCount = user.social.postIds.length;
	const blogCount = user.social.blogIds.length;
	const followers = user.profile.followerIds.length;
	const following = user.profile.followingIds.length;

	return (
		<Meta
			title={`${user.account.username} | @${user.account.tag} on Deveelo`}
			description={`${data.findUserByTag.profile.description} — ${postCount} posts | ${blogCount} devlogs | ${followers} followers | ${following} following`}
			url={`https://www.deveelo.com/${tag}`}
			image={user.profile.pictureUrl}
		/>
	);
};

export default ProfilePage;
