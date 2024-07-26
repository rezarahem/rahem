import { pgTable, serial, pgEnum, text, timestamp } from 'drizzle-orm/pg-core';
import userRole from './user-role';

const User = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  phoneNumber: text('phone_number').unique().notNull(),
  role: userRole('role').notNull().default('USER').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at', { mode: 'string', withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .notNull()
    .defaultNow(),
});

export default User;
