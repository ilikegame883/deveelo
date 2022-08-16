import { updateSidebar } from "../../hooks/socialhooks";
import { SearchAccountType, SearchProfileType } from "../../lib/userTypes";
import w40styles from "../../styles/micro/w40.module.css";
import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

interface CardProps {
	key: string;
	account: SearchAccountType;
	profile: SearchProfileType;
	status: "online" | "idle" | "dnd" | "offline";
}

const W40UserCard = ({ key, account, profile, status }: CardProps) => {
	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
	};
	return (
		<div className={w40styles.cardwrapper} onClick={() => changeSidebar(account.tag)}>
			<div className="fitfillcenter">
				<div className={w40styles.namepicWrapper}>
					<ProfilePicture size="w32" source={profile.pictureUrl} status={status} />
					<div className={w40styles.nameWrapper}>
						<NameGroup username={account.username} size={4} badges={profile.badges} disableSpacer={true} showBadges={true} outline={true} />
					</div>
				</div>
				<div className="fillfillcenterright">
					<IconButton src="/resources/followbell.svg" activesrc="/resources/onbell.svg" width="2rem" height="2rem" paddingLR={0.375} paddingTB={0.375} />
				</div>
			</div>
		</div>
	);
};

export default W40UserCard;
