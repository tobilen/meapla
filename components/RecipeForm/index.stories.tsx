import { Story } from "@storybook/react";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { RecipeForm } from "./index";

export default {
  title: "RecipeForm",
  decorators: [ApolloDecorator([])],
};

export const Default: Story = () => <RecipeForm />;
