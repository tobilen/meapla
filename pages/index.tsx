import * as React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import "normalize.css";
import styles from "../styles/Home.module.css";
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

const Home: React.FC = () => (
  <div className={styles.container}>
    <Head>
      <title>meapla</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <RecipeForm />
  </div>
);

export default Home;
