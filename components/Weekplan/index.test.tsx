import { useRouter } from "next/router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Temporal } from "proposal-temporal";
import { wrapProviders } from "../../setup/wrapProviders";
import { defaultRecipes, mockGetRecipes } from "../../queries/recipe.mock";
import {
  mockAddPlan,
  mockDeletePlan,
  mockGetPlans,
} from "../../queries/plan.mock";
import { Weekplan } from "./index";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const push = jest.fn().mockResolvedValue(null);
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

describe("Weekplan", () => {
  it("adds a plan", async () => {
    render(
      <Weekplan
        from={Temporal.PlainDate.from("2020-01-06")}
        to={Temporal.PlainDate.from("2020-01-12")}
      />,
      wrapProviders({
        apollo: [
          mockGetRecipes(),
          mockGetPlans({ from: "2020-01-06", to: "2020-01-12" }, []),
          mockDeletePlan({ from: "2020-01-06", to: "2020-01-12" }, []),
          mockAddPlan([
            { id: 1, date: "2020-01-06", recipe: defaultRecipes[0] },
            { id: 2, date: "2020-01-07", recipe: defaultRecipes[1] },
            { id: 3, date: "2020-01-08", recipe: defaultRecipes[2] },
          ]),
        ],
        grommet: true,
      })
    );

    await screen.findByText("Bowl of Cereal");

    userEvent.click(screen.getByText("Bowl of Cereal"));
    expect(screen.getByLabelText("Bowl of Cereal")).toBeChecked();

    userEvent.click(screen.getByText("Caesar Salat"));
    expect(screen.getByLabelText("Caesar Salat")).toBeChecked();

    userEvent.click(screen.getByText("Brokkolisalat"));
    expect(screen.getByLabelText("Brokkolisalat")).toBeChecked();

    userEvent.click(screen.getByTitle("Save"));

    await waitFor(() => expect(push).toBeCalledWith("/"));
  });

  it("shows already selected plans", async () => {
    render(
      <Weekplan
        from={Temporal.PlainDate.from("2020-01-06")}
        to={Temporal.PlainDate.from("2020-01-12")}
      />,
      wrapProviders({
        apollo: [
          mockGetRecipes(),
          mockGetPlans({ from: "2020-01-06", to: "2020-01-12" }, [
            { id: 1, date: "2020-01-06", recipe: defaultRecipes[3] },
          ]),
        ],
        grommet: true,
      })
    );

    await screen.findByText("Lasagne Bolognese");
    expect(screen.getByLabelText("Lasagne Bolognese")).toBeChecked();
  });
});
