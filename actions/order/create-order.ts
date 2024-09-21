'use server';

import { db } from '@/drizzle/db';
import { Order, OrderItem } from '@/drizzle/drizzle';
import { OrderSchema, OrderItemSchema, OrderItemArrSchema } from '@/zod/zod';
import * as z from 'zod';
import axios from 'axios';
import { eq } from 'drizzle-orm';

export type OrderType = z.infer<typeof OrderSchema>;
export type OrderItemType = z.infer<typeof OrderItemSchema>;
export type OrderItemArrType = z.infer<typeof OrderItemArrSchema>;

type zRes = {
  code: number;
  message: string;
  authority: string;
  fee_type: string;
  fee: number;
};

type CreateOrderProps = {
  order: OrderType;
  orderItems: OrderItemArrType;
};

export const CreateOrder = async ({
  order,
  orderItems,
}: CreateOrderProps): Promise<{
  success: boolean;
  payLink?: string;
  errorMessage?: string;
}> => {
  try {
    const validatedOrder = OrderSchema.safeParse(order);
    const validatedOrderItems = OrderItemArrSchema.safeParse(orderItems);

    if (!validatedOrder.success || !validatedOrderItems.success) {
      return {
        success: false,
        errorMessage: 'ورودی نامعتبر',
      };
    }

    const res = await db.transaction(async (tx) => {
      const [newOrder] = await tx
        .insert(Order)
        .values(validatedOrder.data)
        .returning();

      await tx.insert(OrderItem).values(
        validatedOrderItems.data.map((item) => ({
          ...item,
          orderId: newOrder.id,
        })),
      );

      return newOrder;
    });

    if (!res) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    const description = `سفارش شماره ${res.id}`;
    const finalPrice = res.price - res.specialPrice;

    console.log(finalPrice);

    const zRes = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json',
      {
        amount: finalPrice,
        description,
        metadata: {
          order_id: `${res.id}`,
        },
        currency: 'IRT',
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        callback_url: process.env.ZARINPAL_CALLBACK_URL,
      },
    );

    const { code, authority } = zRes.data.data as zRes;

    if (!zRes || code !== 100 || !authority) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    const [updatedOrder] = await db
      .update(Order)
      .set({
        authority,
        description,
      })
      .where(eq(Order.id, res.id))
      .returning();

    if (!updatedOrder || !updatedOrder.id) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    return {
      success: true,
      payLink: `https://www.zarinpal.com/pg/StartPay/${authority}`,
    };
  } catch (error) {
    // console.log(error);
    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
