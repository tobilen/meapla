import * as React from "react";
import Head from "next/head";
import { GetStaticProps, NextComponentType } from "next";
import "normalize.css";
import { Main, Button } from "grommet";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/client";
import { ApolloClientState, initializeApollo } from "../lib/apolloClient";
import { RecipeForm } from "../components/RecipeForm";
import { Wrapper } from "../components/Page";

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

const Home: NextComponentType = () => {
  const [session, loading] = useSession();

  if (loading) return <>loading...</>;

  return (
    <Wrapper title="meapla">
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <Button onClick={() => signOut()} primary>
            Sign out
          </Button>
          <RecipeForm />
        </>
      )}
    </Wrapper>
  );
};

export default Home;
