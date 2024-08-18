'use server';

import { db } from '@/drizzle/db';
import User from '@/drizzle/schemas/user';
import { utcDate, utcUnix } from '@/lib/date';
import { eq } from 'drizzle-orm';
import { SentOtp } from '../otp/send-otp';

const generateOtp = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const CheckUser = async (
  phoneNumber: string,
): Promise<{
  success: boolean;
  code?: number;
  errorMessage?: string;
}> => {
  try {
    const otp = generateOtp();

    const [user] = await db
      .update(User)
      .set({
        otp,
        lastOtpAttempt: utcUnix(),
        updatedAt: utcDate(),
      })
      .where(eq(User.phoneNumber, phoneNumber))
      .returning();

    if (user) {
      const res = await SentOtp(phoneNumber, otp);
      if (res.success) {
        return {
          success: true,
          code: 845,
        };
      } else {
        return res;
      }
    }

    return {
      success: true,
      code: 800,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  }
};
