import { createClient } from '../../../utils/supabase/server'
import { NextResponse } from 'next/server'

// This route handles the redirect after a user confirms their email.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient() // Add await here
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    // If there's no error, the cookie has been set.
    // We can now redirect the user to their new home base: the marketplace.
    if (!error) {
      return NextResponse.redirect(`${origin}/marketplace`);
    }
  }

  // If there's an error or no code, redirect to an error page or back to the homepage.
  // Redirecting to the login page is a safe fallback.
  return NextResponse.redirect(`${origin}/login`);
}