'use client';

import { LogOut, MoonStar, Sun } from 'lucide-react';
import { RiContrastFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Logout } from '@/actions/auth/logout';

const ThemeController = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex'>
      {/* <Button
        onClick={async (e) => {
          await Logout();
        }}
        variant='ghost'
        className='group flex gap-2'
      >
        <LogOut className='size-5 group-hover:text-rose-500' />
        <span className='group-hover:text-rose-500'>خروج</span>
      </Button> */}

      <div className='flex w-fit items-center gap-1 rounded-full border'>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTheme('dark');
          }}
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <MoonStar
            className={cn('size-6 rounded-full p-1', {
              border: theme === 'dark',
            })}
          />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTheme('system');
          }}
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <RiContrastFill
            className={cn('size-6 rounded-full p-1', {
              border: theme === 'system',
            })}
          />
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTheme('light');
          }}
          variant='ghost'
          size='icon'
          className='rounded-full'
        >
          <Sun
            className={cn('size-6 rounded-full p-1', {
              border: theme === 'light',
            })}
          />
        </Button>
      </div>
    </div>
  );
};

export default ThemeController;
