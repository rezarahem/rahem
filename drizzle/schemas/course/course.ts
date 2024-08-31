import { relations } from 'drizzle-orm';
import { boolean, integer, serial, text, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { CoursePoint, CourseToCart, CourseChapter } from '../drizzle';

export const Course = pgTable('course', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 50 }).notNull(),
  courseAddressName: varchar('course_address_name', { length: 50 })
    .notNull()
    .unique(),
  catchDesc: text('catch_desc'),
  thumbnailImage: varchar('thumbnail_image', { length: 1024 }).notNull(),
  onSale: boolean('on_sale').default(false),
  price: integer('price').notNull(),
  specialPrice: integer('special_price'),
  spotPlayerId: varchar('spot_player_id', { length: 1024 }),
});

export const CourseRelations = relations(Course, ({ many, one }) => ({
  couserChapter: many(CourseChapter),
  coursePoints: many(CoursePoint),
  courseToCart: many(CourseToCart),
}));
