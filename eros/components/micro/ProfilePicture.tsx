import pictureStyles from "../../styles/profilepicture.module.css";
import statusStyles from "../../styles/status.module.css";
import Image from "next/image";

interface profilePicParams {
	size: string;
	source: string;
	status?: string;
}

const ProfilePicture = ({ size, source, status }: profilePicParams) => {
	let content = null;
	let circle = null;

	switch (status) {
		case "online":
			circle = <div className={statusStyles.online} />;
			break;
		case "idle":
			circle = <div className={statusStyles.idle} />;
			break;
		case "dnd":
			circle = <div className={statusStyles.dnd} />;
			break;
		case "offline":
			circle = <div className={statusStyles.offline} />;
			break;
		default:
			break;
	}

	switch (size) {
		case "large":
			content = (
				<>
					<Image className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</>
			);
			break;
	}

	return <div className={pictureStyles.p_pictureWrapper}>{content}</div>;
};

export default ProfilePicture;
