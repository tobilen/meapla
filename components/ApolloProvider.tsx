import * as React from "react";
import { useSession } from "next-auth/client";
import { ApolloProvider as ApolloProviderContext } from "@apollo/client";
import { ApolloClientState, useApollo } from "../lib/apolloClient";

export const ApolloProvider: React.FC<{
  initialApolloState: ApolloClientState;
}> = ({ children, initialApolloState }) => {
  const [session] = useSession();
  const apolloClient = useApollo(initialApolloState, session?.token);

  return (
    <ApolloProviderContext client={apolloClient}>
      {children || null}
    </ApolloProviderContext>
  );
};
