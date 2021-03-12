import * as React from "react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import "normalize.css";
import { ApolloProvider } from "@apollo/client";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import {
  ApolloClientState,
  initializeApollo,
  useApollo,
} from "../lib/apolloClient";
import { Page } from "../components/Page";
import { UnauthenticatedRedirecter } from "../components/UnauthenticatedRedirecter";
import { GlobalStyle } from "../components/styles";

export const getStaticProps: GetStaticProps<{
  initialApolloState: ApolloClientState;
}> = async () => {
  const apolloClient = initializeApollo();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <GlobalStyle />
      <Grommet theme={grommet}>
        <AuthProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
            <UnauthenticatedRedirecter>
              <Page>
                <Component {...pageProps} />
              </Page>
            </UnauthenticatedRedirecter>
          </ApolloProvider>
        </AuthProvider>
      </Grommet>
    </>
  );
};

export default App;
