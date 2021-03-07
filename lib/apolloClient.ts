import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export type ApolloClientState = Record<string, unknown>;

let apolloClientSingleton: ApolloClient<ApolloClientState>;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "https://meapla.eu-central-1.aws.cloud.dgraph.io/graphql",
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

export const initializeApollo = (
  initialState: ApolloClientState | null = null
): ApolloClient<ApolloClientState> => {
  const apolloClient = apolloClientSingleton ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();

    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return apolloClient;

  if (!apolloClientSingleton) apolloClientSingleton = apolloClient;
  return apolloClient;
};

export const useApollo = (
  initialState: ApolloClientState
): ApolloClient<ApolloClientState> =>
  useMemo(() => initializeApollo(initialState), [initialState]);
