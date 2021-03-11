import * as React from "react";
import { Head } from "next/document";
import { CenteredMain } from "./styles";

export const Wrapper: React.FC<{ title: string }> = ({ children, title }) => (
  <CenteredMain width="large">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {children || null}
  </CenteredMain>
);
