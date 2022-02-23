import { useState } from "react";

import socialStyles from "../../styles/minor/sociallist.module.css";

const SocialList = () => {
	const [following, setfollowing] = useState(true);

	const toggle = (follow: boolean) => {
		setfollowing(follow);
	};

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
		</div>
	);
};

export default SocialList;
