import * as React from "react";
import { Story } from "@storybook/react";
import { Measurement } from "../../typings/graphql";
import { GrommetDecorator } from "../../.storybook/GrommetDecorator";
import { IngredientForm, Props } from "./index";

export default {
  title: "IngredientForm",
  decorators: [GrommetDecorator],
};

const props: Props = {
  index: 0,
  ingredient: {
    id: 0,
    name: "Butter",
    amount: 10,
    measurement: Measurement.Gramm,
  },
  onChange: () => {},
  onDelete: () => {},
};

export const Default: Story = () => <IngredientForm {...props} />;
