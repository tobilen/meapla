import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export type ApolloClientState = Record<string, unknown>;

let apolloClientSingleton: ApolloClient<ApolloClientState>;

const uri =
  process.env.NODE_ENV === "production"
    ? "https://meapla-server.herokuapp.com"
    : "http://localhost:4000";

const authLink = (token: string | null) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

export const initializeApollo = (
  initialState: ApolloClientState | null = null,
  token: string | null = null
): ApolloClient<ApolloClientState> => {
  const apolloClient = apolloClientSingleton ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();

    apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  apolloClient.setLink(
    authLink(token).concat(
      new HttpLink({
        uri,
      })
    )
  );

  if (typeof window === "undefined") return apolloClient;

  if (!apolloClientSingleton) apolloClientSingleton = apolloClient;
  return apolloClient;
};

export const useApollo = (
  initialState: ApolloClientState,
  token: string | null
): ApolloClient<ApolloClientState> =>
  useMemo(() => initializeApollo(initialState, token), [initialState, token]);
