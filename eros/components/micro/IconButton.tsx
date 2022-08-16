import router from "next/router";
import React, { useState } from "react";

interface IB_Props {
	src: string;
	activesrc?: string;
	//top-bottom & left-right padding
	width: string;
	height: string;
	paddingTB?: number;
	paddingLR?: number;
	action?: {
		activeAction: any;
		inactiveAction: any;
		options?: {
			toggleActive?: boolean;
		};
	};
	startActive?: boolean;
	submit?;
}

const IconButton = ({ src, activesrc, width, height, paddingTB, paddingLR, action, startActive, submit }: IB_Props) => {
	const [active, setActive] = useState(startActive);
	const tb = paddingTB ? paddingTB : 0;
	const lr = paddingLR ? paddingLR : 0;

	const buttonStyle = () => ({
		width: width,
		height: height,
		padding: `${tb}em ${lr}em`,
	});

	const currentAction = active ? action.activeAction : action.inactiveAction;

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

				setActive(true);
			}
		}
	};

	return (
		<button className="simpleButton" type={submit ? "submit" : undefined}>
			<img style={buttonStyle()} src={active ? activesrc : src}></img>
		</button>
	);
};

export default IconButton;
