import { db } from '@/drizzle/db';
import { UserCourse } from '@/drizzle/drizzle';
import { and, eq } from 'drizzle-orm';

export const GetUserCourse = async (
  userId: number | undefined,
  courseId: number | undefined,
): Promise<{
  success: boolean;
  code: 100 | 101;
  errorMessage?: string;
}> => {
  try {
    if (!userId || !courseId) {
      return {
        success: true,
        code: 100,
      };
    }

    const userCourse = await db.query.UserCourse.findFirst({
      where: and(
        eq(UserCourse.courseId, courseId),
        eq(UserCourse.userId, userId),
      ),
    });

    if (!userCourse) {
      return {
        success: true,
        code: 100, // doesn't have course
      };
    }

    return {
      success: true,
      code: 101, // have course
    };
  } catch (error) {
    return {
      success: false,
      code: 100,
      errorMessage: 'خطایی رخ داد',
    };
  }
};
