import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export const createClient = async () => {
    const cookieStore = await cookies() // Await to resolve Promise<ReadonlyRequestCookies>

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        // `set` only works in Middleware or Route Handlers
                        cookieStore.set({ name, value, ...options })
                    } catch {
                        // ignore in Server Components
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options })
                    } catch {
                        // ignore in Server Components
                    }
                },
            },
        }
    )
}