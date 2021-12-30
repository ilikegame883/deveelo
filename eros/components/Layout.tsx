import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";

import Meta from "./micro/Meta";
import Nav from "./Nav";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
import FullActivityBar from "./ActivityBar";
import styles from "../styles/Layout.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery, useMyAccountApsMinQuery } from "../hooks/backend/generated/graphql";
import onConnectionError from "../hooks/popups/connectionError";
const SideImage = dynamic(() => import("./SideImage"), { ssr: false });

interface layoutProps {
	children?: any;
	route: string;
	showSidebar: boolean;
	showActivityBar: boolean;
	showNav: boolean;
	useWide: boolean;
}

const Layout = ({ children, route, showSidebar, showActivityBar, showNav, useWide }: layoutProps) => {
	const screenType: string = useScreenType();

	let content: any = null;
	let text: any;
	let popup: any = null;
	let handledError: boolean = false;

	const { loading, error, data } = useMyAccountApsMinQuery({ fetchPolicy: "network-only" });

	if (loading) {
		text = "loading...";
		handledError = false;
	} else {
		text = JSON.stringify(data?.myAccount?.account?.username);
		if (error && !handledError) {
			handledError = true;
			popup = onConnectionError(error);
		}
	}

	switch (screenType) {
		case "full":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}

					{showSidebar && <DesktopSidebar />}

					{showActivityBar && (showNav ? <FullActivityBar topSpacing={true} /> : <FullActivityBar topSpacing={false} />)}

					{useWide && <SideImage route={route} />}
					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<h2>Full</h2>
							<p>Logged in user: {error && !loading ? error?.message : text}</p>
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
							<p>Logged in user: {error && !loading ? error?.message : text}</p>
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
							<p>Logged in user: {error && !loading ? error?.message : text}</p>
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
