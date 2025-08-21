import "dotenv/config";
import { defineConfig } from 'drizzle-kit';

//push changes to neon database: npx drizzle-kit push

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
})