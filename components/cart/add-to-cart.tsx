'use client';

import { Button } from '../ui/button';
import { CartCourseType, useCart } from './cart-context';
import Link from 'next/link';

type AddToCartProps = {
  course: CartCourseType;
};

const AddToCart = ({ course }: AddToCartProps) => {
  const { addCourse, cartId, userId, courses, cartPending } = useCart();
  const isAdded = courses.some((c) => c.courseId === course.courseId);

  return (
    <>
      {isAdded ? (
        <Link href='/cart'>
          <Button disabled={cartPending}>ادامه خرید</Button>
        </Link>
      ) : (
        <Button disabled={cartPending} onClick={() => addCourse(course)}>
          ثبت نام
        </Button>
      )}
    </>
  );
};

export default AddToCart;
