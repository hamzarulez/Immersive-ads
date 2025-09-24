import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { createListing } from './actions'
import { Gamepad2, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ListYourGamePage({
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
            <h1 className="text-4xl font-bold tracking-tight">List Your Game for Brand Deals</h1>
            <p className="text-neutral-400 mt-2">
              Fill out the details below to make your game or experience visible to brands in the marketplace.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
            <form action={createListing} className="space-y-6">
              <div>
                <label htmlFor="game_title" className="block text-sm font-medium text-neutral-400 mb-2">Game / Map Title</label>
                <input id="game_title" name="game_title" type="text" required className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>

              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-neutral-400 mb-2">Platform</label>
                <select id="platform" name="platform" required className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3 appearance-none">
                  <option>Roblox</option>
                  <option>Fortnite</option>
                  <option>TikTok</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="dau" className="block text-sm font-medium text-neutral-400 mb-2">Average Daily Active Users (DAU)</label>
                <input id="dau" name="dau" type="number" required placeholder="e.g., 50000" className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-400 mb-2">Short Pitch to Brands</label>
                <textarea id="description" name="description" rows={4} required placeholder="Describe your game and the type of brand partnerships you're looking for..." className="w-full bg-neutral-800/50 border-neutral-700 rounded-lg p-3" />
              </div>
              
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 py-3 text-base font-semibold">
                Create Listing
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