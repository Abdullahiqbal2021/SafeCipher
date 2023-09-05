import { Link } from "react-router-dom";

import { FileWarning } from "lucide-react";

import errorImage from "/public/404.png";

export default function NotFound() {
  return (
    <section className='grid h-screen  place-items-center'>
      <div className='flex flex-col items-center gap-0 xl:gap-24 xl:flex-row'>
        <div className='flex flex-col items-center justify-center max-w-[240px] gap-5 text-center xl:max-w-sm'>
          <div className='flex items-center justify-center gap-2'>
            <h1 className='text-5xl font-bold'>Error</h1>
            <FileWarning className='text-red-500' size={42} />
          </div>
          <p className='font-medium text-gray-600 break-words text-1xl xl:text-2xl'>
            The page you are trying to access does not exist.
          </p>
          <Link to='/'>
            <button className='flex items-center gap-2 px-4 py-3 text-xs xl:text-base font-semibold border-[3px] border-primary rounded-xl bg-transparent text-primary hover:bg-primary hover:text-white hover:bg-black transition-all duration-300'>
              Back to the beginning
            </button>
          </Link>
        </div>
        <div>
          <img src={errorImage} className='w-[600px] xl:w-[800px]' />
        </div>
      </div>
    </section>
  );
}
