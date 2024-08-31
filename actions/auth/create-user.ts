'use server';

import { db } from '@/drizzle/db';
import { utcDate, utcUnix } from '@/lib/date';
import { SentOtp } from '../otp/send-otp';
import { User } from '@/drizzle/schemas/drizzle';

const generateOtp = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const CreateUser = async (
  phoneNumber: string,
  userName: string,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const otp = generateOtp();

    const createdUser = await db
      .insert(User)
      .values({
        phoneNumber,
        otp,
        name: userName,
        lastOtpAttempt: utcUnix(),
        updatedAt: utcDate(),
        createdAt: utcDate(),
      })
      .returning();

    if (createdUser) {
      return await SentOtp(phoneNumber, otp);
    }

    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  } catch (error) {
    // console.log(error);

    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  }
};
