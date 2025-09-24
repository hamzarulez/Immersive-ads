import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createCampaign } from './actions'
import { Gamepad2, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function PostCampaignPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const supabase = await createClient() // Add await here
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="bg-black text-white min-h-screen">
       <header className="sticky top-0 z-50 w-full p-6">
          <nav className="container mx-auto flex justify-between items-center">
              <Link href="/marketplace" className="flex items-center gap-2">
                  <Gamepad2 className="h-7 w-7 text-pink-400" />
                  <span className="font-bold text-xl">Immersive Ads</span>
              </Link>
          </nav>
      </header>

      <main className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8">
            <ArrowLeft size={16} />
            Back to Marketplace
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Post a New Campaign Brief</h1>
            <p className="text-neutral-400 mt-2">
              Describe your campaign goals to attract the best creators for the job.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
            <form action={createCampaign} className="space-y-6">
              <div>
                <label htmlFor="campaign_title" className="block text-sm font-medium text-neutral-400 mb-2">Campaign Title</label>
                <input id="campaign_title" name="campaign_title" type="text" required placeholder='e.g., "Air Max 2026 Launch"' className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>
              
              <div>
                <label htmlFor="brand_name" className="block text-sm font-medium text-neutral-400 mb-2">Brand / Company Name</label>
                <input id="brand_name" name="brand_name" type="text" required placeholder='e.g., "Nike"' className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>

              <div>
                 <label className="block text-sm font-medium text-neutral-400 mb-2">Target Platforms (Select all that apply)</label>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {['Roblox', 'Fortnite', 'TikTok', 'Other'].map(platform => (
                        <label key={platform} htmlFor={platform} className="flex items-center gap-2 bg-neutral-800/50 p-3 rounded-lg border border-neutral-700 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-500/10 cursor-pointer">
                            <input type="checkbox" name="platforms" id={platform} value={platform} className="h-4 w-4 accent-indigo-500 shrink-0" />
                            <span>{platform}</span>
                        </label>
                    ))}
                 </div>
              </div>
              
              <div>
                <label htmlFor="budget_range" className="block text-sm font-medium text-neutral-400 mb-2">Budget Range</label>
                <input id="budget_range" name="budget_range" type="text" placeholder="e.g., $10,000 - $50,000" className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-400 mb-2">Campaign Description</label>
                <textarea id="description" name="description" rows={4} required placeholder="Describe your campaign goals, target audience, and what you're looking for in a creator partnership..." className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>
              
              <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 text-base font-semibold">
                Post Campaign
              </Button>

              {searchParams.message && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2 mt-4">
                  <AlertTriangle size={16} />
                  <p>{searchParams.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}