import { Course, User } from '@/drizzle/drizzle';
import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';

export const UserCourse = pgTable(
  'usre-course',
  {
    courseId: integer('course_id')
      .notNull()
      .references(() => Course.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => User.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.courseId, t.userId] }),
  }),
);

export const UserCourseRelations = relations(UserCourse, ({ one }) => ({
  course: one(Course, {
    fields: [UserCourse.courseId],
    references: [Course.id],
  }),
  cart: one(User, {
    fields: [UserCourse.userId],
    references: [User.id],
  }),
}));
