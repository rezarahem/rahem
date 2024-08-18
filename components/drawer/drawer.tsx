'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { AnimatePresence, motion } from 'framer-motion';
import UserMenu from '../user-menu/user-menu';
import Link from 'next/link';
import NavLinks from '../navbar/nav-links';
import { UserSessionType } from '@/actions/auth/auth';
import { Logout } from '@/actions/auth/logout';

type DrawerProps = {
  session: {
    user: UserSessionType;
    expires: Date;
  } | null;
};

const Drawer = ({ session }: DrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { width } = useWindowSize();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (width > 640) {
      setIsDrawerOpen(false);
    }
  }, [width]);

  return (
    <div className='sm:hidden'>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setIsDrawerOpen(!isDrawerOpen);
        }}
        variant='ghost'
        size='icon'
        className='-mr-2'
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              onClick={(e) => {
                e.preventDefault();
                setIsDrawerOpen(!isDrawerOpen);
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 100,
              }}
              exit={{
                opacity: 0,
              }}
              className='fixed inset-0 z-40 bg-black/20 backdrop-blur'
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 150 }}
              animate={{
                y: 100,
                opacity: 100,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.05,
              }}
              className='fixed inset-0 z-50 rounded-xl rounded-b-none border bg-white shadow-md dark:bg-slate-900'
            >
              <div className='flex h-full flex-col justify-between px-4 pb-32 pt-6'>
                <div className='absolute right-1/2 top-1 h-1 w-32 translate-x-1/2 rounded-full bg-gray-200 dark:bg-slate-600'></div>
                <div>
                  <NavLinks onToggle={toggleDrawer} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drawer;
