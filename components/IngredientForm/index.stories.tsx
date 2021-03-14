import * as React from "react";
import { Story } from "@storybook/react";
import { Measurement } from "../../typings/graphql";
import { WrapperDecorator } from "../../.storybook/WrapperDecorator";
import { IngredientForm, Props } from "./index";

export default {
  title: "IngredientForm",
};

const props: Props = {
  index: 0,
  ingredient: {
    id: "0",
    name: "Butter",
    amount: 10,
    measurement: Measurement.Gramm,
  },
  onChange: () => {},
  onDelete: () => {},
};

export const Default: Story = () => <IngredientForm {...props} />;

export const Wrapped: Story = () => <IngredientForm {...props} />;
Wrapped.decorators = [WrapperDecorator];
