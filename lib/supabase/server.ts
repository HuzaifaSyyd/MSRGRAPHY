import { cookies, headers } from "next/headers"
import { createServerClient } from "@supabase/ssr"

// Return type helper
type SupabaseClientType = ReturnType<typeof createServerClient>

let _serverSupabase: SupabaseClientType | null = null

export async function getServerSupabase() {
  if (_serverSupabase) return _serverSupabase

  // ✅ await cookies() and headers()
  const cookieStore = await cookies()
  const headerStore = await headers()

  _serverSupabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch {}
        },
      },
      headers: {
        get(name: string) {
          return headerStore.get(name) ?? undefined
        },
      },
    },
  )

  return _serverSupabase
}
