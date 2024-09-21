'use server';

import { db } from '@/drizzle/db';
import { getSession, decryptLicense } from '../auth/auth';
import { eq } from 'drizzle-orm';
import { Order, User } from '@/drizzle/drizzle';

type UserOrderType =
  | {
      licence: string | null;
      orderItem: string[];
    }[]
  | undefined;

export const GetUserOrders = async (): Promise<{
  success: boolean;
  errorMessage?: string;
  userOrders?: UserOrderType;
}> => {
  try {
    const session = await getSession();

    if (!session || !session.user.id) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    const userOrders = await db.query.User.findFirst({
      where: eq(User.id, session.user.id),
      columns: {},
      with: {
        userOrder: {
          where: eq(Order.verified, true),
          columns: {},
          with: {
            orderItem: {
              columns: {},
              with: {
                course: {
                  columns: {
                    title: true,
                  },
                },
              },
            },
            licence: {
              columns: {
                key: true,
              },
            },
          },
        },
      },
    });

    const orders = userOrders?.userOrder.map((order, i) => {
      const key = order.licence ? (order.licence.key as string) : null;
      return {
        licence: key,
        orderItem: order.orderItem.map((c, i) => c.course.title),
      };
    }) satisfies UserOrderType;

    return {
      success: true,
      userOrders: orders,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
