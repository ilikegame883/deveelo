import postStyles from "../../styles/posts/postarea.module.css";
import ProfilePicture from "../micro/ProfilePicture";

import { useMyPfpAndStatusQuery } from "../../hooks/backend/generated/graphql";
import { isLoggedIn } from "../../hooks/userChecks";
import IconButton from "../micro/IconButton";
import { useEffect, useRef, useState } from "react";
import { IconTextButton, UploadIconTextButton } from "../micro/IconTextButton";

const PostArea = () => {
	//STATE MANAGEMENT
	const [postText, setPostText] = useState("");
	const textInput = useRef<HTMLTextAreaElement>();
	/* states for loading the share & preview area */
	const [previewFile, setPreviewFile] = useState<string>(); //the img file name

	//EVERYTHING ELSE
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

	//handle swtiching to share screen when recieving successful post event
	useEffect(() => {
		const handleUpdate = (e: CustomEvent) => {
			//detail is packed with: type|serverfilename (see socialHooks.ts)
			//i.e. afterpost|fue745gfaiu.webp
			const decoded: string = e.detail.split("|");
			const type = decoded[0];
			const filename = decoded[1];

			if (type === "afterpost") {
				// User successfully launched a post, remove form and replace it
				// with a preview & share options
				setPreviewFile(filename);
			}
		};
		setTimeout(() => {
			//add event listener to the postarea which listens for
			//events telling to swap the create post form out for a
			//post preview alongside a couple share buttons
			//the source of these dispatched events are socialhoots.ts
			const postarea = document.getElementById("postarea");

			if (postarea) {
				postarea.addEventListener("updatePostArea", handleUpdate);
			}
		}, 1000);

		return () => {
			//remove listener on unmount
			const postarea = document.getElementById("postarea");

			if (postarea) {
				postarea.removeEventListener("updatePostArea", handleUpdate);
			}
		};
	}, []);

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
		<div id="postarea" className={postStyles.container}>
			{/* container swaps out the following: */}
			<div className={postStyles.wrapper}>
				<ProfilePicture size="w32" source={user.profile.pictureUrl} status={user.status} />
				<form className={postStyles.form} action="">
					<div className={postStyles.textbox} onClick={selectInput}>
						<textarea name="post" id="postarea" className={postStyles.input} ref={textInput} placeholder="What have you been working on?" onChange={(e) => setPostText(e.target.value)} />
						{/* <input className={postStyles.input} type="text" /> */}
						<IconButton src="/resources/post_emoji.svg" width="1.3em" height="1.3em" paddingLR={0} paddingTB={0} hoverFxOff={true} action={undefined} />
					</div>
					<div className={postStyles.buttonWrapper}>
						<UploadIconTextButton
							text="Photo / Video"
							src="/resources/ITB/add.svg"
							activesrc="/resources/ITB/success.svg"
							failsrc="/resources/ITB/fail.svg"
							width="1rem"
							type="post"
							action={{
								activeAction: () => console.log("trigger upload"),
								inactiveAction: () => console.log("trigger reupload"),
								options: { toggleActive: true },
							}}
						/>
						<IconTextButton text="Post" src="/resources/ITB/pencil.svg" gold={true} width="0.9375em" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostArea;
