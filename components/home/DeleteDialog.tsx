import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Task } from "@/gql/graphql";
import { useDeleteTask } from "@/hooks/task";

interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  task: Task;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  task,
}) => {
  const { mutateAsync: mutateDeleteTask, isPending } = useDeleteTask();

  const deleteTask = async () => {
    await mutateDeleteTask({ id: task.id });
    setIsDeleteDialogOpen(false);
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteTask}
            disabled={isPending}
            className='bg-red-500 hover:bg-red-500/60'>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
