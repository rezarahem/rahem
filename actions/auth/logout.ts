'use server';

import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession, verify } from './auth';
import { utcDate } from '@/lib/date';
import { User } from '@/drizzle/drizzle';

export const Logout = async () => {
  try {
    const cookie = cookies().get('session')?.value;
    const session = await getSession();

    if (!cookie || !session) return;

    const { data, expires } = await verify(cookie);

    const user = await db
      .update(User)
      .set({
        session: null,
        updatedAt: utcDate(),
      })
      .where(
        and(eq(User.id, session?.user.id as number), eq(User.session, data)),
      )
      .returning();

    cookies().set('session', '', { expires: new Date(0) });

    redirect('/');
  } catch (error) {}
};
