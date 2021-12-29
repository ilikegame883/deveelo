import { useMemo } from "react";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { ApolloLink, Observable } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { getAccessToken } from "../accessToken";

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle: any;
			Promise.resolve(operation)
				.then((operation) => {
					const accessToken = getAccessToken();
					if (accessToken) {
						operation.setContext({
							headers: {
								authorization: `bearer ${accessToken}`,
							},
						});
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));

			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);

let apolloClient: any; //ApolloClient<NormalizedCacheObject>

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined", // automatically set to true for SSR (on per-oage basis)
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				console.log(graphQLErrors);
				console.log(networkError);
			}),
			requestLink,
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
