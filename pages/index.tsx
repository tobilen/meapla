import * as React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import "normalize.css";
import { Main, Button } from "grommet";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";
import { ApolloClientState, initializeApollo } from "../lib/apolloClient";
import { RecipeForm } from "../components/RecipeForm";

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

const CenteredMain = styled(Main)`
  margin: 0 auto;
`;

const Home: React.FC = () => {
  const [session, loading] = useSession();

  if (loading) return <>loading...</>;

  return (
    <CenteredMain width="large">
      <Head>
        <title>meapla</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <>
          Not signed in <br />
          <Button onClick={() => signIn()} primary>
            Sign in
          </Button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <Button onClick={() => signOut()} primary>
            Sign out
          </Button>
          <RecipeForm />
        </>
      )}
    </CenteredMain>
  );
};

export default Home;
