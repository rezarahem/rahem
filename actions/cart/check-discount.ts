'use server';

import { db } from '@/drizzle/db';
import { DiscountCode } from '@/drizzle/drizzle';
import { eq } from 'drizzle-orm';

type DiscountCodeType = typeof DiscountCode.$inferSelect;

export const CheckDiscount = async (
  discount: string,
): Promise<{
  discountCode?: DiscountCodeType;
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const res = await db.query.DiscountCode.findFirst({
      where: eq(DiscountCode.key, discount),
    });

    if (!res) {
      return {
        success: false,
        errorMessage: 'کد نامعتبر',
      };
    }

    return {
      discountCode: res,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
