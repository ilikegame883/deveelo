import { useMemo } from "react";
import { ApolloClient, InMemoryCache, NormalizedCacheObject, from, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../accessToken";

/* Communication Links*/

const requestLink = (errorCallback: any) =>
	new ApolloLink((operation, forward) => {
		console.log("made it to auth");

		let observable = forward(operation);
		const accessToken = getAccessToken();
		console.log(`ACCESS TOKEN IS ${accessToken}`);

		if (accessToken) {
			operation.setContext(({ headers }) => ({
				headers: {
					authorization: `bearer ${accessToken}`,
					...headers,
				},
			}));
		}
		console.log("header set");

		observable.subscribe({
			error: errorCallback,
		});
		return observable;
	});
const authLink = requestLink(console.error);
const errorLink = onError(({ graphQLErrors, networkError }) => {
	console.log("error link");
	console.log(graphQLErrors);
	console.log(networkError);
});

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined", // automatically set to true for SSR (on per-oage basis)
		link: from([
			authLink,
			new HttpLink({
				uri: "http://localhost:4000/graphql",
				credentials: "include",
			}),
		]),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === "undefined") return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function useApollo(initialState: any) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
}
