import * as React from "react";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />
    <Grommet theme={grommet}>
      <Component {...pageProps} />
    </Grommet>
  </>
);

export default MyApp;
