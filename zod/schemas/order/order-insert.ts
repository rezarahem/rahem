import * as z from 'zod';

export const OrderSchema = z.object({
  price: z.number(),
  specialPrice: z.number(),
  userId: z.number(),
  description: z.string().nullable().optional(),
});

export const OrderItemSchema = z.object({
  itemPrice: z.number(),
  itemSpecialPrice: z.number(),
  courseId: z.number(),
  spotPlayerId: z.string(),
});

export const OrderItemArrSchema = OrderItemSchema.array();
