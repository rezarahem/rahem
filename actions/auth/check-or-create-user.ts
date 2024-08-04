'use server';

import { db } from '@/drizzle/db';
import User from '@/drizzle/schemas/user';
import { getLocalDateForDb, nowDate, nowTimestamp } from '@/lib/date';
import { eq } from 'drizzle-orm';
import { SentOtp } from './send-otp';

const generateOtp = (): number => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const CheckOrCreateUser = async (
  phoneNumber: string,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const otp = generateOtp();

    const [user] = await db
      .update(User)
      .set({
        otp,
        lastOtpAttempt: nowTimestamp(),
        updatedAt: getLocalDateForDb(),
      })
      .where(eq(User.phoneNumber, phoneNumber))
      .returning();

    if (user) {
      const res = await SentOtp(phoneNumber, otp);
      return res;
    }

    const createdUser = await db
      .insert(User)
      .values({
        phoneNumber,
        otp,
        lastOtpAttempt: nowTimestamp(),
        updatedAt: getLocalDateForDb(),
        createdAt: getLocalDateForDb(),
      })
      .returning();

    if (createdUser) {
      const res = await SentOtp(phoneNumber, otp);
      return res;
    }

    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  } catch (error) {
    // console.log('[UpsertUserAction]', error);
    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  }
};
