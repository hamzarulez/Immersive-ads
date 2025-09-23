import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '@/app/actions'
import { Gamepad2, Briefcase, BarChart2, UserCircle, LogOut } from 'lucide-react'

export default async function BrandDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.role !== 'brand') {
    // Protect the route and ensure only brands can see it
    return redirect('/login')
  }

  const companyName = user.user_metadata?.full_name || 'Brand';

  return (
    <div className="bg-black text-white min-h-screen flex">
      <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
            <Gamepad2 className="h-7 w-7 text-pink-400" />
            <h1 className="text-xl font-bold">Immersive Ads</h1>
        </div>
        <nav className="flex flex-col gap-2">
            <a href="/brand-dashboard" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><Briefcase size={18} /> Campaigns</a>
            <a href="#" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</a>
            <a href="#" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Company Profile</a>
        </nav>
        <div className="mt-auto">
            <form action={signOut}>
                <button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg">
                    <LogOut size={18} /><span>Sign Out</span>
                </button>
            </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
          <header className="mb-8">
              <h2 className="text-3xl font-bold text-white">Campaign Dashboard</h2>
              <p className="text-neutral-400">Welcome, {companyName}!</p>
          </header>
          
          <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold">Your Campaign Overview</h3>
            <p className="text-neutral-400 mt-2">This is where your list of active and past campaigns will be displayed.</p>
            {/* We will build the campaign list here next */}
          </div>
      </main>
    </div>
  )
}