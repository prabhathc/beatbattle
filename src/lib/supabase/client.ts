import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const browserClient = createBrowserClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
  return browserClient;
}