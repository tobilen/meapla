import { Story } from "@storybook/react";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetRecipes } from "../../queries/recipe.mock";
import { RecipeList } from "./index";

export default {
  title: "RecipeList",
  decorators: [ApolloDecorator([mockGetRecipes()])],
};

export const Default: Story = () => <RecipeList />;
