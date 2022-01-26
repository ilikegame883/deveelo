import navStyles from "../styles/nav.module.css";
import Link from "next/link";
import isLuna from "../hooks/isLuna";
import TitleMenu from "./minor/TitleMenu";

const Nav = ({ sidebarSpacing }: { sidebarSpacing: boolean }) => {
	return (
		<nav className={sidebarSpacing ? navStyles.nav : navStyles.navNoSpace}>
			<div className={navStyles.wrapper}>
				{isLuna() ? <TitleMenu /> : null}
				<ul>
					<li className={navStyles.boldTitle}>
						<Link href="/">Deveelo</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
