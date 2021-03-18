import { gql } from "@apollo/client";

export const GET_PLAN_QUERY = gql`
  query getPlan($filter: PlanFilter) {
    getPlan(filter: $filter) {
      plans {
        id
        date
        recipe {
          id
          name
        }
      }
    }
  }
`;

export const ADD_PLAN_MUTATION = gql`
  mutation addPlan($input: [PlanInput!]!) {
    addPlan(input: $input) {
      plans {
        id
        date
        recipe {
          id
          name
        }
      }
    }
  }
`;
