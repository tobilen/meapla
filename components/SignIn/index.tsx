import * as React from "react";
import Link from "next/link";
import { Box, Button, Grid, Heading } from "grommet";
import { signIn } from "next-auth/client";
import { Props as SignInPageProps } from "../../pages/auth/signin";
import { Spacer } from "../styles";

export type Props = SignInPageProps;

export const SignIn: React.FC<Props> = ({ providers }) => {
  if (!providers || Object.keys(providers).length === 0)
    return <>Login is not possible at this time.</>;

  return (
    <>
      <Grid columns={["medium"]} gap="small">
        <Box>
          <Heading level={2} textAlign="center">
            Sign in
          </Heading>
        </Box>
        {Object.values(providers).map((provider) => (
          <Box key={provider.name}>
            <Button
              onClick={() => signIn(provider.id)}
              primary
              label={`Sign in with ${provider.name}`}
            />
          </Box>
        ))}
      </Grid>
      <Spacer />
      <Link href="/">Back</Link>
    </>
  );
};
