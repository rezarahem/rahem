'use server';

import { CartCourseType } from '@/components/cart/cart-context';
import { db } from '@/drizzle/db';
import { Cart } from '@/drizzle/drizzle';
import { eq } from 'drizzle-orm';

export const GetCartData = async (
  userId: number,
): Promise<{
  cartId: number | undefined;
  courses: CartCourseType[] | undefined;
}> => {
  try {
    const res = await db.query.Cart.findFirst({
      where: eq(Cart.userId, userId),
      columns: {
        userId: false,
      },
      with: {
        courseToCart: {
          columns: {
            cartId: false,
            courseId: false,
          },
          with: {
            course: true,
          },
        },
      },
    });

    const cartCourses = res?.courseToCart.map(({ course }, i) => ({
      courseId: course.id,
      courseTitle: course.title,
      courseAddressName: course.courseAddressName,
      price: course.price,
      thumbnailImage: course.thumbnailImage,
      sepcialPrice: course.specialPrice ?? 0,
      pending: false,
    })) satisfies CartCourseType[] | undefined;

    return {
      cartId: res?.id,
      courses: cartCourses,
    };
  } catch (error) {
    return {
      cartId: undefined,
      courses: undefined,
    };
  }
};
