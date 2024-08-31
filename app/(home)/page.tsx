import { FileUp, HandCoins, Headset, Target } from 'lucide-react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const iconFeatures: {
  label: string;
  icon: JSX.Element;
}[] = [
  {
    label: 'پروژه محور',
    icon: <Target className='size-10' />,
  },
  {
    label: 'پشتیبانی دائمی',
    icon: <Headset className='size-10' />,
  },
  {
    label: 'آپدیت رایگان',
    icon: <FileUp className='size-10' />,
  },
  {
    label: 'ضمانت بازگشت وجه',
    icon: <HandCoins className='size-10' />,
  },
];

const HomePage = () => {
  return (
    <Container className='flex-col'>
      <div className='w-full'>
        <div className='mt-12 flex flex-col items-center justify-center gap-y-20 text-center sm:mt-28 2xl:mt-36'>
          <h2 className='flex flex-col gap-x-0 text-5xl font-extrablack leading-normal sm:flex-row sm:gap-x-2 sm:text-6xl'>
            <span>ری‌اکت آسان</span>
            <span>برای وب</span>
          </h2>

          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <p className='font-bold text-muted-foreground'>
              همین حالا شروع کنید
            </p>
            <Link
              href='/courses/nextjs'
              className='rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black'
            >
              <strong>مشاهده دوره‌ها</strong>
            </Link>
          </div>
        </div>
      </div>
      <div className='my-8'></div>
      <div className='grid grid-cols-2 items-center justify-center gap-x-3 gap-y-12 px-0 py-14 hover:cursor-default sm:px-9 md:grid-cols-4 lg:px-32'>
        {iconFeatures.map(({ label, icon }) => (
          <div
            key={label}
            className='flex flex-col items-center justify-center gap-y-3'
          >
            {icon}
            <span className='text-center font-bold text-muted-foreground md:text-lg'>
              {label}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
