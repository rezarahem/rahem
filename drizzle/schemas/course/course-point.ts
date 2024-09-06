import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  smallint,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { Course } from '../../drizzle';

export const CoursePoint = pgTable('course_point', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => Course.id, {
    onDelete: 'cascade',
  }),
  point: varchar('point', { length: 50 }),
  pointDesc: text('point_desc'),
  order: smallint('order'),
});

export const CoursePointRelations = relations(CoursePoint, ({ many, one }) => ({
  course: one(Course, {
    fields: [CoursePoint.courseId],
    references: [Course.id],
  }),
}));
