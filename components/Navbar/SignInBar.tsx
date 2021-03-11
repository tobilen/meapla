import * as React from "react";
import { Box } from "grommet";
import { signIn } from "next-auth/client";
import { Link } from "../styles";

export const SignInBar: React.FC = () => (
  <Box direction="row" align="center" gap="small" pad="small">
    <Link
      onClick={async () => {
        await signIn();
      }}
      href="#"
    >
      Sign in
    </Link>
  </Box>
);
