import * as React from "react";
import { GetStaticProps, NextComponentType } from "next";
import "normalize.css";
import { signIn, useSession } from "next-auth/client";
import { ApolloClientState, initializeApollo } from "../lib/apolloClient";
import { RecipeForm } from "../components/RecipeForm";
import { Page } from "../components/Page";

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

  React.useEffect(() => {
    if (loading) return;
    if (!session) signIn().catch(console.error);
  }, [loading, session]);

  return (
    <Page title="meapla">
      <RecipeForm />
    </Page>
  );
};

export default Home;
