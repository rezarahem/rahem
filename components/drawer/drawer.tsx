'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { AnimatePresence, motion } from 'framer-motion';
import NavLinks from '../navbar/nav-links';

const Drawer = () => {
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
        // className='-mr-2'
      >
        <Menu className='max-sm:size-5' />
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
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              className='fixed inset-0 z-40 bg-black/20 backdrop-blur'
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, x: 240 }}
              animate={{
                x: 50,
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                x: 240,
              }}
              transition={{
                bounce: 0.1,
                duration: 0.3,
                stiffness: 180,
                type: 'spring',
                damping: 20,
              }}
              className='fixed inset-0 z-50 w-60 rounded-xl rounded-r-none border bg-white shadow-md dark:bg-slate-900'
            >
              <div className='flex h-full flex-col justify-between p-5 pr-[4.2rem]'>
                {/* <div className='absolute right-1/2 top-1 h-1 w-32 translate-x-1/2 rounded-full bg-gray-200 dark:bg-slate-600'></div> */}
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
