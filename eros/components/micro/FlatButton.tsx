import { useRouter } from "next/router";
import buttonStyles from "../../styles/micro/flatbutton.module.css";

interface ButtonProps {
	color: string;
	shadow: string;
	text: string;
	submit?: boolean;
	action?: any;
	disabled?: boolean;
	disabledText?: string;
}

const FlatButton = ({ color, shadow, text, submit, action, disabled, disabledText }: ButtonProps) => {
	const router = useRouter();

	if (disabled) {
		return (
			<button className={buttonStyles.disabledWrapper}>
				<p className={buttonStyles.text} style={{ color: "var(--textNormalCol)" }}>
					{disabledText}
				</p>
			</button>
		);
	}

	// dynamic styling we use to control the button's color (using hex or rgba)
	let style = { background: color, boxShadow: shadow };

	//execute the action input, identical to that in TextButton (grad buttons)
	const handlePress = () => {
		//if the type is submit, it already has a form specific action
		if (action !== null && action !== undefined && !submit) {
			//get the type of the input, and decide what to do with it
			const type = typeof action;
			if (type === "string") {
				//string actions are assumed to be path to another page
				router.push(action);
			} else {
				//we assume it is a function, so run it
				action();
			}
		}
	};

	return (
		<button className={buttonStyles.staticWrapper} style={style} type={submit ? "submit" : undefined} onClick={(e) => handlePress()}>
			<p className={buttonStyles.text}>{text}</p>
		</button>
	);
};

export default FlatButton;
