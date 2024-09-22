'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { CartCourseType, useCart } from './cart-context';
import Link from 'next/link';

type AddToCartProps = {
  course: CartCourseType;
  isStudent: 100 | 101;
};

const AddToCart = ({ course, isStudent }: AddToCartProps) => {
  const { addCourse, cartId, userId, courses, cartPending, isMounted } =
    useCart();

  const isAdded = courses.some((c) => c.courseId === course.courseId);

  if (!isMounted)
    return (
      <Button>
        <DotsHorizontalIcon className='size-12 animate-pulse text-muted-foreground' />
      </Button>
    );

  const addToCartAction = () => {
    console.log(course);
    switch (isStudent) {
      case 100:
        return (
          <Button disabled={cartPending} onClick={() => addCourse(course)}>
            ثبت نام
          </Button>
        );

      case 101:
        return (
          <Link href='/user'>
            <Button disabled={cartPending}>مشاهده لایسنس</Button>
          </Link>
        );
    }
  };

  return (
    <>
      {isAdded ? (
        <Link href='/cart'>
          <Button disabled={cartPending}>ادامه خرید</Button>
        </Link>
      ) : (
        <>{addToCartAction()}</>
      )}
    </>
  );
};

export default AddToCart;
