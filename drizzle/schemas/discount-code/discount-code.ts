import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const DiscountCode = pgTable('discount-code', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 50 }).notNull().unique(),
  isPercentage: boolean('in_percentage').notNull(),
  discount: integer('discount').notNull(),
});
