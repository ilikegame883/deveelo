import { useRouter } from "next/router";
import { useState } from "react";

import searchStyles from "../../styles/minor/search.module.css";
import { searchUsers } from "../../hooks/endpoints";

const Searchbar = () => {
	const router = useRouter();
	const inGroup = router.pathname.includes("/groups/");
	const placeholder = inGroup ? "Search <groupname>" : "Search for posts, people, or groups";

	const [users, setUsers] = useState([]);
	//const [entered, setEntered] = useState(false);

	const handleChange = async (str: string) => {
		const data = await searchUsers(str);
		setUsers(data);
	};

	return (
		<form
			className={searchStyles.wrapperL}
			onSubmit={(e) => {
				//stop automatic reload
				e.preventDefault();

				if (users.length > 0) {
					const route = "/" + users[0].account.tag;
					console.log(`route: "${route}"`);

					window.location.assign(route);
				}
			}}>
			<img className={searchStyles.icon} src="/resources/mag.svg" alt="search" />
			<input className={searchStyles.fillBar} type="text" placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} />
		</form>
	);
};

export default Searchbar;
