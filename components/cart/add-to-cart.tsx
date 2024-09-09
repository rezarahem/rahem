'use client';

import { Button } from '../ui/button';
import { CartCourseType, useCart } from './cart-context';
import Link from 'next/link';

type AddToCartProps = {
  course: CartCourseType;
  isStudet: 100 | 101;
};

const AddToCart = ({ course, isStudet }: AddToCartProps) => {
  const { addCourse, cartId, userId, courses, cartPending } = useCart();
  const isAdded = courses.some((c) => c.courseId === course.courseId);

  const addToCartAction = () => {
    switch (isStudet) {
      case 100:
        return (
          <Button disabled={cartPending} onClick={() => addCourse(course)}>
            ثبت نام
          </Button>
        );

      case 101:
        return (
          <Link href='/user'>
            <Button>مشاهده لایسنس</Button>
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
