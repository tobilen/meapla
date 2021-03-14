import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
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

// Strip __typename from variables
const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: unknown) =>
      key === "__typename" ? undefined : value;
    // eslint-disable-next-line no-param-reassign
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation);
});

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
    from([
      middleWareLink,
      authLink(token),
      new HttpLink({
        uri,
      }),
    ])
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
