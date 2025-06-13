import type { NitroRuntimeConfig } from 'nitropack/types'
import process from 'node:process'
import { config } from 'dotenv'

let runtimeConfigInstance: NitroRuntimeConfig

export function generateRuntimeConfig() {
  return {
    preset: process.env.NUXT_NITRO_PRESET,
    betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
    // Github
    githubClientId: process.env.NUXT_GH_CLIENT_ID,
    githubClientSecret: process.env.NUXT_GH_CLIENT_SECRET,
    // Google
    googleClientId: process.env.NUXT_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.NUXT_GOOGLE_CLIENT_SECRET,
    // DB
    databaseUrl: process.env.NUXT_DATABASE_URL,
    public: {
      baseURL: process.env.NUXT_APP_URL,
      appName: process.env.NUXT_APP_NAME,
      appEnv: process.env.NODE_ENV,
      appRepo: process.env.NUXT_APP_REPO,
      appNotifyEmail: process.env.NUXT_APP_NOTIFY_EMAIL,
      appContactEmail: process.env.NUXT_APP_CONTACT_EMAIL,
      auth: {
        redirectUserTo: '/',
        redirectGuestTo: '/sign-in',
      },
    },
  }
}

if (typeof useRuntimeConfig !== 'undefined') {
  runtimeConfigInstance = useRuntimeConfig()
}
else {
  // for cli: npm run auth:schema
  config()
  runtimeConfigInstance = generateRuntimeConfig() as unknown as NitroRuntimeConfig
}

export const runtimeConfig = runtimeConfigInstance
