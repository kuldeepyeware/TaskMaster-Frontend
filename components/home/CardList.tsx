import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { Status, Task } from "@/gql/graphql";
import { useForm } from "react-hook-form";
import { useState } from "react";
import EditDialog from "./EditDialog";
import { getStatusColor } from "@/helpers";
import DeleteDialog from "./DeleteDialog";
import { EditTaskFormValues } from "@/interface/form";

const CardList = ({ task }: { task: Task }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const form = useForm<EditTaskFormValues>({
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description ?? null,
      status: task.status as Status,
    },
    mode: "onBlur",
  });

  const handleEditClick = () => {
    form.setValue("id", task.id);
    form.setValue("title", task.title);
    form.setValue("description", task.description!);
    form.setValue("status", task.status!);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <Card className='w-full hover:shadow-lg cursor-pointer transition-shadow duration-300'>
        <CardContent className='p-5 relative'>
          <div className='absolute top-3 right-3 flex gap-1'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleEditClick}
              className='h-8 w-8 hover:bg-gray-100'>
              <FilePenIcon className='h-4 w-4' />
              <span className='sr-only'>Edit</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleDeleteClick}
              className='h-8 w-8 text-red-500 hover:bg-red-100 hover:text-red-700'>
              <TrashIcon className='h-4 w-4' />
              <span className='sr-only'>Delete</span>
            </Button>
          </div>
          <Badge
            variant={getStatusColor(task?.status as string) ?? "default"}
            className={"mb-3"}>
            {task?.status === "IN_PROGRESS" ? "IN PROGRESS" : task.status}
          </Badge>
          <h3 className='text-lg font-semibold mb-2 pr-16 line-clamp-2'>
            {task?.title}
          </h3>
          {task?.description && (
            <p className='text-muted-foreground text-sm line-clamp-3'>
              {task?.description}
            </p>
          )}
        </CardContent>
      </Card>

      <EditDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        form={form}
      />

      <DeleteDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        task={task}
      />
    </>
  );
};

export default CardList;
