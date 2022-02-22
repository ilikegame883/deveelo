import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SearchResults = dynamic(() => import("./SearchResults"));
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
	};

	//#region  note  delayed un/mount state manager
	const [state, setState] = useState("unmounted");
	const time = 500;

	const show = () => {
		if (state === "unmounting") {
			return;
		}
		setState("mounting");
	};
	const hide = () => {
		if (state === "mounting") {
			return;
		}
		setState("unmounting");
	};

	useEffect(() => {
		let timeoutId: any;
		if (state === "unmounting") {
			timeoutId = setTimeout(() => {
				setState("unmounted");
			}, time);
		} else if (state === "mounting") {
			timeoutId = setTimeout(() => {
				setState("mounted");
			}, time);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [state, time]);
	//#endregion

	useEffect(() => {
		document.querySelector("body").addEventListener("click", function () {
			const focus = document.activeElement;
			//the searchbar/results wrapper
			let resElement = document.querySelector("#bar-resultsContainer");

			//see if the click was on the searchbar/results or their children
			if (focus !== resElement && !resElement.contains(focus)) {
				hide();
			}
		});
	}, []);

	return (
		//tabindex allows div to recieve focus, used to detect if click was on element
		//on or within the div by comparing the focus with the body
		<div className="rows" id="bar-resultsContainer" tabIndex={-10}>
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
				<input className={searchStyles.fillBar} type="text" placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} onFocus={() => show()} />
			</form>
			{state !== "unmounted" && <SearchResults users={users} devlogs={[]} groups={[]} betas={[]} fadeout={state === "unmounting"} />}
		</div>
	);
};

export default Searchbar;
