import { SearchUserType } from "../../lib/userTypes";
import searchStyles from "../../styles/minor/search.module.css";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

const Result = ({ account, profile, status }: SearchUserType) => {
	return (
		<div>
			<div className={searchStyles.resPic}>
				<ProfilePicture size="w28" source={profile.pictureUrl} status={status} />
			</div>
			<NameGroup username={account.username} size={1} showBadges={true} badges={profile.badges} />
		</div>
	);
};

export default Result;
