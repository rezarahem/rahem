'use server';

import { PaymentSchema } from '@/zod/zod';
import axios from 'axios';
import { resourceUsage } from 'process';
import * as z from 'zod';

// type PaymentProps = {
//   amount: number;
//   description: string;
//   metadata?: {
//     mobile?: string;
//     email?: string;
//     order_id?: string;
//   };
// };
type PaymentProps = z.infer<typeof PaymentSchema>;

type zRes = {
  code: number;
  message: string;
  authority: string;
  fee_type: string;
  fee: number;
};

export const Payment = async (
  props: PaymentProps,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const validatedData = PaymentSchema.safeParse(props);

    if (!validatedData.success) {
      return {
        success: false,
        errorMessage: 'ورودی نامعتبر',
      };
    }

    const { amount, description, metadata } = validatedData.data;

    const res = await axios.post(
      'https://api.zarinpal.com/pg/v4/payment/request.json',
      {
        amount,
        description,
        metadata,
        currency: 'IRT',
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        callback_url: process.env.ZARINPAL_CALLBACK_URL,
      },
    );

    const { code, authority } = res.data as zRes;

    if (!res || code !== 100 || !authority) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد',
      };
    }

    // update order db
    //redirect to bank

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: true,
      errorMessage: 'خطایی رخ داد',
    };
    // console.log(error);
  }
};
