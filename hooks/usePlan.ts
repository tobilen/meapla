import * as React from "react";
import {
  ApolloError,
  FetchResult,
  MutationResult,
  ObservableQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  Mutation,
  MutationAddPlanArgs,
  MutationDeletePlanArgs,
  Plan,
  PlanFilter,
  PlanInput,
  Query,
  QueryGetPlanArgs,
} from "../typings/graphql";
import {
  ADD_PLAN_MUTATION,
  DELETE_PLAN_MUTATION,
  GET_PLAN_QUERY,
} from "../queries/plan";

type MutationStatus = "idle" | "loading" | "error" | "success";

type AddPlanData = {
  addPlan: Mutation["addPlan"];
};
type DeletePlanData = {
  deletePlan: Mutation["deletePlan"];
};

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
  addPlan: {
    mutate: (plans: PlanInput[]) => Promise<FetchResult<AddPlanData>>;
    status: MutationStatus;
  } & MutationResult<AddPlanData>;
  deletePlan: {
    mutate: (
      deletionFilter: PlanFilter
    ) => Promise<FetchResult<DeletePlanData>>;
    status: MutationStatus;
  } & MutationResult<DeletePlanData>;
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

  const [requestAddPlan, addPlanResult] = useMutation<
    AddPlanData,
    MutationAddPlanArgs
  >(ADD_PLAN_MUTATION);
  const [requestDeletePlan, deletePlanResult] = useMutation<
    DeletePlanData,
    MutationDeletePlanArgs
  >(DELETE_PLAN_MUTATION);

  const addPlan = React.useCallback(
    (plans: PlanInput[]) =>
      requestAddPlan({
        variables: {
          input: plans,
        },
      }),
    [requestAddPlan]
  );

  const deletePlan = React.useCallback(
    async (deletionFilter: PlanFilter) =>
      requestDeletePlan({
        variables: { filter: deletionFilter },
      }),
    [requestDeletePlan]
  );

  return {
    data: result.data?.getPlan?.plans || [],
    status: getStatus(result),
    error: result.error,
    refetch: result.refetch,
    addPlan: {
      mutate: addPlan,
      ...addPlanResult,
      status: getStatus(addPlanResult),
    },
    deletePlan: {
      mutate: deletePlan,
      ...deletePlanResult,
      status: getStatus(deletePlanResult),
    },
  };
};
