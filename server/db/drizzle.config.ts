import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schemas/index.ts',
  out: './server/db/migrations',
  dbCredentials: {
    url: process.env.NUXT_DATABASE_URL!,
  },
})
