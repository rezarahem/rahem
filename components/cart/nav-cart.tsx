'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './cart-context';
import { cn } from '@/lib/utils';

const NavCart = () => {
  const { courses, cartPending } = useCart();

  return (
    <Button className='relative' variant='ghost' size='icon'>
      <Link href='/cart'>
        <ShoppingCart className='max-sm:size-5' />
        {courses.length > 0 && (
          <div className='absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-blue-500'>
            <span
              className={cn('ss02 translate-y-px text-xs text-white', {
                'text-gray-300': cartPending,
                'translate-x-[0.5px]': courses.length === 1,
              })}
            >
              {courses.length}
            </span>
          </div>
        )}
      </Link>
    </Button>
  );
};

export default NavCart;
