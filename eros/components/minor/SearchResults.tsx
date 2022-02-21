import searchStyles from "../../styles/minor/search.module.css";
import { PublicUserType } from "../../lib/userTypes";

interface ResultProps {
	users: PublicUserType[];
	devlogs: any[];
	groups: any[];
	betas: any[];
}

const SearchResults = ({ users, devlogs, groups, betas }: ResultProps) => {
	return (
		<div className={searchStyles.dropdown}>
			<div className={searchStyles.row}></div>
			<div className={searchStyles.row}></div>
		</div>
	);
};

export default SearchResults;
