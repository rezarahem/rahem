'use server';

import { cookies } from 'next/headers';
import { db } from '@/drizzle/db';
import User from '@/drizzle/schemas/user';
import { eq } from 'drizzle-orm';
import { createSession } from './auth';
import { utcDate } from '@/lib/date';

type LoginProps = {
  id: number;
  userName: string;
  phoneNumber: string;
};

export const Login = async (
  props: LoginProps,
): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const sessionData = await createSession(JSON.stringify(props), expires);

    const [user] = await db
      .update(User)
      .set({
        session: sessionData.encryptedData,
        sessionExpires: utcDate(),
      })
      .where(eq(User.phoneNumber, props.phoneNumber))
      .returning();

    if (user && user.session) {
      cookies().set('session', sessionData.session, {
        expires,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return {
        success: true,
      };
    }

    return {
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
      success: false,
    };
  } catch (error) {
    return {
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
      success: false,
    };
  }
};
