import {
  integer,
  pgTable,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Course, CourseSubchapter } from '../drizzle';

export const CourseChapter = pgTable('course_chpater', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => Course.id, {
    onDelete: 'cascade',
  }),
  chapterTitle: varchar('chapterTitle', { length: 50 }),
  order: smallint('order'),
});

export const CourseChapterRelations = relations(
  CourseChapter,
  ({ many, one }) => ({
    course: one(Course, {
      fields: [CourseChapter.courseId],
      references: [Course.id],
    }),
    courseSubchapter: many(CourseSubchapter),
  }),
);
