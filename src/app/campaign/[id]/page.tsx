import { createClient } from '../../../utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // Import the Image component
import { Gamepad2, Globe, Briefcase, Mail, DollarSign, Pin } from 'lucide-react'
import { Button } from '../../../components/ui/button'

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Await params to resolve the Promise
    const supabase = await createClient() // Add await here
    const campaignId = parseInt(id, 10);

    const { data: campaign } = await supabase
        .rpc('get_campaign_details', { p_campaign_id: campaignId })
        .single();

    if (!campaign) {
        notFound();
    }
    
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
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 sticky top-32">
                             <div className="flex items-center gap-4 mb-6">
                                {campaign.poster_avatar_url ? (
                                    // --- FIX: Use Image component ---
                                    <Image src={campaign.poster_avatar_url} alt={campaign.brand_name || 'Brand'} width={64} height={64} className="w-16 h-16 rounded-lg object-cover border-2 border-neutral-700" />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-neutral-700 flex items-center justify-center">
                                        <Briefcase size={32} className="text-neutral-500" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-neutral-400">Brand</p>
                                    <h2 className="text-2xl font-bold">{campaign.brand_name}</h2>
                                </div>
                            </div>
                            
                            {campaign.poster_website_url && ( <a href={campaign.poster_website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-pink-400 hover:underline"> <Globe size={16} /> <span>Visit Website</span> </a> )}
                            <Button className="w-full mt-8 bg-indigo-500 hover:bg-indigo-600 rounded-full py-3 font-semibold"> <Mail size={16} className="mr-2" /> Contact Brand </Button>
                        </div>
                    </aside>

                    <section className="lg:col-span-2">
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
                            <h1 className="text-3xl font-bold leading-tight">{campaign.campaign_title}</h1>
                            <hr className="my-6 border-neutral-800" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-400 mb-2 flex items-center gap-2"><DollarSign size={16} /> Budget</h3>
                                    <p className="text-2xl font-bold text-green-400">{campaign.budget_range || 'Not specified'}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-400 mb-2 flex items-center gap-2"><Pin size={16} /> Target Platforms</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {campaign.platforms?.map((platform: string) => ( <span key={platform} className="bg-neutral-700 text-neutral-300 text-xs font-semibold px-3 py-1 rounded-full">{platform}</span> ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-neutral-400 mb-2">Campaign Brief</h3>
                                <p className="text-neutral-300 whitespace-pre-wrap">{campaign.description}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}