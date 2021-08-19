import buttonStyles from "../../styles/textbutton.module.css";

interface buttonParams {
	colorKey: string;
	text: string;
	action?: any;
	disabled?: boolean;
}

const TextButton = ({ colorKey, text, action, disabled }: buttonParams) => {
	let content: any = null;

	switch (colorKey) {
		case "gold":
			content = (
				<div className={buttonStyles.goldGrad}>
					<p className={buttonStyles.b_text}>{text}</p>
				</div>
			);
			break;
		case "green":
			content = (
				<div className={buttonStyles.greenGrad}>
					<p className={buttonStyles.b_text}>{text}</p>
				</div>
			);
			break;
		default:
			content = (
				<div className={buttonStyles.goldGrad}>
					<p className={buttonStyles.b_text}>{text}</p>
				</div>
			);
			break;
	}

	return <div className={buttonStyles.button}>{content}</div>;
};

export default TextButton;
