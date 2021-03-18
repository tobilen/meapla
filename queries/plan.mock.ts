import { MockedResponse } from "@apollo/client/testing";
import { Temporal } from "proposal-temporal";
import {
  DateRange,
  Mutation,
  MutationAddPlanArgs,
  Plan,
  Query,
} from "../typings/graphql";
import { ADD_PLAN_MUTATION, GET_PLAN_QUERY } from "./plan";
import { defaultRecipes } from "./recipe.mock";

export const mockGetPlans: (
  daterange: DateRange
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
            id: Temporal.Instant.from(`${day}T00:00Z`).epochSeconds,
            date: `${day}`,
            recipe: defaultRecipes[index % defaultRecipes.length],
          })),
        },
      },
    },
  };
};

export const mockAddPlan: (
  plans: Plan[]
) => MockedResponse<{
  addPlan: Mutation["addPlan"];
}> = (plans) => {
  const variables: MutationAddPlanArgs = {
    input: plans.map((plan) => {
      if (!plan.recipe)
        throw new Error("Plan provided in mock needs to have a recipe");

      return {
        date: plan.date,
        recipeId: plan.recipe.id,
      };
    }),
  };

  return {
    request: {
      query: ADD_PLAN_MUTATION,
      variables,
    },
    result: {
      data: {
        addPlan: {
          plans,
        },
      },
    },
  };
};
