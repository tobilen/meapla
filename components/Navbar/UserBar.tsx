import * as React from "react";
import { User } from "next-auth";
import { Avatar, Box, Menu, Text } from "grommet";
import gravatarUrl from "gravatar-url";
import { signOut } from "next-auth/client";

export type Props = { user: User };

const getGravatar = (user: User): string => {
  const options: gravatarUrl.Options = {
    default: "retro",
    rating: "x",
    size: 48,
  };
  if (user.email) return gravatarUrl(user.email, options);
  if (user.name) return gravatarUrl(user.name, options);
  return "";
};

export const UserBar: React.FC<Props> = ({ user }) => (
  <Menu
    label={
      <Box direction="row" align="center" gap="small">
        <Text>{user.name}</Text>
        <Avatar
          src={user.image || getGravatar(user)}
          title="User avatar"
          size="small"
        />
      </Box>
    }
    items={[
      {
        label: "Logout",
        onClick: async () => {
          await signOut();
        },
      },
    ]}
  />
);
