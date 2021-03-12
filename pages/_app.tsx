import * as React from "react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import "normalize.css";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { ApolloClientState, initializeApollo } from "../lib/apolloClient";
import { Page } from "../components/Page";
import { UnauthenticatedRedirecter } from "../components/UnauthenticatedRedirecter";
import { GlobalStyle } from "../components/styles";
import { ApolloProvider } from "../components/ApolloProvider";

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

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Grommet theme={grommet}>
      <AuthProvider session={pageProps.session}>
        <ApolloProvider initialApolloState={pageProps.initialApolloState}>
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

export default App;
