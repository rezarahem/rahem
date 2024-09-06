import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { Cart, Course } from '../../drizzle';
import { relations } from 'drizzle-orm';

export const CourseToCart = pgTable(
  'course_to_cart',
  {
    courseId: integer('course_id')
      .notNull()
      .references(() => Course.id, { onDelete: 'cascade' }),
    cartId: integer('cart_id')
      .notNull()
      .references(() => Cart.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.courseId, t.cartId] }),
  }),
);

export const CourseToCartRelations = relations(CourseToCart, ({ one }) => ({
  course: one(Course, {
    fields: [CourseToCart.courseId],
    references: [Course.id],
  }),
  cart: one(Cart, {
    fields: [CourseToCart.cartId],
    references: [Cart.id],
  }),
}));
