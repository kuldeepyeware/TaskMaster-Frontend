import { Status } from "@/gql/graphql";

export interface EditTaskFormValues {
  id: string;
  title: string;
  description: string | null;
  status: Status;
}
