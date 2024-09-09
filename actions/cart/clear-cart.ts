'use server';

import { db } from '@/drizzle/db';
import { CourseToCart } from '@/drizzle/drizzle';
import { eq } from 'drizzle-orm';

export const ClearCart = async (
  cartId: number,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    await db.delete(CourseToCart).where(eq(CourseToCart.cartId, cartId));

    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: 'خطایی رخ داد' };
  }
};
