import { graphqlClient } from "@/api";
import { CreateTaskInput, UpdateTaskInput } from "@/gql/graphql";
import {
  createTaskMutation,
  deleteTaskMutation,
  updateTaskMutation,
} from "@/graphql/mutation/task";
import { getAllTasksQuery } from "@/graphql/query/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllTasks = () => {
  const query = useQuery({
    queryKey: ["all-Tasks"],
    queryFn: async () => await graphqlClient.request(getAllTasksQuery),
  });

  return { ...query, tasks: query.data?.getAllTasks };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ payload }: { payload: CreateTaskInput }) => {
      return graphqlClient.request(createTaskMutation, { payload });
    },

    onSuccess: () => {
      toast.success("Created Task Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["all-Tasks"],
      });
    },

    onError: (error: Error) => {
      let errorMessage = error.message.split(": ")[0];
      toast.error(errorMessage ?? "Failed To Create Task!");
    },
  });

  return { mutateAsync, isPending };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ payload }: { payload: UpdateTaskInput }) => {
      return graphqlClient.request(updateTaskMutation, { payload });
    },

    onSuccess: () => {
      toast.success("Updated Task Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["all-Tasks"],
      });
    },

    onError: (error: Error) => {
      let errorMessage = error.message.split(": ")[0];
      toast.error(errorMessage ?? "Failed To Edit Task!");
    },
  });

  return { mutateAsync, isPending };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return graphqlClient.request(deleteTaskMutation, { deleteTaskId: id });
    },

    onSuccess: () => {
      toast.success("Deleted Task Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["all-Tasks"],
      });
    },

    onError: (error: Error) => {
      let errorMessage = error.message.split(": ")[0];
      toast.error(errorMessage ?? "Failed To Delete Task!");
    },
  });

  return { mutateAsync, isPending };
};
