import { appWindow, PhysicalSize } from "@tauri-apps/api/window";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";

import Meta from "./micro/Meta";
import Nav from "./Nav";
const DesktopSidebar = dynamic(() => import("./Sidebar"), { ssr: false });
import FullActivityBar from "./ActivityBar";
import styles from "../styles/Layout.module.css";
import navStyles from "../styles/nav.module.css";
import useScreenType from "../hooks/useScreenType";
import { useGetPostsQuery } from "../hooks/backend/generated/graphql";
import onConnectionError from "../hooks/popups/connectionError";
import { getAccessToken } from "../accessToken";
import { useEffect, useState } from "react";
const SideImage = dynamic(() => import("./SideImage"), { ssr: false });
import isLuna from "../hooks/isLuna";

interface layoutProps {
	children?: any;
	route: string;
	showSidebar: boolean;
	showActivityBar: boolean;
	showNav: boolean;
	useWide: boolean;
}

const Layout = ({ children, route, showSidebar, showActivityBar, showNav, useWide }: layoutProps) => {
	// Determins rounded or hard corners in Luna
	let full = true;

	const screenType: string = useScreenType();
	const luna = isLuna();
	const router = useRouter();
	const [reloaded, setReloaded] = useState(false);
	const [maxed, setmaxed] = useState(null);

	let content: any = null;
	let text: any;
	let popup: any = null;
	let handledError: boolean = false;

	//const { loading, error, data } = useMyAccountApsMinQuery({ fetchPolicy: "network-only" });

	//console.log(data, error, loading);

	text = "hi";
	const error = false;
	const loading = false;

	// if (loading && !data) {
	// 	text = "loading...";
	// 	handledError = false;
	// } else {
	// 	text = JSON.stringify(data?.myAccount?.account?.username);
	// 	//text = JSON.stringify(data.getPosts);
	// 	if (error && !handledError) {
	// 		handledError = true;
	// 		const accessToken = getAccessToken();
	// 		if (accessToken && accessToken !== "" && !reloaded) {
	// 			setReloaded(true);
	// 			router.reload();
	// 		}

	// 		popup = onConnectionError(error);
	// 	}
	// }
	let titlebar: any = null;
	let debugT = "";

	if (luna) {
		useEffect(() => {
			appWindow.listen("tauri://resize", ({ event, payload }: { event: any; payload: PhysicalSize }) => {
				const { width, height } = payload;
				console.log(`TRIGGERED\nRes: ${width}x${height}`);

				appWindow.isMaximized().then((max) => {
					console.log(`set max to ${max}`);

					if (maxed !== max) {
						setmaxed(max);
					}
				});
			});

			//   return () => {
			// 	appWindow.listeners["tauri://resize"];
			//   };
		}, []);

		full = maxed === true;

		titlebar = (
			<div data-tauri-drag-region className={navStyles.dragBar}>
				<div className={navStyles.titlebar}>
					<div className={navStyles.titlebar_buttonM} id="titlebar-minimize">
						<Image src="/resources/minus.svg" alt="minimize" width={21} height={21} />
					</div>
					<div className={navStyles.titlebar_button} id="titlebar-maximize">
						<Image src="/resources/full.svg" alt="maximize" width={16.5} height={16.5} />
					</div>
					<div className={full ? navStyles.titlebar_buttonC_full : navStyles.titlebar_buttonC} id="titlebar-close">
						<Image src="/resources/x.svg" alt="close" width={21} height={21} />
					</div>
				</div>
			</div>
		);
	}

	switch (screenType) {
		case "full":
			content = (
				<>
					{showNav && (showSidebar ? <Nav sidebarSpacing={true} /> : <Nav sidebarSpacing={false} />)}
					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					{useWide && <SideImage route={route} />}
					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							<p>{debugT}</p>
							<a href="/login">login</a>
							{/* <h2>Full</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							{/* <h2>half activity bar</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
							<p>{debugT}</p>
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

					<div className={useWide ? styles.containerWide : styles.container}>
						<main className={styles.main}>
							{/* <h2>tablet</h2>
							<p>Logged in user: {error && !loading ? error : text}</p> */}
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

					{showSidebar && <DesktopSidebar hardEdge={full} />}

					{showActivityBar ? <FullActivityBar hardEdge={full} /> : null}

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
			{luna ? titlebar : null}
			<div>{content}</div>
		</>
	);
};

export default Layout;
