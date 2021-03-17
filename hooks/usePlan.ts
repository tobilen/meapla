import {
  ApolloError,
  MutationResult,
  ObservableQuery,
  useQuery,
} from "@apollo/client";
import { Plan, PlanFilter, Query, QueryGetPlanArgs } from "../typings/graphql";
import { GET_PLAN_QUERY } from "../queries/plan";

type MutationStatus = "idle" | "loading" | "error" | "success";

export type UsePlan = (
  filter: PlanFilter
) => {
  data: Plan[];
  error?: ApolloError;
  status: MutationStatus;
  refetch: ObservableQuery<
    { getPlan: Query["getPlan"] },
    QueryGetPlanArgs
  >["refetch"];
};

const getStatus = (result: MutationResult): MutationStatus => {
  if (!result.called) return "idle";
  if (result.loading) return "loading";
  if (result.error) return "error";
  return "success";
};

export const usePlan: UsePlan = (filter) => {
  const result = useQuery<{ getPlan: Query["getPlan"] }, QueryGetPlanArgs>(
    GET_PLAN_QUERY,
    { variables: { filter } }
  );

  return {
    data: result.data?.getPlan?.plans || [],
    status: getStatus(result),
    error: result.error,
    refetch: result.refetch,
  };
};
