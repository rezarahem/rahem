import { relations } from 'drizzle-orm';
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { Order } from '../../drizzle';

export const User = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }),
    phoneNumber: varchar('phone_number', { length: 16 }).unique().notNull(),
    image: varchar('image', { length: 1024 }),
    session: varchar('session', { length: 2024 }).unique(),
    otp: varchar('otp', { length: 5 }),
    lastOtpAttempt: varchar('lastOtpAttempt', { length: 50 }),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
  },
  (table) => {
    return {
      sessionIdx: index('session_idx').on(table.session),
    };
  },
);

export const UserRelations = relations(User, ({ many, one }) => ({
  userOrder: many(Order),
}));
