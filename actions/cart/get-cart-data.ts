'use server';

import { CartCourseType } from '@/components/cart/cart-context';
import { db } from '@/drizzle/db';
import { Cart } from '@/drizzle/drizzle';
import { eq } from 'drizzle-orm';
import { getSession } from '../auth/auth';

export const GetCartData = async (): Promise<{
  cartId: number | undefined;
  userId: number | undefined;
  courses: CartCourseType[] | undefined;
}> => {
  try {
    const session = await getSession();

    if (!session || !session.user.id) {
      return {
        cartId: undefined,
        userId: undefined,
        courses: undefined,
      };
    }

    const res = await db.query.Cart.findFirst({
      where: eq(Cart.userId, session.user.id),
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
      spotPlayerId: course.spotPlayerId,
      pending: false,
    })) satisfies CartCourseType[] | undefined;

    return {
      cartId: res?.id,
      courses: cartCourses,
      userId: session.user.id,
    };
  } catch (error) {
    return {
      userId: undefined,

      cartId: undefined,
      courses: undefined,
    };
  }
};
