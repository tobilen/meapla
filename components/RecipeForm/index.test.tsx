import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { wrapProviders } from "../../setup/wrapProviders";
import { Ingredient, Measurement } from "../../typings/graphql";
import {
  mockAddIngredient,
  mockDeleteIngredient,
  mockUpdateIngredient,
} from "../../queries/ingredient.mock";
import { RecipeForm } from "./index";

const addedIngredient: Ingredient = {
  id: 0,
  name: "Butter",
  measurement: Measurement.Gramm,
  amount: 0,
};

describe("ReceipeForm", () => {
  describe("ingredients", () => {
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
          apollo: [mockAddIngredient(addedIngredient)],
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
          apollo: [
            mockAddIngredient(addedIngredient),
            mockDeleteIngredient(addedIngredient),
          ],
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
          apollo: [
            mockAddIngredient(addedIngredient),
            mockUpdateIngredient({ ...addedIngredient, amount: 7 }),
          ],
          grommet: true,
        })
      );

      userEvent.type(
        screen.getByLabelText("Enter new ingredient name"),
        "Butter"
      );
      userEvent.click(screen.getByTitle("Add new ingredient"));

      expect(await screen.findByText("Ingredient 1")).toBeInTheDocument();

      // userEvent.type(screen.getByLabelText("Amount"), "7");
      fireEvent.change(screen.getByLabelText("Amount"), {
        target: { value: 7 },
      });

      await waitFor(() =>
        expect(screen.getByLabelText("Amount")).toHaveValue(7)
      );
    });
  });
});
