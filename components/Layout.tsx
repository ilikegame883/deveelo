import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";

import Meta from "./Meta";
import Nav from "./Nav";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
import FullActivityBar from "./ActivityBar";
import styles from "../styles/Layout.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery } from "../hooks/backend/generated/graphql";

interface layoutProps {
	children?: any;
	showSidebar: boolean;
	showActivityBar: boolean;
	showNav: boolean;
	useWide: boolean;
}

const Layout = ({ children, showSidebar, showActivityBar, showNav, useWide }: layoutProps) => {
	const screenType: string = useScreenType();

	let content: any = null;
	let text: any;

	const { loading, error, data } = useGetPostsQuery();

	if (loading) {
		text = "loading...";
	} else {
		text = JSON.stringify(data.getPosts[0].body);
	}

	switch (screenType) {
		case "full":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>Full</h2>
							<p>{text}</p>
							{children}
						</main>
					</div>
				</>
			);
			break;

		case "halfActivityBar":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>half activity bar</h2>
							{children}
						</main>
					</div>
				</>
			);
			break;
		case "tablet":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>tablet</h2>
							{children}
						</main>
					</div>
				</>
			);
			break;
		case "mobile":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>mobile</h2>
							{children}
						</main>
					</div>
				</>
			);
			break;
	}

	return (
		<>
			<Meta />
			<div>{content}</div>
		</>
	);
};

export default Layout;
