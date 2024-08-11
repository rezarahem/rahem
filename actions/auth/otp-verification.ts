'use server';

import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import User from '@/drizzle/schemas/user';
import { hasTwoMinutesPassed, nowTimestamp } from '@/lib/date';
import { login } from './auth';

export const OtpVerification = async (
  phoneNubmer: string,
  otp: string,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const [userLoginData] = await db
      .select({
        id: User.id,
        otp: User.otp,
        userRole: User.role,
        phoneNumber: User.phoneNumber,
        lastOtpAttempt: User.lastOtpAttempt,
      })
      .from(User)
      .where(eq(User.phoneNumber, phoneNubmer));

    if (!userLoginData) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد مجددا تلاش کنید',
      };
    }

    const isOtpValid = hasTwoMinutesPassed(
      userLoginData.lastOtpAttempt as number,
      nowTimestamp(),
    );

    if (!isOtpValid) {
      return {
        success: false,
        errorMessage: 'کد نامعتبر',
      };
    }

    const varification = +otp === userLoginData.otp;

    if (!varification) {
      return {
        success: false,
        errorMessage: 'کد نامعتبر',
      };
    }

    // login

    const result = await login({
      id: userLoginData.id,
      userRole: userLoginData.userRole,
      phoneNumber: userLoginData.phoneNumber,
    });

    if (!result) {
      return {
        errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
        success: false,
      };
    } else if (!result.success && result.errorMessage) {
      return {
        errorMessage: result.errorMessage,
        success: false,
      };
    } else if (result.success) {
      return {
        success: true,
      };
    }

    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  } catch (error) {
    // console.log(error);
    return {
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
      success: false,
    };
  }
};
