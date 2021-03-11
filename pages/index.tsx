import * as React from "react";
import { GetStaticProps, NextComponentType } from "next";
import "normalize.css";
import { Button } from "grommet";
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

  React.useEffect(() => {
    if (loading) return;
    if (!session) signIn().catch(console.error);
  }, [loading, session]);

  if (loading) return <>loading...</>;
  if (!session) return null;

  return (
    <Wrapper title="meapla">
      {session && (
        <>
          Signed in as {session.user.name} <br />
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
