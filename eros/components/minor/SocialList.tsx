import { useState } from "react";

import socialStyles from "../../styles/minor/sociallist.module.css";

interface SocialProps {
	followingIds: String[];
	friendIds: String[];
}

const SocialList = ({ followingIds, friendIds }: SocialProps) => {
	const [following, setfollowing] = useState(true);

	const list = following ? followingIds : friendIds;

	const toggle = (follow: boolean) => {
		setfollowing(follow);
	};

	let showEmpty = list === undefined;
	if (list) {
		showEmpty = list.length === 0;
	}

	const empText = following ? "user is not following anyone" : "no friends D:";
	const empty = <p className="textFade">{empText}</p>;

	return (
		<div className={socialStyles.listContainer}>
			<div className={socialStyles.toggleContainer}>
				<p className={following ? socialStyles.on : socialStyles.off} onClick={() => toggle(true)}>
					Following
				</p>
				<p className={socialStyles.divider}>·</p>
				<p className={following ? socialStyles.off : socialStyles.on} onClick={() => toggle(false)}>
					Friends
				</p>
			</div>
			<div className={socialStyles.list}>{showEmpty ? empty : list.map((id) => console.log(id))}</div>
		</div>
	);
};

export default SocialList;
