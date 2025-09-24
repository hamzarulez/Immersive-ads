import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { signOut } from '../../../app/actions'
import { LayoutDashboard, Briefcase, BarChart2, UserCircle, LogOut, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import ProfileForm from './ProfileForm' // Import the client component

export default async function ProfilePage() {
  const supabase = await createClient() // Add await here
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { return redirect('/login') }

  // Fetch the user's profile from the 'profiles' table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() // We expect only one row, so use .single()

  // This specific error means no row was found, which is fine if the trigger hasn't run yet for a user.
  // We can proceed with an empty profile object. For all other errors, we log them.
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error)
  }

  return (
    <div className="bg-black text-white min-h-screen flex">
      <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
            <Gamepad2 className="h-7 w-7 text-pink-400" />
            <h1 className="text-xl font-bold">Immersive Ads</h1>
        </div>
        <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LayoutDashboard size={18} /> Overview</Link>
            <Link href="/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><Briefcase size={18} /> Projects</Link>
            <Link href="/dashboard/analytics" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</Link>
            <Link href="/dashboard/profile" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><UserCircle size={18} /> Profile</Link>
        </nav>
        <div className="mt-auto">
            <form action={signOut}><button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LogOut size={18} /><span>Sign Out</span></button></form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
          <header className="mb-8">
              <h2 className="text-3xl font-bold text-white">Your Profile</h2>
              <p className="text-neutral-400">Manage your public presence and account settings.</p>
          </header>
          
          <div className="max-w-2xl">
            {/* The Server Component securely fetches data and passes it to the Client Component as initial props */}
            <ProfileForm user={user} profile={profile} />
          </div>
      </main>
    </div>
  )
}