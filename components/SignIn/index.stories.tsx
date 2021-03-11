import { Story } from "@storybook/react";
import { WrapperDecorator } from "../../.storybook/WrapperDecorator";
import { Props, SignIn } from ".";

export default {
  title: "Sign in",
};

const props: Props = {
  providers: {
    github: {
      id: "github",
      name: "GitHub",
      type: "oauth",
      signinUrl: "signin url",
      callbackUrl: "callback url",
    },
    google: {
      id: "google",
      name: "Google",
      type: "oauth",
      signinUrl: "signin url",
      callbackUrl: "callback url",
    },
    facebook: {
      id: "facebook",
      name: "Facebook",
      type: "oauth",
      signinUrl: "signin url",
      callbackUrl: "callback url",
    },
  },
};

export const Default: Story = () => <SignIn {...props} />;

export const Wrapped: Story = () => <SignIn {...props} />;
Wrapped.decorators = [WrapperDecorator];
