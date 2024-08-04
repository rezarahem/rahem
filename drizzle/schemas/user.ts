import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  bigint,
} from 'drizzle-orm/pg-core';
import userRole from './user-role';

const User = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  phoneNumber: text('phone_number').unique().notNull(),
  role: userRole('role').notNull().default('USER').notNull(),
  image: text('image'),
  otp: integer('otp'),
  lastOtpAttempt: bigint('lastOtpAttempt', {
    mode: 'number',
  }),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export default User;
