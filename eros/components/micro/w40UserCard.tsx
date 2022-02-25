import { SearchAccountType, SearchProfileType, SearchStatusType, SearchUserType } from "../../lib/userTypes";
import w40styles from "../../styles/micro/w40.module.css";
import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

interface CardProps {
	account: SearchAccountType;
	profile: SearchProfileType;
	status: "online" | "idle" | "dnd" | "offline";
	rerenderCallback: void;
}

const W40UserCard = ({ account, profile, status, rerenderCallback }: CardProps) => {
	/* todo 
    -  make findbyid query
    -  call query from here
    -  use returned user to generate card
    -  finish .map & test
    */
	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		const side = document.getElementById("sidebar");
		if (side) {
			const updateEvent = new CustomEvent("updateSidebar", { detail: tag });
			console.log("dispatched");

			side.dispatchEvent(updateEvent);
		}
		// rerenderCallback;
	};
	return (
		<div className={w40styles.cardwrapper} onClick={() => changeSidebar(account.tag)}>
			<div className="fitfillcenter">
				<div className={w40styles.namepicWrapper}>
					<ProfilePicture size="w40" source={profile.pictureUrl} status={status} />
					<div className={w40styles.nameWrapper}>
						<NameGroup username={account.username} size={4} badges={profile.badges} showBadges={true} />
					</div>
				</div>
				<div className="fillfillcenterright">
					<IconButton src="/resources/followbell.svg" width="2.625rem" height="2.625rem" paddingLR={0.375} paddingTB={0.375} />
				</div>
			</div>
		</div>
	);
};

export default W40UserCard;
