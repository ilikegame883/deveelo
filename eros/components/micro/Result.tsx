import { SearchUserType } from "../../lib/userTypes";
import searchStyles from "../../styles/minor/search.module.css";
import NameGroup from "./NameGroup";
import ProfilePicture from "./ProfilePicture";

const Result = ({ account, profile, status }: SearchUserType) => {
	/*
      ______ todo _______
    /                    \
     +  Structure & layout
     +  Text styling
     -  Header
     -  Hover effect
     -  Click -> profile
    \____________________/
    */
	return (
		<div className={searchStyles.personCard}>
			<div className={searchStyles.resPic}>
				<ProfilePicture size="w28" source={profile.pictureUrl} status={status} />
			</div>
			<div className={searchStyles.nameTagGroup}>
				<NameGroup username={account.username} size={6} showBadges={true} badges={profile.badges} />
				<p className={searchStyles.tag}>@{account.tag}</p>
			</div>
		</div>
	);
};

export default Result;
