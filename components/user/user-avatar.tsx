'use client';

import { LogOut, User } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from 'usehooks-ts';
import { UserSessionType } from '@/actions/auth/auth';
import { Logout } from '@/actions/auth/logout';
import { Button } from '../ui/button';
import {
  phoneNumberWithSpaces,
  toPersianNumberStr,
} from '@/lib/persian-string';

type UserAvatarProps = {
  session: {
    user: UserSessionType;
    expires: Date;
  } | null;
};

const UserAvatar = ({ session }: UserAvatarProps) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const checkClickedOutside = useCallback(
    (e: MouseEvent) => {
      if (
        isUserDropdownOpen &&
        modelRef.current &&
        !modelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    },
    [isUserDropdownOpen],
  );

  useEffect(() => {
    if (width > 640) {
      setIsUserDropdownOpen(false);
    }
  }, [width]);

  useEffect(() => {
    if (width < 640) {
      setIsUserDropdownOpen(false);
    }
  }, [width]);

  useEffect(() => {
    document.addEventListener('mousedown', checkClickedOutside);

    return () => document.removeEventListener('mousedown', checkClickedOutside);
  }, [isUserDropdownOpen]);

  return (
    <div className='relative max-w-7xl'>
      <Button
        size='icon'
        variant='ghost'
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault();
          setIsUserDropdownOpen(!isUserDropdownOpen);
        }}
      >
        <User className='max-sm:size-5' />
      </Button>

      <AnimatePresence key='custoum-animakey'>
        {isUserDropdownOpen && width < 640 && (
          <motion.div
            onClick={(e) => {
              e.preventDefault();
              setIsUserDropdownOpen(!isUserDropdownOpen);
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className='fixed inset-0 z-40 bg-black/20 backdrop-blur'
          ></motion.div>
        )}

        {isUserDropdownOpen && (
          <motion.div
            animate={{
              y: width > 640 ? 14 : -18,
              opacity: 100,
            }}
            exit={{
              opacity: 0,
            }}
            ref={modelRef}
            className='fixed inset-x-0 -bottom-5 z-50 w-full rounded-xl rounded-b-none border bg-white opacity-0 shadow-md dark:bg-slate-900 max-sm:h-96 sm:absolute sm:inset-auto sm:-left-10 sm:top-10 sm:w-80 sm:rounded-md'
          >
            <div className='flex items-center gap-x-3 border-b p-4'>
              <div className='relative flex size-14 items-center justify-center overflow-hidden rounded-full border-2 border-blue-600'>
                <p className='mb-1 text-3xl font-black'>
                  {String(session?.user.userName)[0]}
                </p>
              </div>
              <div className='space-y-1'>
                <p className='text-2xl font-bold'>{session?.user.userName}</p>
                <p className='text-xs text-muted-foreground'>
                  <span dir='ltr'>
                    {phoneNumberWithSpaces(
                      toPersianNumberStr(session?.user.phoneNumber as string),
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className='flex h-full w-full flex-col p-4 max-sm:pb-28'>
                <Button
                  className='flex w-full justify-start py-6'
                  variant='ghost'
                  onClick={(e) => {
                    setIsUserDropdownOpen(!isUserDropdownOpen)
                  }}
                >
              <Link href='/user' >
                  دوره‌های من
              </Link>
                </Button>

              <Button
                variant='ghost'
                className='mt-auto flex w-full items-center justify-start gap-x-2 py-6 text-rose-500 hover:text-rose-500 dark:hover:text-rose-500'
                onClick={async (e) => {
                  e.preventDefault();
                  await Logout();
                }}
              >
                <LogOut />
                خروج
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAvatar;
