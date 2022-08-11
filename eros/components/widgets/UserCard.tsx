import cardStyles from "../../styles/micro/widgetcards.module.css";
import CardDetailText from "../micro/CardDetailText";
import FlatButton from "../micro/FlatButton";
import NameGroup from "../micro/NameGroup";
import ProfilePicture from "../micro/ProfilePicture";

interface UserCardProps {
	key: string;
	id: string;
	account: any;
	profile: any;
	status: string;
}

const UserCard = ({ key, id, account, profile, status }: UserCardProps) => {
	return (
		<div className={cardStyles.card}>
			<ProfilePicture size="w28" source={profile.pictureUrl} status={status} isActivitybar={true} />
			<div className={cardStyles.textgroup}>
				<NameGroup username={account.username} size={5} badges={profile.badges} showBadges={true} outline={true} disableSpacer={true} />
				<CardDetailText text="Follows you" />
			</div>
			<div className="fillfillcenterright">
				<div className={cardStyles.buttonContainer}>
					<FlatButton text="Follow" color="#6360EC" shadow="0px 0.375em 1.875em rgba(99, 96, 236, 0.2)" />
				</div>
			</div>
		</div>
	);
};

export default UserCard;
