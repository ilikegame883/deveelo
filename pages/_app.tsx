import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	const router = useRouter();
	const currPage = router.pathname;

	return (
		<ApolloProvider client={apolloClient}>
			<Layout showNav={OnNavBlacklist(currPage)} showSidebar={OnSidebarBlacklist(currPage)} showActivityBar={OnActivityBlacklist(currPage)}>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

const OnSidebarBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};

const OnActivityBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};

const OnNavBlacklist = (route: string): boolean => {
	const blacklist = ["/login", "/register"];

	return !blacklist.includes(route);
};

export default MyApp;
