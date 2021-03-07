import { render, screen } from "@testing-library/react";
import { wrapProviders } from "../../setup/wrapProviders";
import { RecipeForm } from "./index";

describe("ReceipeForm", () => {
  it("renders", () => {
    render(<RecipeForm />, wrapProviders({ apollo: [] }));

    expect(screen.getByText("Add a new recipe")).toBeInTheDocument();
  });
});
