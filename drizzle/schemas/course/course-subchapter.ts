import {
  integer,
  pgTable,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core';
import { CourseChapter } from '../../drizzle';
import { relations } from 'drizzle-orm';

export const CourseSubchapter = pgTable('course_subchpater', {
  id: serial('id').primaryKey(),
  chapterId: integer('chapter_id').references(() => CourseChapter.id, {
    onDelete: 'cascade',
  }),
  subchapterTitle: varchar('subchapterTitle', { length: 50 }),
  order: smallint('order'),
});

export const CourseSubchapterRelations = relations(
  CourseSubchapter,
  ({ one }) => ({
    couserChapter: one(CourseChapter, {
      fields: [CourseSubchapter.chapterId],
      references: [CourseChapter.id],
    }),
  }),
);
