'use client'

import { useState } from 'react'
import { createClient } from '../../../utils/supabase/client'
import { Button } from '../../../components/ui/button'
import type { User } from '@supabase/supabase-js' // Import the User type
import { Database } from '../../../types/supabase' // Import Database for profile typing

// --- FIX: Define specific types for props ---
type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfileFormProps {
    user: User | null;
    profile: Profile | null; // Use specific Profile type instead of 'any'
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [websiteUrl, setWebsiteUrl] = useState(profile?.website_url || '')

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!user) {
        setMessage({ type: 'error', text: 'User not found.' });
        setLoading(false);
        return;
    }

    const { error } = await supabase.from('profiles').update({
      full_name: fullName,
      bio: bio,
      website_url: websiteUrl,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)

    if (error) {
      setMessage({ type: 'error', text: `Error: ${error.message}` })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-400">Email</label>
        <input id="email" type="text" value={user?.email} disabled className="mt-1 block w-full bg-neutral-800 border-neutral-700 rounded-lg p-3 text-neutral-500 cursor-not-allowed" />
      </div>
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-neutral-400">Full Name</label>
        <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full bg-neutral-800/50 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-neutral-400">Bio / Professional Summary</label>
        <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 block w-full bg-neutral-800/50 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
      </div>
      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-medium text-neutral-400">Website / Portfolio URL</label>
        <input id="websiteUrl" type="url" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="mt-1 block w-full bg-neutral-800/50 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
      </div>
      <div>
        <Button type="submit" disabled={loading} className="bg-pink-500 hover:bg-pink-600 rounded-full px-8 py-3 font-semibold">
          {loading ? 'Saving...' : 'Update Profile'}
        </Button>
      </div>
      {message && <p className={`mt-4 text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{message.text}</p>}
    </form>
  )
}