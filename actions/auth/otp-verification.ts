'use server';

import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { hasTwoMinutesPassed, utcUnix } from '@/lib/date';
import { Login } from './login';
import { User } from '@/drizzle/drizzle';
// import { login } from './auth';

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
        userName: User.name,
        phoneNumber: User.phoneNumber,
        lastOtpAttempt: User.lastOtpAttempt,
      })
      .from(User)
      .where(eq(User.phoneNumber, phoneNubmer));

    if (!userLoginData || !userLoginData.otp) {
      return {
        success: false,
        errorMessage: 'خطایی رخ داد مجددا تلاش کنید',
      };
    }

    const isOtpValid = hasTwoMinutesPassed(
      userLoginData.lastOtpAttempt as string,
      utcUnix(),
    );
    const isOtpMatching = +otp === +userLoginData.otp;

    if (!isOtpValid || !isOtpMatching) {
      return {
        success: false,
        errorMessage: 'کد نامعتبر، مجددا تلاش کنید',
      };
    }

    const res = await Login({
      id: userLoginData.id,
      userName: userLoginData.userName as string,
      phoneNumber: userLoginData.phoneNumber,
    });

    if (res.success) {
      return res;
    }

    return {
      success: false,
      errorMessage: res?.errorMessage || 'خطایی رخ داد، مجددا تلاش کنید',
    };
  } catch (error) {
    // console.log(error);
    return {
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
      success: false,
    };
  }
};
