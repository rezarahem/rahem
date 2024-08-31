import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { CourseToCart, User } from '../drizzle';
import { relations } from 'drizzle-orm';

export const Cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => User.id, {
      onDelete: 'cascade',
    })
    .unique(),
});

export const CartRelations = relations(Cart, ({ many }) => ({
  courseToCart: many(CourseToCart),
}));
