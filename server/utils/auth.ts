import type { H3Event } from 'h3'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { v7 as uuidv7 } from 'uuid'
import * as schema from '../db/schemas'
import { getDB } from './db'
import { runtimeConfig } from './rumtime-config'

console.log(`Base URL is ${runtimeConfig.public.baseURL}`)

function createBetterAuth() {
  return betterAuth({
    baseURL: runtimeConfig.public.baseURL as string,
    secret: runtimeConfig.betterAuthSecret,
    database: drizzleAdapter(
      getDB(),
      {
        provider: 'pg',
        schema,
      },
    ),
    advanced: {
      database: {
        generateId: () => {
          return uuidv7()
        },
      },
    },
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      github: {
        clientId: runtimeConfig.githubClientId!,
        clientSecret: runtimeConfig.githubClientSecret!,
      },
      google: {
        clientId: runtimeConfig.googleClientId!,
        clientSecret: runtimeConfig.googleClientSecret!,
      },
    },
    account: {
      accountLinking: {
        enabled: true,
      },
    },
  })
}

let _auth: ReturnType<typeof betterAuth>

if (typeof useRuntimeConfig === 'undefined') {
  _auth = createBetterAuth()
}

// Used by npm run auth:schema only.
export const auth = _auth!

export function useServerAuth() {
  if (runtimeConfig.preset === 'node-server') {
    if (!_auth) {
      _auth = createBetterAuth()
    }
    return _auth
  }
  else {
    return createBetterAuth()
  }
}

export async function getAuthSession(event: H3Event) {
  const headers = event.headers
  const serverAuth = useServerAuth()
  return await serverAuth.api.getSession({
    headers,
  })
}

export async function requireAuth(event: H3Event) {
  const session = await getAuthSession(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
  // Save the session to the event context for later use
  event.context.auth = session!
  return session!
}
