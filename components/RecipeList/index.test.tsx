import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wrapProviders } from "../../setup/wrapProviders";
import { mockDeleteRecipe, mockGetRecipes } from "../../queries/recipe.mock";
import { Measurement, Recipe } from "../../typings/graphql";
import { RecipeList } from "./index";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

describe("ReceipeList", () => {
  it("deletes a recipe if delete button is clicked", async () => {
    const recipe: Recipe = {
      id: 1,
      name: "Bowl of Cereal",
      ingredients: [
        {
          id: "1",
          name: "Milk",
          amount: 200,
          measurement: Measurement.Milliliters,
          __typename: "Ingredient",
        },
        {
          id: "2",
          name: "Cereal",
          amount: 200,
          measurement: Measurement.Gramm,
          __typename: "Ingredient",
        },
      ],
      __typename: "Recipe",
    };

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
