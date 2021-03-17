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
