import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-3 max-sm:mt-24 sm:h-dvh'>
      <h2 className='text-9xl font-extrablack'>۴۰۴</h2>
      <h2 className='text-xl font-bold'>صفحه‌ای پیدا نشد! 🙄</h2>
      <Link
        href='/'
        className='rounded-md bg-black px-4 py-2 font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black'
      >
        صفحه‌ اصلی
      </Link>
    </div>
  );
};

export default NotFound;
