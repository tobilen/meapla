import { Story } from "@storybook/react";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { defaultRecipes, mockGetRecipes } from "../../queries/recipe.mock";
import { RecipeList } from "./index";

export default {
  title: "RecipeList",
  decorators: [ApolloDecorator([mockGetRecipes()])],
};

export const Default: Story = () => <RecipeList />;
export const Selectable: Story = () => <RecipeList selectable />;
export const WithPreselectedElements: Story = () => (
  <RecipeList
    selectable
    selectedRecipes={[defaultRecipes[0], defaultRecipes[4]]}
  />
);
