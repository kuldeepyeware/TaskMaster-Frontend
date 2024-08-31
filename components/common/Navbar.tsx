import { CheckCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className='bg-blue-500 text-white shadow-md'>
      <div className='container mx-auto py-4 px-6'>
        <div className='flex items-center justify-between'>
          <Link href={"/"} className='flex items-center space-x-2'>
            <CheckCircleIcon className='h-8 w-8' />
            <h1 className='text-2xl font-bold'>TaskMaster</h1>
          </Link>
          <Link
            href={"/create"}
            className='flex items-center p-2 rounded-md gap-2 bg-white text-blue-700 hover:bg-blue-50'>
            <PlusIcon className='h-5 w-5' />
            Create Task
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
