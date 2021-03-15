import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { nanoid } from "nanoid";
import { wrapProviders } from "../../setup/wrapProviders";
import {
  mockAddRecipe,
  mockGetRecipes,
  mockUpdateRecipe,
} from "../../queries/recipe.mock";
import { Measurement, Recipe } from "../../typings/graphql";
import { RecipeForm } from "./index";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

describe("ReceipeForm", () => {
  it("disables add ingredient button if no ingredient name is given", () => {
    render(
      <RecipeForm id={null} />,
      wrapProviders({ apollo: [], grommet: true })
    );

    expect(screen.getByTitle("Add new ingredient")).toBeDisabled();

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Butter"
    );
    expect(screen.getByTitle("Add new ingredient")).toBeEnabled();

    userEvent.clear(screen.getByLabelText("Enter new ingredient name"));
    expect(screen.getByTitle("Add new ingredient")).toBeDisabled();
  });

  it("adds an ingredient", async () => {
    render(
      <RecipeForm id={null} />,
      wrapProviders({
        apollo: [],
        grommet: true,
      })
    );

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Butter"
    );
    userEvent.click(screen.getByTitle("Add new ingredient"));

    expect(await screen.findByText("Ingredient 1")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Enter new ingredient name")
    ).not.toHaveValue();
  });

  it("deletes an ingredient", async () => {
    render(
      <RecipeForm id={null} />,
      wrapProviders({
        apollo: [],
        grommet: true,
      })
    );

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Butter"
    );
    userEvent.click(screen.getByTitle("Add new ingredient"));

    expect(await screen.findByText("Ingredient 1")).toBeInTheDocument();

    userEvent.click(screen.getByText("(Delete)"));

    await waitFor(() =>
      expect(screen.queryByText("Ingredient 1")).not.toBeInTheDocument()
    );
  });

  it("updates an ingredient", async () => {
    render(
      <RecipeForm id={null} />,
      wrapProviders({
        apollo: [],
        grommet: true,
      })
    );

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Butter"
    );
    userEvent.click(screen.getByTitle("Add new ingredient"));

    expect(await screen.findByText("Ingredient 1")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: 7 },
    });

    await waitFor(() => expect(screen.getByLabelText("Amount")).toHaveValue(7));
  });

  it("creates a recipe", async () => {
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

    render(
      <RecipeForm id={null} />,
      wrapProviders({
        apollo: [mockAddRecipe(mockedRecipe)],
        grommet: true,
      })
    );

    userEvent.type(screen.getByLabelText("Recipe name"), "My Recipe");

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Butter"
    );

    (nanoid as jest.Mock).mockReturnValueOnce("1");
    userEvent.click(screen.getByTitle("Add new ingredient"));

    expect(await screen.findByText("Ingredient 1")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: 7 },
    });

    userEvent.click(screen.getByText("Create"));

    expect(await screen.findByText("Saved successfully!")).toBeInTheDocument();
  });

  it("updates a recipe", async () => {
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

    render(
      <RecipeForm id={1} />,
      wrapProviders({
        apollo: [
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
        ],
        grommet: true,
      })
    );

    await screen.findByDisplayValue("My Recipe");

    userEvent.clear(screen.getByLabelText("Recipe name"));
    userEvent.type(screen.getByLabelText("Recipe name"), "My improved Recipe");

    userEvent.type(
      screen.getByLabelText("Enter new ingredient name"),
      "Olivenöl"
    );

    (nanoid as jest.Mock).mockReturnValueOnce("2");
    userEvent.click(screen.getByTitle("Add new ingredient"));

    expect(await screen.findByText("Ingredient 2")).toBeInTheDocument();

    fireEvent.change(screen.getAllByLabelText("Amount")[1], {
      target: { value: 2 },
    });

    userEvent.click(screen.getByText("Update"));

    expect(
      await screen.findByText("Updated successfully!")
    ).toBeInTheDocument();
  });
});
