'use server';

import { db } from '@/drizzle/db';
import { Cart, CourseToCart } from '@/drizzle/drizzle';
import { and, eq } from 'drizzle-orm';

export const AddToCartAction = async (
  cartId: number | undefined,
  courseId: number,
  userId: number,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    if (userId && cartId) {
      await db.insert(CourseToCart).values({
        cartId,
        courseId,
      });
    } else {
      await db.transaction(async (tx) => {
        const [cart] = await tx
          .insert(Cart)
          .values({
            userId,
          })
          .returning();

        await tx.insert(CourseToCart).values({
          cartId: cart.id,
          courseId,
        });
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: 'خطایی رخ داد' };
  }
};

export const RemoveFromCartAction = async (
  cartId: number,
  courseId: number,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    await db
      .delete(CourseToCart)
      .where(
        and(
          eq(CourseToCart.cartId, cartId),
          eq(CourseToCart.courseId, courseId),
        ),
      );

    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: 'خطایی رخ داد' };
  }
};
