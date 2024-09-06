'use server';

import { db } from '@/drizzle/db';
import { getSession } from '../auth/auth';
import { AuthorizeUser } from '../auth/authorize-user';
import { and, eq } from 'drizzle-orm';
import { Order } from '@/drizzle/drizzle';

export const GetOrder = async (
  authority: string,
): Promise<{
  success: boolean;
  orderNumber?: number;
  orderFinalPrice?: number;
  errorMessage?: string;
}> => {
  try {
    const authorizeUser = await AuthorizeUser();
    const session = await getSession();

    if (!authorizeUser || !authorizeUser.success || !session) {
      return {
        success: false,
        errorMessage: authorizeUser.errorMessage ?? 'خطایی رخ داد',
      };
    }

    const order = await db.query.Order.findFirst({
      where: and(
        eq(Order.userId, session.user.id),
        eq(Order.authority, authority),
      ),
    });

    if (!order) {
      return {
        success: false,
        errorMessage: 'ورودی اشتباه',
      };
    }

    return {
      success: true,
      orderNumber: order.id,
      orderFinalPrice: order.finalPrice,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
