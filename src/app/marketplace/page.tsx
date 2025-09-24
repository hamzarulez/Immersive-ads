import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Gamepad2, Briefcase, PlusCircle, UserCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'; // Import Image

// --- FIX: Define specific types ---
interface CreatorListing {
  id: number;
  avatar_url?: string;
  full_name?: string;
  created_at: string;
  creator_id: string;
  dau: number;
  description: string;
  game_title: string;
  platform: string;
  status: string;
}

interface ListingCardProps {
    listing: CreatorListing;
}
const CreatorListingCard = ({ listing }: ListingCardProps) => (
    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
        <div className="flex items-center gap-4 mb-4">
            {listing.avatar_url ? (
                // --- FIX: Use Image component ---
                <Image src={listing.avatar_url} alt={listing.full_name || 'Creator'} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
            ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center">
                    <UserCircle size={24} className="text-neutral-500" />
                </div>
            )}
            <div>
                <h3 className="font-bold text-white">{listing.full_name || 'Unnamed Creator'}</h3>
                <p className="text-sm text-neutral-400">{listing.game_title} ({listing.platform})</p>
            </div>
        </div>
        <p className="text-sm text-neutral-300 mb-4 line-clamp-2 h-10">{listing.description}</p>
        <div className="flex justify-between items-center">
             <div>
                <p className="text-xs text-neutral-400">Avg. DAU</p>
                <p className="font-semibold text-white">{(listing.dau || 0).toLocaleString()}</p>
            </div>
            <Link href={`/profile/${listing.creator_id}`}>
                <Button variant="outline" className="rounded-full border-neutral-700 hover:bg-neutral-800">View Profile</Button>
            </Link>
        </div>
    </div>
);

// --- FIX: Define specific types ---
interface BrandCampaign {
  id: number;
  poster_avatar_url?: string;
  brand_name: string;
  campaign_title: string;
  description: string;
  budget_range: string;
  // Optional fields for compatibility with RPC response
  brand_id?: string;
  created_at?: string;
  platforms?: string[];
  poster_full_name?: string;
  status?: string;
}

interface BrandCardProps {
    brand: BrandCampaign;
}
const BrandListingCard = ({ brand }: BrandCardProps) => (
    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 hover:border-indigo-500/50 transition-colors">
         <div className="flex items-center gap-4 mb-4">
            {brand.poster_avatar_url ? (
                // --- FIX: Use Image component ---
                <Image src={brand.poster_avatar_url} alt={brand.brand_name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
            ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center"><Briefcase size={24} className="text-neutral-500"/></div>
            )}
            <div>
                <h3 className="font-bold text-white">{brand.brand_name}</h3>
                <p className="text-sm text-neutral-400">{brand.campaign_title}</p>
            </div>
        </div>
        <p className="text-sm text-neutral-300 mb-4 line-clamp-2 h-10">{brand.description}</p>
        <div className="flex justify-between items-center">
            <p className="text-lg font-bold text-green-400">{brand.budget_range}</p>
            <Link href={`/campaign/${brand.id}`}>
                <Button variant="outline" className="rounded-full border-neutral-700 hover:bg-neutral-800">View Campaign</Button>
            </Link>
        </div>
    </div>
);


export default async function MarketplacePage() {
    const supabase = await createClient() // Add await here
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { return redirect('/login') }

    const { data: creatorListings, error: listingsError } = await supabase.rpc('get_active_listings');
    const { data: brandCampaigns, error: campaignsError } = await supabase.rpc('get_active_campaigns');

    if (listingsError) console.error("Error fetching creator listings:", listingsError);
    if (campaignsError) console.error("Error fetching brand campaigns:", campaignsError);

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
            <main className="container mx-auto p-6">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Welcome to the Marketplace</h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto">Discover brand campaigns looking for creators, or find the perfect game for your next launch. Ready to participate?</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link href="/list-your-game">
                            <Button className="bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-3 text-base"><PlusCircle size={18} className="mr-2" /> List Your Game</Button>
                        </Link>
                        <Link href="/post-a-campaign">
                          <Button className="bg-indigo-500 hover:bg-indigo-600 rounded-full px-6 py-3 text-base"><PlusCircle size={18} className="mr-2" /> Post a Campaign</Button>
                        </Link>
                    </div>
                </section>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Gamepad2 /> Creators for Hire</h2>
                        <div className="space-y-6">
                            {creatorListings && creatorListings.length > 0 ? (
                                creatorListings.map(listing => <CreatorListingCard key={listing.id} listing={listing} />)
                            ) : (
                                <div className="bg-neutral-800/50 border border-dashed border-neutral-700 rounded-xl p-8 text-center text-neutral-500">
                                    <p>No creator listings have been posted yet. Be the first!</p>
                                </div>
                            )}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Briefcase /> Brand Campaigns</h2>
                         <div className="space-y-6">
                            {brandCampaigns && brandCampaigns.length > 0 ? (
                                brandCampaigns.map(campaign => <BrandListingCard key={campaign.id} brand={campaign} />)
                            ) : (
                                <div className="bg-neutral-800/50 border border-dashed border-neutral-700 rounded-xl p-8 text-center text-neutral-500">
                                    <p>No brand campaigns have been posted yet.</p>
                                </div>
                            )}
                         </div>
                    </section>
                </div>
            </main>
        </div>
    );
}