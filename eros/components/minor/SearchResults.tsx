import searchStyles from "../../styles/minor/search.module.css";
import { SearchUserType } from "../../lib/userTypes";
import Result from "../micro/Result";

interface ResultProps {
	users: SearchUserType[];
	devlogs: any[];
	groups: any[];
	betas: any[];
}

const SearchResults = ({ users, devlogs, groups, betas }: ResultProps) => {
	const showRes = users !== undefined;
	if (!users) return <div />;
	if (users.length === 0) return <div />;

	return (
		<div className={searchStyles.dropdown}>
			<div className={searchStyles.row}>{showRes ? users.map((user) => <Result account={user.account} profile={user.profile} status={user.status} />) : null}</div>
			<div className={searchStyles.row}></div>
		</div>
	);
};

export default SearchResults;
