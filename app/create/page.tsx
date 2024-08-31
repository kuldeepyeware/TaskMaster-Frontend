"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/task";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is Required").max(50),
  description: z.string(),
});

const Create = () => {
  const { mutateAsync: mutateCreateTask, isPending } = useCreateTask();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) {
      toast.error("Values Are Required");
    }
    await mutateCreateTask({ payload: values });
    form.reset();
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <main className='flex-1 py-12 px-4'>
        <div className='container mx-auto max-w-md'>
          <Card className='shadow-lg'>
            <CardHeader className=' bg-blue-500 text-white text-xl font-semibold rounded-t-lg p-6 text-center'>
              Create New Task
            </CardHeader>
            <CardContent className='p-6'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-6'>
                  <FormField
                    control={form.control}
                    name='title'
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
                            className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage className='text-red-500' />
                      </FormItem>
                    )}
                  />

                  <Button
                    type='submit'
                    disabled={isPending}
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-500/60 transition duration-300 ease-in-out'>
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Create;
