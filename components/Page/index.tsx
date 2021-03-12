import * as React from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { Navbar } from "../Navbar";
import { CenteredMain } from "./styles";

export const Page: React.FC = ({ children }) => {
  const [session] = useSession();

  return (
    <>
      <Navbar user={session?.user} />
      <CenteredMain width="large">
        <Head>
          <title>meapla</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {children || null}
      </CenteredMain>
    </>
  );
};
