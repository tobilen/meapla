import * as React from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { Navbar } from "../Navbar";
import { CenteredMain } from "./styles";

export const Page: React.FC<{ title: string }> = ({ children, title }) => {
  const [session, loading] = useSession();

  if (loading) return <>loading</>;
  return (
    <>
      <Navbar user={session?.user} />

      <CenteredMain width="large">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {children || null}
      </CenteredMain>
    </>
  );
};
