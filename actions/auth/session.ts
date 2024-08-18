import { db } from '@/drizzle/db';
import User from '@/drizzle/schemas/user';
import { eq } from 'drizzle-orm';

export const StoreSession = async (session: string, phoneNumber: string) => {
  try {
    const [userWithSession] = await db
      .update(User)
      .set({
        session,
      })
      .where(eq(User.phoneNumber, phoneNumber))
      .returning();

    if (userWithSession.session) return { success: true };
  } catch (error) {
    // console.log(error);
  }
};
