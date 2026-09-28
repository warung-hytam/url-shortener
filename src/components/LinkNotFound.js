'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LinkNotFound() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <div className="flex flex-grow flex-col justify-center items-center">
        <div className="px-2">
          <h1 className="text-xl text-center md:text-4xl font-semibold md:font-bold">Link Not Found</h1>
          <p className="text-sm md:text-lg text-justify">The link you are trying to access does not exist or has been deleted.</p>
          <p className="mt-4 text-gray-400 text-sm text-center">
            Redirecting to home page in {seconds} second{seconds > 1 ? 's' : ''}...
          </p>
        </div>
      </div>
    </div>
  );
}
