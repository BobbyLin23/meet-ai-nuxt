import { RPCHandler } from '@orpc/server/node'
import { appRouter } from '~~/server/router'

const handler = new RPCHandler(appRouter)

export default defineEventHandler(async (event) => {
  const { matched } = await handler.handle(
    event.node.req,
    event.node.res,
    {
      prefix: '/rpc',
      context: {}, // Provide initial context if needed
    },
  )

  if (matched) {
    return
  }

  setResponseStatus(event, 404, 'Not Found')
  return 'Not found'
})
