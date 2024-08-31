'use server';

import { db } from '@/drizzle/db';
import { Course } from '@/drizzle/schemas/drizzle';
import { eq } from 'drizzle-orm';

export const GetCourseByAddressName = async (courseAddressName: string) => {
  try {
    const course = await db.query.Course.findFirst({
      where: eq(Course.courseAddressName, courseAddressName),
      with: {
        coursePoints: true,
        couserChapter: {
          with: {
            courseSubchapter: true,
          },
        },
      },
    });

    return course;
  } catch (error) {
    // console.log(error);
  }
};
