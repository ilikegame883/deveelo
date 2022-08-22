import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyPfpAndStatusQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";

const PostArea = () => {
	//extra checks even though this component is only loaded if logged in
	const loggedIn = isLoggedIn();
	const { data, loading, error } = loggedIn ? useMyPfpAndStatusQuery() : { data: undefined, loading: undefined, error: undefined };

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
			<ProfilePicture size="w32" source={user.profile.pictureUrl} status={user.status} />
			<form className={postStyles.form} action="">
				<div className={postStyles.textbox}></div>
			</form>
		</div>
	);
};

export default PostArea;
