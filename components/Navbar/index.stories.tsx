import { Story } from "@storybook/react";
import { Navbar, Props } from "./index";

export default {
  title: "Navbar",
};

const props: Props = {
  user: {
    name: "Demo User",
    email: "demouser@example.com",
    image: undefined,
  },
};

export const LoggedIn: Story = () => <Navbar {...props} />;
export const LoggedOut: Story = () => <Navbar />;
