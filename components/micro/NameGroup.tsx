import nameStyles from "../../styles/namegroup.module.css";
import Badge from "./Badge";

interface nameGroupParams {
	username: string;
	size: number;
	showBadges: boolean;
	badges?: string[];
}

const NameGroup = ({ username, size, showBadges, badges }: nameGroupParams) => {
	let style = null;
	let fontStyle = null;
	let badgeStyle = null;

	if (badges == undefined) {
		badges = [];
	}

	//choose which css styling to use
	switch (size) {
		case 1:
			//Profile name on sidebar
			style = nameStyles.p_large;
			fontStyle = nameStyles.p_largeText;
			badgeStyle = nameStyles.v_largeBadge;
			break;
		default:
			style = nameStyles;
			fontStyle = nameStyles;
			badgeStyle = nameStyles.v_largeBadge;
			break;
	}

	let content = (
		<>
			<div className={style}>
				{showBadges && badges.length > 0 ? <div className={nameStyles.largeSpacer}></div> : null}

				<p className={fontStyle}>{username}</p>

				{
					//load badges from keys if key list contains keys
					showBadges && badges.length > 0 ? <Badge keys={badges} /> : null
				}
			</div>
		</>
	);

	return <div>{content}</div>;
};

export default NameGroup;
