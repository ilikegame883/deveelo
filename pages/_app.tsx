import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";

import { OnNavBlacklist, OnSidebarBlacklist, OnActivityBlacklist } from "../lib/routeBlacklists";
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

export default MyApp;
