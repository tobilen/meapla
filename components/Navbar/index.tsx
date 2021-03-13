import * as React from "react";
import { useRouter } from "next/router";
import { Box, Header, ResponsiveContext, Menu, Nav } from "grommet";
import { User } from "next-auth";
import { Link } from "../styles";
import { SignInBar } from "./SignInBar";
import { UserBar } from "./UserBar";

export type Props = {
  user?: User;
};

type MenuItem = {
  label: string;
  href: string;
  requireAuth?: boolean;
};

const navigationMenu: MenuItem[] = [
  {
    label: "Recipes",
    href: "/",
    requireAuth: true,
  },
  {
    label: "Author a recipe",
    href: "/add-recipe",
    requireAuth: true,
  },
];

export const Navbar: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const filteredMenu = React.useMemo(
    () => navigationMenu.filter((menuItem) => !(menuItem.requireAuth && !user)),
    [user]
  );

  return (
    <Header background="dark-1" pad="small">
      <Box direction="row" align="center" gap="small">
        <Link href="/" color="light-1">
          meapla
        </Link>
      </Box>
      <Box direction="row" align="center" gap="small">
        <ResponsiveContext.Consumer>
          {(responsive) =>
            responsive === "small" ? (
              <Menu
                label="Menu"
                items={filteredMenu.map((menuItem) => ({
                  label: menuItem.label,
                  onClick: async () => {
                    await router.push(menuItem.href);
                  },
                }))}
              />
            ) : (
              <Nav direction="row">
                {filteredMenu.map((menuItem) => (
                  <Link
                    key={menuItem.label}
                    href={menuItem.href}
                    label={menuItem.label}
                  />
                ))}
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
        {user ? <UserBar user={user} /> : <SignInBar />}
      </Box>
    </Header>
  );
};
