import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProfileClientPage from './ProfileClientPage' // Import the new client component

// This is now purely a Server Component. It fetches data and passes it down.
export default async function ProfilePage({ params }: { params: { id: string } }) {
    const supabase = await createClient() // Add await here

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
    
    // Map listings to match expected Listing type (id as string, non-null fields)
    const typedListings = (listings || []).map(listing => ({
        id: listing.id.toString(),
        game_title: listing.game_title || '',
        platform: listing.platform || '',
        description: listing.description || '',
        dau: listing.dau || 0,
    }));
    
    // Pass the server-fetched data as props to the Client Component
    return <ProfileClientPage profile={profile} listings={typedListings} />
}