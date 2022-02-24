import { useState } from "react";
import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserType } from "../../lib/userTypes";

import socialStyles from "../../styles/minor/sociallist.module.css";
import W40UserCard from "../micro/w40UserCard";

interface SocialProps {
	followingIds: string[];
	friendIds: string[];
}

const SocialList = ({ followingIds, friendIds }: SocialProps) => {
	const [following, setfollowing] = useState(true);

	// const list = following ? followingIds : friendIds;
	const list = ["61ce80a545e0518338b75731", "61feb90240e092000442bf65", "62155723b23fea561c6a7cbf"];
	let userList: SearchUserType[] = [];

	const toggle = (follow: boolean) => {
		setfollowing(follow);
	};

	let showEmpty = list === undefined;
	if (list) {
		showEmpty = list.length === 0;
	}
	//should wait for data fetch, default: if no data to fetch, dont wait (true)
	let display = showEmpty;

	const empText = following ? "😿 user is not following anyone" : "💔 user has not friended anyone";
	const empty = <p className="textFade">{empText}</p>;

	if (!showEmpty) {
		//fetch follow/friend user data to display
		const { data, loading, error } = useFindCardUsersByIdsQuery({ variables: { idList: list } });

		if (loading && !data) {
			display = false;
		} else {
			if (error) {
				return <p>Error occurred in fetching...</p>;
			}

			userList = data.findUsersById as SearchUserType[];
			//display the list after fetch has finished
			display = true;
		}
	}

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

			<div className={socialStyles.list}>
				{display && (showEmpty ? empty : userList.map(({ account, profile, status }) => <W40UserCard account={account} profile={profile} status={status} />))}
			</div>
		</div>
	);
};

export default SocialList;
