import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { nanoid } from "nanoid";
import { wrapProviders } from "../../setup/wrapProviders";
import { mockAddRecipe } from "../../queries/recipe.mock";
import { Measurement, Recipe } from "../../typings/graphql";
import { RecipeForm } from "./index";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

describe("ReceipeForm", () => {
  it("disables add ingredient button if no ingredient name is given", () => {
    render(<RecipeForm />, wrapProviders({ apollo: [], grommet: true }));

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
      <RecipeForm />,
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
      <RecipeForm />,
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
      <RecipeForm />,
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

  it("saves a recipe", async () => {
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
      <RecipeForm />,
      wrapProviders({
        apollo: [mockAddRecipe(mockedRecipe)],
        grommet: true,
      })
    );

    userEvent.type(screen.getByLabelText("Name"), "My Recipe");

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

    userEvent.click(screen.getByText("Save"));

    expect(await screen.findByText("Saved successfully!")).toBeInTheDocument();
  });
});
