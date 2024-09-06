import * as z from 'zod';

export const PaymentSchema = z.object({
  amount: z.number().min(0),
  description: z.string().min(1),
  metadata: z
    .object({
      mobile: z.string().nullable().optional(),
      email: z.string().email().nullable().optional(),
      order_id: z.string().nullable().optional(),
    })
    .optional(),
});
