import * as React from "react";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";
import { DecoratorFn } from "@storybook/react";

export const GrommetDecorator: DecoratorFn = (storyFn) => (
  <Grommet theme={grommet}>{storyFn()}</Grommet>
);
