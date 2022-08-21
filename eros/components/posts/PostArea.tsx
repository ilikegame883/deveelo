import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyNameAndPfpQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";

const PostArea = () => {
	const loggedIn = isLoggedIn();
	const { data, loading, error } = loggedIn ? useMyNameAndPfpQuery() : { data: undefined, loading: undefined, error: undefined };

	if ((loading && !data) || !loggedIn) {
		return <div></div>;
	}
	if (error) {
		console.log("error is: " + error);
		return <div>Error occured</div>;
	}

	const user = data.myAccount;
	return (
		<div className={postStyles.wrapper}>
			<ProfilePicture size="w32" source={user.profile.pictureUrl} />
		</div>
	);
};

export default PostArea;
