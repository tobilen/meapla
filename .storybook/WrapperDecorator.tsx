import * as React from "react";
import { DecoratorFn } from "@storybook/react";
import { CenteredMain } from "../components/Page/styles";

export const WrapperDecorator: DecoratorFn = (storyFn) => (
  <CenteredMain width="large">{storyFn()}</CenteredMain>
);
