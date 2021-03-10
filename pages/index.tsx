import * as React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import "normalize.css";
import { Main } from "grommet";
import styled from "styled-components";
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

const Home: React.FC = () => (
  <CenteredMain width="large">
    <Head>
      <title>meapla</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <RecipeForm />
  </CenteredMain>
);

export default Home;
