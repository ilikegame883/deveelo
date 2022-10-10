import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyPfpAndStatusQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";
import IconButton from "../micro/IconButton";
import { useEffect, useRef, useState } from "react";
import IconTextButton from "../micro/IconTextButton";

const PostArea = () => {
	//state management
	const [postText, setPostText] = useState("");
	const textInput = useRef<HTMLTextAreaElement>();

	//automatically expand the size of the text area upon new lines
	//instead of wrapping & hiding old lines
	useEffect(() => {
		//fetch the text area by id
		const textarea = document.querySelector("#postarea");
		textarea?.addEventListener("input", autoResize, false);

		function autoResize() {
			this.style.height = "auto";
			this.style.height = this.scrollHeight - 5 + "px";
		}

		return () => {
			//remove the event lisner on unmound
			const textarea = document.querySelector("#postarea");
			textarea?.removeEventListener("input", autoResize, false);
		};
	}, [postText]);

	const { data, loading, error } = useMyPfpAndStatusQuery();
	const loggedIn = isLoggedIn();

	if ((loading && !data) || !loggedIn || !data.myAccount) {
		return <div></div>;
	}
	if (error) {
		console.log("error is: " + error);
		return <div>Error occured</div>;
	}

	const user = data.myAccount;
	if (!user) {
		console.log("user pfp not retrieved for post area");

		return <div></div>;
	}

	const selectInput = () => {
		if (textInput && textInput.current) {
			textInput.current.focus();
		}
	};

	return (
		<div className={postStyles.wrapper}>
			<ProfilePicture size="w32" source={user.profile.pictureUrl} status={user.status} />
			<form className={postStyles.form} action="">
				<div className={postStyles.textbox} onClick={selectInput}>
					<textarea name="post" id="postarea" className={postStyles.input} ref={textInput} placeholder="What have you been working on?" onChange={(e) => setPostText(e.target.value)} />
					{/* <input className={postStyles.input} type="text" /> */}
					<IconButton src="/resources/post_emoji.svg" width="1.3em" height="1.3em" paddingLR={0} paddingTB={0} hoverFxOff={true} action={undefined} />
				</div>
				<div className={postStyles.buttonWrapper}>
					<IconTextButton
						text="Photo / Video"
						src="/resources/ITB/add.svg"
						activesrc="/resources/ITB/success.svg"
						failsrc="/resources/ITB/fail.svg"
						width="1rem"
						action={{
							activeAction: () => console.log("trigger upload"),
							inactiveAction: () => console.log("trigger reupload"),
							options: { toggleActive: true },
						}}
					/>
					<div style={{ width: "80px" }}></div>
				</div>
			</form>
		</div>
	);
};

export default PostArea;
