import navStyles from "../styles/nav.module.css";
import Link from "next/link";

const Nav = ({ sidebarSpacing }: { sidebarSpacing: boolean }) => {
	return (
		<nav className={sidebarSpacing ? navStyles.nav : navStyles.navNoSpace}>
			<ul>
				<li className={navStyles.boldTitle}>
					<Link href="/">Deveelo</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
