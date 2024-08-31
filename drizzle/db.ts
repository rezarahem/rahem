import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@/drizzle/schemas/drizzle';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL as string,
});

export const db = drizzle(pool, { schema });

// import { drizzle } from 'drizzle-orm/postgres-js';
// import * as schema from '@/drizzle/schemas/drizzle';
// import postgres from 'postgres';

// const client = postgres(process.env.DATABASE_URL as string);
// export const db = drizzle(client, { schema, logger: true });
