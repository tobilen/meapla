import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrapProviders } from "../../setup/wrapProviders";
import { mockDeleteRecipe, mockGetRecipes } from "../../queries/recipe.mock";
import { Measurement, Recipe } from "../../typings/graphql";
import { RecipeList } from "./index";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

const recipe: Recipe = {
  id: 1,
  name: "Bowl of Cereal",
  ingredients: [
    {
      id: "1",
      name: "Milk",
      amount: 200,
      measurement: Measurement.Milliliters,
    },
    {
      id: "2",
      name: "Cereal",
      amount: 200,
      measurement: Measurement.Gramm,
    },
  ],
};

describe("ReceipeList", () => {
  it("invokes callback when a recipe is clicked", async () => {
    const onRecipeSelect = jest.fn();

    render(
      <RecipeList selectable onRecipeSelect={onRecipeSelect} />,
      wrapProviders({
        apollo: [mockGetRecipes({ recipes: [recipe] })],
        grommet: true,
      })
    );

    userEvent.click(await screen.findByText("Bowl of Cereal"));

    expect(onRecipeSelect).toBeCalledWith([recipe]);

    userEvent.click(await screen.findByText("Bowl of Cereal"));

    expect(onRecipeSelect).toBeCalledWith([]);
  });

  it("deletes a recipe if delete button is clicked", async () => {
    render(
      <RecipeList />,
      wrapProviders({
        apollo: [
          mockGetRecipes({ recipes: [recipe] }),
          mockDeleteRecipe(recipe),
          mockGetRecipes({ recipes: [] }),
        ],
        grommet: true,
      })
    );

    userEvent.click(await screen.findByLabelText("Delete Bowl of Cereal"));

    await waitFor(() =>
      expect(screen.queryByText("Bowl of Cereal")).not.toBeInTheDocument()
    );
  });
});
