import { Story } from "@storybook/react";
import { ApolloDecorator } from "../../.storybook/ApolloDecorator";
import { mockGetRecipes, mockUpdateRecipe } from "../../queries/recipe.mock";
import { Measurement, Recipe } from "../../typings/graphql";
import { RecipeForm } from "./index";

export default {
  title: "RecipeForm",
  decorators: [ApolloDecorator([])],
};

const mockedRecipe: Recipe = {
  id: 1,
  name: "My Recipe",
  ingredients: [
    {
      id: "1",
      name: "Butter",
      amount: 7,
      measurement: Measurement.Gramm,
    },
  ],
};

export const Default: Story = () => <RecipeForm id={null} />;
export const Update: Story = () => <RecipeForm id={1} />;
Update.decorators = [
  ApolloDecorator([
    mockGetRecipes({
      recipes: [mockedRecipe],
      filter: {
        ids: [1],
      },
    }),
    mockUpdateRecipe({
      ...mockedRecipe,
      name: "My improved Recipe",
      ingredients: [
        ...mockedRecipe.ingredients,
        {
          id: "2",
          name: "Olivenöl",
          amount: 2,
          measurement: Measurement.Gramm,
        },
      ],
    }),
  ]),
];
