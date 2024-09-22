import { Order } from '@/drizzle/drizzle';
import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const License = pgTable('license', {
  id: serial('id').primaryKey(),
  key: varchar('key', {length: 1024}).notNull(),
});

export const LicenseRelations = relations(License, ({ one }) => ({
  order: one(Order),
}));
