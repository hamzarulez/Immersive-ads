'use server'

import { createClient } from '../utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient() // Add await here
  await supabase.auth.signOut()
  return redirect('/') // Redirect to the homepage
}