"use client";

import CardList from "@/components/home/CardList";
import { useGetAllTasks } from "@/hooks/task";
import { AlertTriangle } from "lucide-react";

const Home = () => {
  const { tasks, isLoading } = useGetAllTasks();

  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1 py-8 px-6'>
        <div className='container mx-auto'>
          {isLoading ? (
            <div className='flex h-[calc(100vh-4rem)] items-center justify-center text-white'>
              <div className='text-center'>
                <div className='mx-auto h-16 w-16 animate-spin text-black rounded-full border-b-2 border-black'></div>
                <p className='mt-4 text-xl text-black font-semibold'>
                  Loading Tasks...
                </p>
              </div>
            </div>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-6'>All Tasks</h2>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {tasks?.length! >= 1 ? (
                  tasks?.map((task, index) => (
                    <CardList key={index} task={task!} />
                  ))
                ) : (
                  <div className='col-span-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md'>
                    <div className='flex gap-2 items-center'>
                      <AlertTriangle />
                      <p className='font-bold'>No Tasks Present</p>
                    </div>
                    <p className='mt-2 text-sm'>
                      There are currently no tasks available. Create a new task
                      to get started!
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
