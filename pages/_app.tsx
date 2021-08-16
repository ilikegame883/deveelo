import { AppProps } from "next/app";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<ApolloProvider client={apolloClient}>
			<Layout showNav={true} showSidebar={true} showActivityBar={true}>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
