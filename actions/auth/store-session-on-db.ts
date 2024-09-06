'use server';

import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { utcDate } from '@/lib/date';
import { User } from '@/drizzle/drizzle';

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
