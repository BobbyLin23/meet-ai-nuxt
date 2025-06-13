import { protectedProcedure, publicProcedure } from '~~/server/utils/orpc'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    }
  }),
}
export type AppRouter = typeof appRouter
