import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

type State = Record<string, unknown>;

let apolloClientSingleton: ApolloClient<State>;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "https://meapla.eu-central-1.aws.cloud.dgraph.io/graphql",
    }),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (
  initialState: State | null = null
): ApolloClient<State> => {
  const apolloClient = apolloClientSingleton ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClientSingleton) apolloClientSingleton = apolloClient;
  return apolloClient;
};

export const useApollo = (initialState: State): ApolloClient<State> =>
  useMemo(() => initializeApollo(initialState), [initialState]);
