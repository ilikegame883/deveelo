import W40UserCard from "../micro/w40UserCard";

import { useFindCardUsersByIdsQuery } from "../../hooks/backend/generated/graphql";
import { SearchUserIdType } from "../../lib/userTypes";
import { getPayload } from "../../accessToken";

interface CardListProps {
	size: "w40";
	list: string[];
}
const CardList = ({ size, list }: CardListProps) => {
	let content: any;
	let userList: SearchUserIdType[] = [];

	//my data (used to hide follow button on our own card)
	//if not .tag, payload will be null
	const payload: any = getPayload();

	//fetch follow/friend user data to display
	const { data, loading, error } = useFindCardUsersByIdsQuery({ variables: { idList: list } });

	if (loading && !data) {
		return null;
	} else {
		if (error) {
			return <p>Error occurred in fetching...</p>;
		}

		userList = data.findUsersById as SearchUserIdType[];
	}

	switch (size) {
		case "w40":
			content = (
				<>
					{userList.map((user) => (
						<W40UserCard key={userList.indexOf(user).toString()} myId={payload?.id} userId={user._id} account={user.account} profile={user.profile} status={user.status} />
					))}
				</>
			);
			break;

		default:
			break;
	}
	return content;
};

export default CardList;
