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
		return <Meta title="" description="" />;
	} else if (error) {
		return null;
	}
	const user = data.findUserByTag;
	const postCount = user.social.postIds.length;
	const blogCount = user.social.blogIds.length;
	const followers = user.profile.followerIds.length;
	const following = user.profile.followingIds.length;

	//handle pfp
	const rawUrl = user.profile.pictureUrl;
	const local = rawUrl.startsWith("/");
	const processedUrl = local ? `https://www.deveelo.com${rawUrl}` : rawUrl;

	return (
		<Meta
			title={`${user.account.username} | @${user.account.tag} on Deveelo`}
			description={`${data.findUserByTag.profile.description} — ${postCount} posts | ${blogCount} devlogs | ${followers} followers | ${following} following`}
			url={`https://www.deveelo.com/${tag}`}
			image={processedUrl}
		/>
	);
};

export default ProfilePage;
