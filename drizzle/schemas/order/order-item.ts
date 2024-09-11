import { relations } from 'drizzle-orm';
import { boolean, integer, serial, text, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { Course, Order, User } from '../../drizzle';

export const OrderItem = pgTable('order_item', {
  id: serial('id').primaryKey(),
  itemPrice: integer('item_price').notNull(),
  itemSpecialPrice: integer('item_special_price').notNull(),
  courseId: integer('course_id')
    .references(() => Course.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  spotPlayerId: varchar('spot_player_id', { length: 1024 }).notNull(),
  orderId: integer('order_id')
    .references(() => Order.id, { onDelete: 'cascade' })
    .notNull(),
});

export const OrderItemRelations = relations(OrderItem, ({ one }) => ({
  order: one(Order, {
    fields: [OrderItem.orderId],
    references: [Order.id],
  }),
  course: one(Course, {
    fields: [OrderItem.courseId],
    references: [Course.id],
  }),
}));
