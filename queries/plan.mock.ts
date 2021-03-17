import { MockedResponse } from "@apollo/client/testing";
import { Temporal } from "proposal-temporal";
import { DateRange, Query } from "../typings/graphql";
import { GET_PLAN_QUERY } from "./plan";
import { defaultRecipes } from "./recipe.mock";

export const mockGetPlans: (
  range: DateRange
) => MockedResponse<{
  getPlan: Query["getPlan"];
}> = (daterange) => {
  const from = Temporal.PlainDate.from(daterange.from);
  const to = Temporal.PlainDate.from(daterange.to);

  const dates: Temporal.PlainDate[] = new Array(
    from.until(to).total({ unit: "days" })
  )
    .fill(1)
    .map((v, days) => from.add({ days }));

  return {
    request: {
      query: GET_PLAN_QUERY,
      variables: { filter: { daterange } },
    },
    result: {
      data: {
        getPlan: {
          __typename: "PlanOutput",
          plans: dates.map((day, index) => ({
            __typename: "Plan",
            id: index,
            date: `${day}`,
            recipe: defaultRecipes[index % defaultRecipes.length],
          })),
        },
      },
    },
  };
};
