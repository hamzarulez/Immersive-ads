'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // Import Image
import { getOrCreateConversation } from '../../../app/messages/actions'
import { Gamepad2, Globe, UserCircle, Briefcase, Mail } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Database } from '@/types/supabase' // Import Database for typing

// --- FIX: Define types for props ---
type Profile = Database['public']['Tables']['profiles']['Row']

interface Listing {
  id: string;
  game_title: string;
  platform: string;
  description: string;
  dau: number;
}

interface GameCardProps {
    listing: Listing;
}
const GameCard = ({ listing }: GameCardProps) => (
    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
        <h3 className="font-bold text-white">{listing.game_title}</h3>
        <p className="text-sm font-semibold text-pink-400 mb-3">{listing.platform}</p>
        <p className="text-sm text-neutral-300 mb-4 h-16">{listing.description}</p>
        <div className="flex items-center text-sm">
            <UserCircle size={16} className="text-neutral-500 mr-2" />
            <span className="font-semibold">{(listing.dau || 0).toLocaleString()}</span>
            <span className="text-neutral-400 ml-1">Daily Active Users</span>
        </div>
    </div>
);

// --- FIX: Define types for props ---
interface ProfileClientPageProps {
    profile: Profile | null;
    listings: Listing[];
}
export default function ProfileClientPage({ profile, listings }: ProfileClientPageProps) {
    const router = useRouter();

    const handleContact = async () => {
        if (!profile) {
            alert('Profile not found.');
            return;
        }
        const { conversationId, error } = await getOrCreateConversation(profile.id);
        
        if (conversationId) {
            router.push(`/messages?conversation=${conversationId}`); 
        } else {
            alert(`Error: ${error}`); 
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <header className="sticky top-0 z-50 w-full p-6 bg-black/50 backdrop-blur-md">
                <nav className="container mx-auto flex justify-between items-center">
                    <Link href="/marketplace" className="flex items-center gap-2">
                        <Gamepad2 className="h-7 w-7 text-pink-400" />
                        <span className="font-bold text-xl">Immersive Ads</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="text-sm text-neutral-300 hover:text-white">Dashboard</Link>
                        <Link href="/dashboard/profile" className="text-sm text-neutral-300 hover:text-white">Profile</Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <aside className="lg:col-span-1">
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 text-center sticky top-32">
                            {profile?.avatar_url ? (
                                // --- FIX: Use Image component ---
                                <Image src={profile.avatar_url} alt={profile.full_name || 'Creator'} width={128} height={128} className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-neutral-700" />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-neutral-700 flex items-center justify-center mx-auto mb-4">
                                    <UserCircle size={64} className="text-neutral-500" />
                                </div>
                            )}
                            <h1 className="text-3xl font-bold">{profile?.full_name || 'Unnamed Creator'}</h1>
                            
                            {profile?.bio && <p className="text-neutral-400 mt-4">{profile.bio}</p>}
                            
                            {profile?.website_url && (
                                <a href={profile.website_url.startsWith('http') ? profile.website_url : `https://${profile.website_url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-pink-400 mt-4 hover:underline">
                                    <Globe size={16} />
                                    <span>{profile.website_url.replace(/^https?:\/\//, '')}</span>
                                </a>
                            )}
                            
                            <Button onClick={handleContact} className="w-full mt-8 bg-pink-500 hover:bg-pink-600 rounded-full py-3 font-semibold">
                                <Mail size={16} className="mr-2" /> Contact Creator
                            </Button>
                        </div>
                    </aside>

                    <section className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Briefcase /> Available for Brand Deals</h2>
                        {listings && listings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {listings.map(listing => <GameCard key={listing.id} listing={listing} />)}
                            </div>
                        ) : (
                            <div className="bg-neutral-800/50 border border-dashed border-neutral-700 rounded-xl p-12 text-center text-neutral-500">
                                <p>This creator doesn&apos;t have any active listings right now.</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}