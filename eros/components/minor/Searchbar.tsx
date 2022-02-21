import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const SearchResults = dynamic(() => import("./SearchResults"));
import searchStyles from "../../styles/minor/search.module.css";
import { searchUsers } from "../../hooks/endpoints";

const Searchbar = () => {
	const router = useRouter();
	const inGroup = router.pathname.includes("/groups/");
	const placeholder = inGroup ? "Search <groupname>" : "Search for posts, people, or groups";

	const [users, setUsers] = useState([]);
	const [showResults, setShowResults] = useState(false);

	const handleChange = async (str: string) => {
		const data = await searchUsers(str);
		setUsers(data);
	};

	return (
		<div className="rows">
			<form
				className={searchStyles.wrapperL}
				onSubmit={(e) => {
					//stop automatic reload
					e.preventDefault();

					if (users.length > 0) {
						const route = "/" + users[0].account.tag;

						window.location.assign(route);
					}
				}}>
				<img className={searchStyles.icon} src="/resources/mag.svg" alt="search" />
				<input
					className={searchStyles.fillBar}
					type="text"
					placeholder={placeholder}
					onChange={(e) => handleChange(e.target.value)}
					onFocus={() => setShowResults(true)}
					onBlur={() => setShowResults(false)}
				/>
			</form>
			{showResults ? <SearchResults users={users} devlogs={[]} groups={[]} betas={[]} /> : null}
		</div>
	);
};

export default Searchbar;
