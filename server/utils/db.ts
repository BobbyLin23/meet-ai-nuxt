import type { NeonHttpDatabase } from 'drizzle-orm/neon-http'
import type { EventHandlerRequest, H3Event } from 'h3'
import process from 'node:process'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'
import { runtimeConfig } from '~~/server/utils/runtime-config'
import * as schema from '../db/schemas'

config({ path: '.env' })

function createDB(dbSchema?: typeof schema) {
  const sql = neon(process.env.NUXT_DATABASE_URL!)
  return drizzle({ client: sql, schema: dbSchema })
}

let db: ReturnType<typeof createDB>

export function getDB() {
  if (runtimeConfig.preset === 'node-server') {
    if (!db) {
      db = createDB()
    }
    return db
  }
  else {
    return createDB()
  }
}

// use db with schema
export async function useDB(event?: H3Event<EventHandlerRequest>): Promise<NeonHttpDatabase<typeof schema>> {
  // If the event has a context with a db property, return it
  if (event && event.context.db) {
    return event.context.db
  }
  // Otherwise, create a new connection to the database
  const dbInstance = createDB(schema)
  if (event) {
    event.context.db = dbInstance
  }
  return dbInstance
}

export type TableNames = keyof typeof schema

export function isValidTable(table: string): table is TableNames {
  return table in schema
}
