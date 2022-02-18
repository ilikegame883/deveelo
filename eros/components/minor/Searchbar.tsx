import { useRouter } from "next/router";
import { useState } from "react";

import searchStyles from "../../styles/minor/search.module.css";
import { searchUsers } from "../../hooks/endpoints";

const Searchbar = () => {
	const router = useRouter();
	const inGroup = router.pathname.includes("/groups/");
	const placeholder = inGroup ? "Search <groupname>" : "Search for posts, people, or groups";

	const [users, setUsers] = useState([]);

	const handleChange = async (str: string) => {
		const data = await searchUsers(str);
		setUsers(data);
		console.log(data);
	};

	return (
		<div className={searchStyles.fillBar}>
			<input className={searchStyles.fillBar} type="text" placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} />
		</div>
	);
};

export default Searchbar;
