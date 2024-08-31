import { graphql } from "../../gql";

export const createTaskMutation = graphql(`
  #graphql
  mutation CreateTask($payload: createTaskInput!) {
    createTask(payload: $payload) {
      id
    }
  }
`);

export const updateTaskMutation = graphql(`
  #graphql
  mutation UpdateTask($payload: updateTaskInput!) {
    updateTask(payload: $payload) {
      id
    }
  }
`);

export const deleteTaskMutation = graphql(`
  #graphql
  mutation DeleteTask($deleteTaskId: String!) {
    deleteTask(id: $deleteTaskId)
  }
`);
