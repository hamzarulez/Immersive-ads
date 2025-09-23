'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createListing(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Extract form data
  const gameTitle = formData.get('game_title') as string
  const platform = formData.get('platform') as string
  const dau = parseInt(formData.get('dau') as string, 10)
  const description = formData.get('description') as string

  // Validate the data (basic validation)
  if (!gameTitle || !platform || isNaN(dau)) {
    return redirect('/list-your-game?message=Please fill out all required fields.')
  }

  // Insert the new listing into the database
  const { error } = await supabase.from('listings').insert({
    creator_id: user.id,
    game_title: gameTitle,
    platform: platform,
    dau: dau,
    description: description,
    status: 'Active' // Default status
  })

  if (error) {
    console.error('Error creating listing:', error)
    return redirect(`/list-your-game?message=Error: Could not create listing. ${error.message}`)
  }

  // If successful, redirect the user back to the marketplace
  return redirect('/marketplace')
}