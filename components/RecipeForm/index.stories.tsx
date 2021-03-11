import { Story } from "@storybook/react";
import { WrapperDecorator } from "../../.storybook/WrapperDecorator";
import { RecipeForm } from "./index";

export default {
  title: "RecipeForm",
};

export const Default: Story = () => <RecipeForm />;

export const Wrapped: Story = () => <RecipeForm />;
Wrapped.decorators = [WrapperDecorator];
