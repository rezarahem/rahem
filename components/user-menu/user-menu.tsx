import {
  phoneNumberWithSpaces,
  toPersianNumberStr,
} from '@/lib/persian-string';
import { BadgeCheck, Clapperboard, MessageCircleQuestion } from 'lucide-react';
import Link from 'next/link';

type UserMenuProps = {
  session: {
    user: {
      id: number;
      phoneNumber: string;
      userRole?: string;
    };
    expires: string;
  } | null;
};

const UserMenu = ({ session }: UserMenuProps) => {
  const userPhoneNumber = session ? session.user.phoneNumber : '';

  return (
    <div className='flex flex-col gap-2 p-2'>
      <Link
        href='#'
        className='flex w-full items-center justify-end gap-1 rounded-md p-2 hover:bg-gray-100/80 dark:hover:bg-gray-100/15'
      >
        <p className='flex flex-col text-left leading-3'>
          <span className='text-sm leading-none'>دوره‌های من</span>
          {/* <span className='text-xs leading-none'>تومانء</span> */}
        </p>
        <Clapperboard className='size-6' />
      </Link>
      <Link
        href='#'
        className='flex w-full items-center justify-end gap-1 rounded-md p-2 hover:bg-gray-100/80 dark:hover:bg-gray-100/15'
      >
        <p className='flex flex-col text-left leading-3'>
          <span className='text-sm leading-none'>نحوه استفاده</span>
          {/* <span className='text-xs leading-none'>تومانء</span> */}
        </p>
        <MessageCircleQuestion className='size-6' />
      </Link>
    </div>
  );
};

export default UserMenu;
