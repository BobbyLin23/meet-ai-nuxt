import type { Session, User } from 'better-auth'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: {
      headers,
    },
    plugins: [],
  })

  const session = useState<Session | null>('auth:session', () => null)
  const user = useState<User | null>('auth:user', () => null)

  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true
    const { data } = await client.useSession(useFetch)
    session.value = data.value?.session || null
    user.value = data.value?.user || null
    sessionFetching.value = false
    return data
  }

  if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal)
        return
      await fetchSession()
    })
  }

  return {
    client,
    session,
    user,
    fetchSession,
    signIn: client.signIn,
    signUp: client.signUp,
  }
}
