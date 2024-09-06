'use server';

import { cookies } from 'next/headers';
import { getSession, verify } from './auth';
import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { User } from '@/drizzle/drizzle';

export const AuthorizeUser = async (): Promise<{
  success: boolean;
  errorMessage?: string;
}> => {
  try {
    const encryptedSession = cookies().get('session')?.value;
    const session = await getSession();
    if (!encryptedSession || !session) {
      return {
        success: false,
        errorMessage: 'دسترسی غیر مجاز',
      };
    }
    const { data, expires } = await verify(encryptedSession);

    const user = db.query.User.findFirst({
      where: and(eq(User.id, session.user.id), eq(User.session, data)),
    });

    if (!user) {
      return {
        success: false,
        errorMessage: 'دسترسی غیر مجاز',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
