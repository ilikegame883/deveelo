import { useRouter } from "next/router";
import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey?: string;
	text: string;
	submit?: boolean;
	action?: any;
	disabled?: boolean;
	large?: boolean;
}

const TextButton = ({ colorKey, text, submit, action, disabled, large }: buttonParams) => {
	const router = useRouter();
	let content: any = null;

	const handlePress = () => {
		if (action && !submit) {
			const type = typeof action;
			if (type === "string") {
				router.push(action);
			} else if (type === "function") {
				action;
			}
		}
	};

	switch (colorKey) {
		case "gold":
			if (large) {
				content = (
					<button className={buttonStyles.goldGradL} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
						{text}
					</button>
				);
			} else {
				//follow button has smaller text
				content = (
					<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
						{text}
					</button>
				);
			}
			break;
		case "green":
			content = (
				<button className={buttonStyles.greenGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
		case "red":
			content = (
				<button className={buttonStyles.redGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
		default:
			content = (
				<button className={buttonStyles.goldGrad} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
					{text}
				</button>
			);
			break;
	}

	return content;
};

export default TextButton;
