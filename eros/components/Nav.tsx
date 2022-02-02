import navStyles from "../styles/nav.module.css";
import Link from "next/link";

import TitleMenu from "./minor/TitleMenu";
import ProfilePicture from "./micro/ProfilePicture";
import TextButton from "./micro/TextButton";
import isLuna from "../hooks/isLuna";
import { useMyNameAndPfpQuery } from "../hooks/backend/generated/graphql";
import { getAccessToken } from "../accessToken";

const Nav = ({ sidebarSpacing }: { sidebarSpacing: boolean }) => {
	let profile = null;

	if (getAccessToken() === "") {
		// handle logged out users
		profile = (
			<div className={navStyles.buttonWrapper}>
				<TextButton colorKey="gold" text="Login" />
			</div>
		);
	} else {
		//user is logged in
		const { data, loading, error } = useMyNameAndPfpQuery();

		if (loading && !data) {
			return <div></div>;
		}

		const user = data.myAccount;

		profile = (
			<>
				<div className={navStyles.profile}>
					<ProfilePicture size="w40" source={user.profile.pictureUrl} />
				</div>
			</>
		);
	}

	return (
		<nav className={sidebarSpacing ? (isLuna() ? navStyles.nav : navStyles.nav_full) : isLuna() ? navStyles.navNoSpace : navStyles.navNoSpace_full}>
			{/* the name & app version */}
			<div className={navStyles.wrapper}>
				{isLuna() ? <TitleMenu /> : null}
				<ul>
					<li className={navStyles.boldTitle}>
						<Link href="/">Deveelo</Link>
					</li>
				</ul>
			</div>
			<div className={navStyles.rightWrapper}>{profile}</div>
		</nav>
	);
};

export default Nav;
