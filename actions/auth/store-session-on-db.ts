'use server';

import { db } from '@/drizzle/db';
import { and, eq } from 'drizzle-orm';
import { getSession, verify } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { utcDate } from '@/lib/date';
import { User } from '@/drizzle/schemas/drizzle';

export const StoreSession = async (session: string, phoneNumber: string) => {
  try {
    const [userWithSession] = await db
      .update(User)
      .set({
        session,
        updatedAt: utcDate(),
      })
      .where(eq(User.phoneNumber, phoneNumber))
      .returning();

    if (userWithSession.session) return { success: true };
  } catch (error) {
    // console.log(error);
  }
};

// export const CheckSessionOnDb = async () => {
//   try {
//     const cookie = cookies().get('session')?.value;
//     const session = await getSession();

//     if (!cookie || !session) return;

//     const { data, expires } = await verify(cookie);

//     const [user] = await db
//       .select()
//       .from(User)
//       .where(
//         and(eq(User.id, session?.user.id as number), eq(User.session, data)),
//       );

//     if (!user) {
//       cookies().set('session', '', { expires: new Date(0) });
//       redirect('/');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
