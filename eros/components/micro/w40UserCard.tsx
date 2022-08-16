import IconButton from "./IconButton";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";
import w40styles from "../../styles/micro/w40.module.css";
import cardStyles from "../../styles/micro/widgetcards.module.css";

import { updateSidebar } from "../../hooks/socialhooks";
import { SearchAccountType, SearchProfileType } from "../../lib/userTypes";
import { isLoggedIn } from "../../hooks/userChecks";

interface CardProps {
	key: string;
	myId: string;
	userId: string;
	account: SearchAccountType;
	profile: SearchProfileType;
	status: "online" | "idle" | "dnd" | "offline";
}

const W40UserCard = ({ key, myId, userId, account, profile, status }: CardProps) => {
	const loggedIn = isLoggedIn();

	const changeSidebar = (tag: string) => {
		if (!tag) {
			return;
		}
		const storage = window.localStorage;
		storage.setItem("side_prof", tag);

		updateSidebar(tag);
	};

	return (
		<div className={w40styles.cardwrapper}>
			<div className="fitfillcenter">
				<div className={cardStyles.linkgroup} onClick={() => changeSidebar(account.tag)}>
					<div className={w40styles.namepicWrapper}>
						<ProfilePicture size="w32" source={profile.pictureUrl} status={status} />
						<div className={w40styles.nameWrapper}>
							<NameGroup username={account.username} size={4} badges={profile.badges} disableSpacer={true} showBadges={true} outline={true} />
						</div>
					</div>
				</div>
				{myId !== userId && (
					<div className={w40styles.buttonContainer}>
						<IconButton
							src="/resources/offbell.svg"
							activesrc="/resources/onbell.svg"
							width="2rem"
							height="2rem"
							paddingLR={0.375}
							paddingTB={0.375}
							startActive={false}
							action={{
								activeAction: () => console.log("active action press"),
								inactiveAction: () => console.log("inactive"),
								options: {
									dangerous: true,
									toggleActive: true,
								},
							}}
							disabled={!loggedIn}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default W40UserCard;
