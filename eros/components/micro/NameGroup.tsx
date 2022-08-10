import nameStyles from "../../styles/namegroup.module.css";
import Badge from "./Badge";

interface nameGroupParams {
	username: string;
	size: number;
	showBadges: boolean;
	// this is a space infront of the name to counter the offset of the badges, but
	//if we do not want the name centered or we don't want a space infront (like in
	//the search results), then we disable this auto balancing.
	disableSpacer?: boolean;
	badges?: string[];
	outline?: boolean;
}

const NameGroup = ({ username, size, showBadges, disableSpacer, badges, outline }: nameGroupParams) => {
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
			fontStyle = nameStyles.p_largeText;
			badgeStyle = nameStyles.v_largeBadge;
			break;
		case 4:
			//sidebar follow/friend list
			fontStyle = nameStyles.p_sociallistText;
			badgeStyle = nameStyles.v_largeBadge;
			break;
		case 6:
			//Search results
			fontStyle = nameStyles.p_searchText;
			badgeStyle = nameStyles.v_largeBadge;
			break;
		default:
			fontStyle = nameStyles;
			badgeStyle = nameStyles.v_largeBadge;
			break;
	}

	let content = (
		<>
			<div className={nameStyles.p_container}>
				{showBadges && badges.length > 0 && !disableSpacer ? <div className={nameStyles.largeSpacer}></div> : null}

				<p className={fontStyle}>{username}</p>

				{
					//load badges from keys if key list contains keys
					showBadges && badges.length > 0 ? <Badge keys={badges} outline={outline} /> : null
				}
			</div>
		</>
	);

	return <div>{content}</div>;
};

export default NameGroup;
