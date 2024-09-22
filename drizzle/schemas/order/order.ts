import { relations } from 'drizzle-orm';
import { boolean, index, integer, serial, text, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { License, OrderItem, User } from '../../drizzle';

export const Order = pgTable(
  'order',
  {
    id: serial('id').primaryKey(),
    price: integer('price').notNull(),
    specialPrice: integer('special_price').notNull(),
    verified: boolean('verified').default(false),
    licenseId: integer('license_id')
      .references(() => License.id, {
        onDelete: 'cascade',
      })
      .unique(),
    userId: integer('user_id')
      .references(() => User.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    authority: varchar('authority', {length: 1024}).unique(),
    refNumber: varchar('ref_number', {length: 50}),
    description: varchar('description', {length: 50}),
  },
  (t) => ({
    authorityUserIndex: index('authority_user_idx').on(t.authority, t.userId),
  }),
);

export const OrderRelations = relations(Order, ({ one, many }) => ({
  user: one(User, {
    fields: [Order.userId],
    references: [User.id],
  }),
  orderItem: many(OrderItem),
  licence: one(License, {
    fields: [Order.licenseId],
    references: [License.id],
  }),
}));
