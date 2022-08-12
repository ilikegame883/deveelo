import CardDetailText from "../micro/CardDetailText";
import FlatButton from "../micro/FlatButton";
import NameGroup from "../micro/NameGroup";
import ProfilePicture from "../micro/ProfilePicture";
import cardStyles from "../../styles/micro/widgetcards.module.css";
import { updateSidebar } from "../../hooks/socialhooks";
import { isLoggedIn } from "../../hooks/userChecks";

interface UserCardProps {
	key: string;
	id: string;
	account: any;
	profile: any;
	status: string;
	following: string[];
	followers: string[];
}

const UserCard = ({ key, id, account, profile, status, following, followers }: UserCardProps) => {
	const loggedIn = isLoggedIn();
	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
	};

	//check if we follow this person
	const disable = loggedIn ? following.includes(id) : false;

	const followsYou = loggedIn ? followers.includes(id) : false;

	return (
		<div className={cardStyles.card}>
			<div className={cardStyles.linkgroup} onClick={() => changeSidebar(account.tag)}>
				<ProfilePicture size="w28" source={profile.pictureUrl} status={status} isActivitybar={true} />
				<div className={cardStyles.textgroup}>
					<NameGroup username={account.username} size={5} badges={profile.badges} showBadges={true} outline={true} disableSpacer={true} />
					{followsYou ? <CardDetailText text="Follows you" /> : null}
				</div>
			</div>
			<div className={cardStyles.buttonContainer}>
				<FlatButton disabled={disable} text="Follow" disabledText="Following" color="#6360EC" shadow="0px 0.375em 1.875em rgba(99, 96, 236, 0.2)" />
			</div>
		</div>
	);
};

export default UserCard;
