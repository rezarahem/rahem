'use client';

import { Trash2 } from 'lucide-react';
import { CartCourseType, useCart } from './cart-context';
import { Button } from '../ui/button';

type RemoveCourseFromCartBtnProps = {
  course: CartCourseType;
};

const RemoveBtnCourseFromCartBtn = ({
  course,
}: RemoveCourseFromCartBtnProps) => {
  const { removeCourse } = useCart();

  return (
    <Button
      variant='ghost'
      size='icon'
      className='text-red-500 hover:text-red-500'
      onClick={() => {
        removeCourse(course);
      }}
    >
      <Trash2 className='size-6' />
    </Button>
  );
};

export default RemoveBtnCourseFromCartBtn;
