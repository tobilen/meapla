import { DecoratorFn } from "@storybook/react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

export const ApolloDecorator: DecoratorFn = (story) => {
  const client = useApollo({});
  return <ApolloProvider client={client}>{story()}</ApolloProvider>;
};
