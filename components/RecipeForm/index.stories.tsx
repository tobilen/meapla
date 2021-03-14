import { Story } from "@storybook/react";
import { WrapperDecorator } from "../../.storybook/WrapperDecorator";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetRecipeEmpty } from "../../queries/recipe.mock";
import { RecipeForm } from "./index";

export default {
  title: "RecipeForm",
  decorators: [ApolloDecorator([mockGetRecipeEmpty])],
};

export const Default: Story = () => <RecipeForm />;

export const Wrapped: Story = () => <RecipeForm />;
Wrapped.decorators = [WrapperDecorator];
