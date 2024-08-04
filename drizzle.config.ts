import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schemas/drizzle.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
