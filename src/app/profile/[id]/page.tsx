import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProfileClientPage from './ProfileClientPage' // Import the new client component

// This is now purely a Server Component. It fetches data and passes it down.
export default async function ProfilePage({ params }: { params: { id: string } }) {
    const supabase = createClient()

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', params.id)
        .single(); 

    if (!profile) {
        notFound();
    }

    const { data: listings } = await supabase
        .from('listings')
        .select('*')
        .eq('creator_id', params.id)
        .eq('status', 'Active');
    
    // Pass the server-fetched data as props to the Client Component
    return <ProfileClientPage profile={profile} listings={listings || []} />
}