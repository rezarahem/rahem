'use server';

import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { getSession, verify } from './auth';
import { User } from '@/drizzle/schemas/drizzle';

export const CheckSessionInDb = async () => {
  try {
    const cookie = cookies().get('session')?.value;
    const session = await getSession();

    if (!cookie || !session) return;

    const { data, expires } = await verify(cookie);

    const [user] = await db
      .select()
      .from(User)
      .where(
        and(eq(User.id, session?.user.id as number), eq(User.session, data)),
      );

    if (!user) {
      cookies().set('session', '', { expires: new Date(0) });
    }
  } catch (error) {
    console.log(error);
  }
};
