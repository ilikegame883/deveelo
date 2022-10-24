import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useUploadSingleMutation } from "../../hooks/backend/generated/graphql";
import { checkFileSize } from "../../hooks/inputUtils";
import { updatePostArea } from "../../hooks/socialhooks";
import buttonStyles from "../../styles/micro/icontextbutton.module.css";

interface ITB_Props {
	src: string;
	text: string;
	activesrc?: string;
	failsrc?: string;
	//top-bottom & left-right padding
	width: string;
	//should this be a defined-width gold grad major button (i.e. post button)
	gold?: boolean;
	green?: boolean;
	action?: {
		activeAction: any;
		inactiveAction: any;
		options?: {
			toggleActive?: boolean;
		};
	};
	startActive?: boolean;
	submit?: boolean;
	disabled?: boolean;
	type?: string; //necessary for the upload button, not used by regular button
}

export const IconTextButton = ({ src, text, activesrc, failsrc, gold, green, width, action, startActive, submit, disabled }: ITB_Props) => {
	const router = useRouter();

	const buttonStyle = () => ({
		width: width,
		height: width,
	});

	//create the different border types and set the default, which can
	//be overriden later after testing for error or success.
	const successStyle = () => ({ borderColor: `var(--online)` });
	const errorStyle = () => ({ borderColor: `var(--dnd)` });
	const normStyle = () => ({ borderColor: `#BBC8DB` });

	const regularStyle = buttonStyles.inactive;

	// we are not logged in
	if (disabled) {
		return (
			<button className={regularStyle}>
				<img style={buttonStyle()} src={src} />
			</button>
		);
	}

	const [active, setActive] = useState(startActive);

	const borderStyle = active ? successStyle : normStyle;

	const currentAction = active ? action?.activeAction : action?.inactiveAction;

	const handlePress = () => {
		//if the type is submit, it already has a form specific action
		if (action !== null && action !== undefined && !submit) {
			//get the type of the input, and decide what to do with it
			const type = typeof currentAction;
			if (type === "string") {
				//string actions are assumed to be path to another page
				router.push(currentAction);
			} else {
				//we assume it is a function, so run it
				currentAction();
				if (!action.options) return;
				if (!action.options.toggleActive) return;

				setActive(!active);
			}
		}
	};

	const icon = active ? activesrc : src;
	//override the icon to success or error ones here
	//override the borderstyle

	//gold or green button?
	const colored = gold || green;

	return (
		<button
			style={colored ? null : borderStyle()}
			className={colored ? (gold ? buttonStyles.gold : buttonStyles.green) : regularStyle}
			type={submit ? "submit" : undefined}
			onClick={(e) => {
				e.preventDefault();
				handlePress();
			}}>
			<img style={buttonStyle()} src={icon} />
			<p className={buttonStyles.text}>{text}</p>
		</button>
	);
};

//same system but w/ file upload capabilities
export const UploadIconTextButton = ({ src, type, text, activesrc, failsrc, gold, width, submit, disabled }: ITB_Props) => {
	const router = useRouter();

	// UPLOAD STUFF
	const [newFile, setNewFile] = useState<File>();
	const [error, setError] = useState("");
	const isError = error !== "";
	const active = newFile && !isError;

	const [uploadSingle] = useUploadSingleMutation();

	const fileInput = useRef<HTMLInputElement>();

	const selectFile = () => {
		if (fileInput && fileInput.current) {
			fileInput.current.click();
		}
	};

	const handleNewUpload = async () => {
		if (!newFile || isError) {
			return;
		}

		const response = await uploadSingle({
			variables: {
				file: newFile,
				type: type,
			},
		});

		if (response && response.data) {
			//successfully created post, switch to share screen.
			//also pass the name (and therefore the file path) that
			//the image was saved at for the share preview
			const serversideName = response.data.singleUpload.file.filename;
			updatePostArea("afterpost", serversideName);
		}
	};

	//REGULAR STUFF
	const buttonStyle = () => ({
		width: width,
		height: width,
	});

	//create the different border types and set the default, which can
	//be overriden later after testing for error or success.
	const successStyle = () => ({ borderColor: `var(--online)` });
	const errorStyle = () => ({ borderColor: `var(--dnd)` });
	const normStyle = () => ({ borderColor: `#BBC8DB` });

	const regularStyle = buttonStyles.inactive;

	// we are not logged in
	if (disabled) {
		return (
			<button className={regularStyle}>
				<img style={buttonStyle()} src={src} />
			</button>
		);
	}

	let borderStyle = active ? successStyle : normStyle;

	//state overrides before rendering
	let icon = active ? activesrc : src;
	const content = active ? newFile.name : text;

	if (isError) {
		icon = failsrc;
		borderStyle = errorStyle;
	}

	return (
		<button style={borderStyle()} className={gold ? buttonStyles.gold : regularStyle} type={submit ? "submit" : "button"} onClick={selectFile}>
			<input
				type="file"
				id={`${type}file`}
				style={{ display: "none" }}
				ref={fileInput}
				accept="image/png, image/jpeg, image/jfif, image/webp, image/avif, video/mp4, video/quicktime, video/ogg"
				onChange={(e) => {
					const file = e.target.files[0];
					const maxSize = "15mb";

					const pass = checkFileSize(file.size, maxSize);
					if (pass) {
						setNewFile(file);
						setError("");
					} else {
						setError(`Over the ${maxSize} limit`);
					}
				}}
			/>
			<img style={buttonStyle()} src={icon} />
			<p className={buttonStyles.text}>{isError ? error : content}</p>
		</button>
	);
};
