import * as z from 'zod';

export const OrderSchema = z.object({
  totalPrice: z.number(),
  discountedPrice: z.number(),
  finalPrice: z.number(),
  userId: z.number(),
  description: z.string().nullable().optional(),
});

export const OrderItemSchema = z.object({
  itemPrice: z.number(),
  discountedItemPrice: z.number(),
  finalItemPrice: z.number(),
  courseId: z.number(),
  spotPlayerId: z.string()
});

export const OrderItemArrSchema = OrderItemSchema.array();
