import { graphql } from "../../gql";

export const getAllTasksQuery = graphql(`
  #graphql
  query GetAllTasks {
    getAllTasks {
      id
      title
      description
      status
    }
  }
`);
