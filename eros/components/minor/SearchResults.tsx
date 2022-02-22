import searchStyles from "../../styles/minor/search.module.css";
import { SearchUserType } from "../../lib/userTypes";
import Result from "../micro/Result";
import { useSampleUsersQuery } from "../../hooks/backend/generated/graphql";

interface ResultProps {
	users: SearchUserType[];
	devlogs: any[];
	groups: any[];
	betas: any[];
}

const SearchResults = ({ users, devlogs, groups, betas }: ResultProps) => {
	const showRes = users !== undefined;

	let preview = !users;
	if (!preview) {
		if (users.length === 0) {
			preview = true;
		}
	}

	let usersDis = users;

	//no user has been found, show random content
	if (preview) {
		const { data, loading, error } = useSampleUsersQuery({
			variables: {
				amount: 3,
			},
		});

		if (loading && !data) {
			return <div />;
		}
		if (error) {
			return <div>Error occurred</div>;
		}

		usersDis = data.randomUsers as SearchUserType[];
	}

	// in progress
	return (
		<div className={searchStyles.dropdown}>
			<div className={searchStyles.row}>
				<p className={searchStyles.header}>Users</p>
				{showRes ? usersDis.map((user) => <Result account={user.account} profile={user.profile} status={user.status} />) : null}
			</div>
			<div className={searchStyles.row}></div>
		</div>
	);
};

export default SearchResults;
