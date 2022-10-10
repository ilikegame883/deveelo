import { useRouter } from "next/router";
import { useState } from "react";
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
}

const IconTextButton = ({ src, text, activesrc, failsrc, gold, width, action, startActive, submit, disabled }: ITB_Props) => {
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

	return (
		<button style={borderStyle()} className={gold ? buttonStyles.gold : regularStyle} type={submit ? "submit" : undefined} onClick={() => handlePress()}>
			<img style={buttonStyle()} src={icon} />
			<p className={buttonStyles.text}>{text}</p>
		</button>
	);
};

export default IconTextButton;
