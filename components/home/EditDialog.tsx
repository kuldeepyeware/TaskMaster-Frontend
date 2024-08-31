"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { useUpdateTask } from "@/hooks/task";
import { Task } from "@/gql/graphql";
import { EditTaskFormValues } from "@/interface/form";

interface EditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  form: UseFormReturn<EditTaskFormValues>;
}

const EditDialog: React.FC<EditDialogProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  form,
}) => {
  const { mutateAsync: mutateEditTask, isPending } = useUpdateTask();

  const handleUpdate = async (value: EditTaskFormValues) => {
    await mutateEditTask({ payload: value as Task });
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center'>Edit Task</DialogTitle>
        </DialogHeader>
        <Card className='shadow-lg'>
          <CardContent className='p-6'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className='space-y-6'>
                <FormField
                  control={form.control}
                  name='title'
                  rules={{
                    required: "Title is required",
                    validate: (value) =>
                      value.trim() !== "" || "Title cannot be empty spaces",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='Enter Task Title'
                          {...field}
                          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder='Enter Task Description'
                          {...field}
                          value={field.value ?? ""}
                          className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-700'>Status</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          disabled={isPending}
                          onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                            {field.value == "IN_PROGRESS"
                              ? "IN PROGRESS"
                              : field.value}
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='TODO'>TODO</SelectItem>
                            <SelectItem value='IN_PROGRESS'>
                              IN PROGRESS
                            </SelectItem>
                            <SelectItem value='DONE'>DONE</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className='text-red-500' />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={isPending}
                  className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-500/60 transition duration-300 ease-in-out'>
                  {isPending ? "Updating..." : "Update Task"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
