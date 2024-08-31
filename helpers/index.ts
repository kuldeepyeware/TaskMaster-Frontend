export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "todo":
      return "todo";
    case "in_progress":
      return "in_progress";
    case "done":
      return "done";
    default:
      return "default";
  }
};
