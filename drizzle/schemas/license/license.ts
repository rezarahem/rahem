import { Order } from '@/drizzle/drizzle';
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const License = pgTable('license', {
  id: serial('id').primaryKey(),
  key: text('key').notNull(),
});

export const LicenseRelations = relations(License, ({ one }) => ({
  order: one(Order),
}));
