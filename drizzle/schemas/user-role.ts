import { pgEnum } from 'drizzle-orm/pg-core';

const userRole = pgEnum('userRole', ['ADMIN', 'USER']);

export default userRole;
