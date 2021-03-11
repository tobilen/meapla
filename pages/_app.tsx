import * as React from "react";
import type { AppProps } from "next/app";
import { Head } from "next/document";
import { createGlobalStyle } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { Provider as AuthProvider } from "next-auth/client";
import { useApollo } from "../lib/apolloClient";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <GlobalStyle />
      <Grommet theme={grommet}>
        <AuthProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AuthProvider>
      </Grommet>
    </>
  );
};

export default MyApp;
