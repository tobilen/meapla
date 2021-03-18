import { MockedResponse } from "@apollo/client/testing";
import { Temporal } from "proposal-temporal";
import {
  DateRange,
  Mutation,
  MutationAddPlanArgs,
  Plan,
  Query,
} from "../typings/graphql";
import {
  ADD_PLAN_MUTATION,
  DELETE_PLAN_MUTATION,
  GET_PLAN_QUERY,
} from "./plan";
import { defaultRecipes } from "./recipe.mock";

export const mockGetPlans: (
  daterange: DateRange,
  plans?: Plan[]
) => MockedResponse<{
  getPlan: Query["getPlan"];
}> = (daterange, plans) => {
  const from = Temporal.PlainDateTime.from(daterange.from).toZonedDateTime(
    "Etc/UTC"
  );
  const to = Temporal.PlainDateTime.from(daterange.to).toZonedDateTime(
    "Etc/UTC"
  );

  const dates: Temporal.ZonedDateTime[] = new Array(
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
          plans:
            plans ||
            dates.map((day, index) => ({
              __typename: "Plan",
              id: day.toInstant().epochSeconds,
              date: `${day.toInstant()}`,
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

export const mockDeletePlan: (
  daterange: DateRange,
  plans: Plan[]
) => MockedResponse<{
  deletePlan: Mutation["deletePlan"];
}> = (daterange, plans) => ({
  request: {
    query: DELETE_PLAN_MUTATION,
    variables: { filter: { daterange } },
  },
  result: {
    data: {
      deletePlan: {
        plans,
      },
    },
  },
});
