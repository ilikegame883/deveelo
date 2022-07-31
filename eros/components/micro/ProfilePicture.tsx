import pictureStyles from "../../styles/profilepicture.module.css";
import statusStyles from "../../styles/status.module.css";
import Image from "next/image";

import { bannerLoader } from "../../hooks/loaders";
import { FileSelectArea } from "./FileSelect";

interface profilePicParams {
	size: string;
	source: string;
	status?: string;
	editing?: boolean;
}

const ProfilePicture = ({ size, source, status, editing }: profilePicParams) => {
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
				<div className={pictureStyles.w70}>
					{editing ? <FileSelectArea type="pfp" /> : null}
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status && !editing ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w50":
			content = (
				<div className={pictureStyles.w50}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w40":
			content = (
				<div className={pictureStyles.w40}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.w40}>{circle}</div> : null}
				</div>
			);
			break;
		case "w36":
			content = (
				<div className={pictureStyles.w36}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w32":
			content = (
				<div className={pictureStyles.w32}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.large}>{circle}</div> : null}
				</div>
			);
			break;
		case "w28":
			content = (
				<div className={pictureStyles.w28}>
					<Image loader={bannerLoader} className={pictureStyles.p_picture} alt="profile picture" src={source} layout="fill" objectFit="cover" />
					{status ? <div className={statusStyles.w28}>{circle}</div> : null}
				</div>
			);
			break;
	}

	return content;
};

export default ProfilePicture;
