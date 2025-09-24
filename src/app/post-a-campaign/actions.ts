'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createCampaign(formData: FormData) {
  const supabase = await createClient() // Add await here
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Extract form data
  const campaignTitle = formData.get('campaign_title') as string
  const brandName = formData.get('brand_name') as string
  // For multi-select, we get all entries
  const platforms = formData.getAll('platforms') as string[]
  const budgetRange = formData.get('budget_range') as string
  const description = formData.get('description') as string

  // Basic validation
  if (!campaignTitle || !brandName || platforms.length === 0) {
    return redirect('/post-a-campaign?message=Please fill out all required fields.')
  }

  // Insert the new campaign into the database
  const { error } = await supabase.from('campaigns').insert({
    brand_id: user.id,
    campaign_title: campaignTitle,
    brand_name: brandName,
    platforms: platforms,
    budget_range: budgetRange,
    description: description,
    status: 'Active' // Default status
  })

  if (error) {
    console.error('Error creating campaign:', error)
    return redirect(`/post-a-campaign?message=Error: Could not create campaign. ${error.message}`)
  }

  // If successful, redirect the user back to the marketplace to see their new listing
  return redirect('/marketplace')
}