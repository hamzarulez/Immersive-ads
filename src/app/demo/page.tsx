'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Sparkles, MoveRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const demos = [
    {
        id: 'fashion',
        title: 'Fashion Brand Integration',
        // --- FIX: Escape apostrophe ---
        description: 'Imagine your latest collection becoming the centerpiece of a viral trend. This filter, organically shared in over 300,000 user-generated videos, places your brand at the heart of culture, achieving billions of authentic impressions that traditional ads can\'t buy.',
        videoSrc: '/demos/FashionDemo.mp4',
    },
    {
        id: 'makeup',
        title: 'Cosmetics Product Discovery',
        description: 'What if every beauty influencer was discovering and reviewing your product line? This filter puts your cosmetics directly into the hands of creators, sparking thousands of authentic video reviews and driving product discovery on a massive scale. Turn passive viewers into active customers.',
        videoSrc: '/demos/MakeupDemos.mp4',
    }
];

export default function DemoPage() {
    const [activeDemo, setActiveDemo] = useState(demos[0]);

    return (
        <div className="bg-black text-white min-h-screen">
            <header className="sticky top-0 z-50 w-full p-6 bg-black/50 backdrop-blur-md">
                <nav className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Gamepad2 className="h-7 w-7 text-pink-400" />
                        <span className="font-bold text-xl">Immersive Ads</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/#contact">
                            <Button className="bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-2 font-semibold">Contact Sales</Button>
                        </Link>    
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-6 mt-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-neutral-800/50 rounded-full px-4 py-2 mb-4 border border-neutral-700">
                            <p className="flex items-center gap-2 text-sm text-pink-300"><Sparkles size={16} /> Exclusive Demos</p>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Go Beyond the Banner Ad
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                            See how leading brands are achieving unprecedented reach by integrating their products directly into the fabric of social and gaming experiences.
                        </p>
                    </div>

                    <div className="bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/10">
                        <div className="p-6 border-b border-neutral-800">
                            <div className="bg-neutral-800/50 rounded-full p-1 flex items-center space-x-1 max-w-md mx-auto">
                                {demos.map(demo => (
                                    <button 
                                        key={demo.id}
                                        onClick={() => setActiveDemo(demo)}
                                        className={cn("w-full text-center px-4 py-2 rounded-full text-sm font-semibold transition-colors", activeDemo.id === demo.id ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-900')}>
                                            {demo.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8">
                            <div className="flex justify-center">
                                <div className="w-full max-w-[250px] aspect-[9/16] bg-black rounded-[30px] p-2 border-4 border-neutral-700 shadow-lg">
                                    <div className="w-full h-full rounded-[22px] overflow-hidden">
                                        <video key={activeDemo.videoSrc} className="w-full h-full object-cover" controls autoPlay muted loop playsInline>
                                            <source src={activeDemo.videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl font-bold text-white mb-2">{activeDemo.title}</h2>
                                <p className="text-neutral-400">{activeDemo.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <h3 className="text-3xl font-bold">Ready to Launch Your Campaign?</h3>
                        <p className="text-neutral-400 mt-3 mb-6 max-w-xl mx-auto">
                            Our team can help you design a custom, immersive ad experience tailored to your brand&apos;s unique goals. Let&apos;s create something unforgettable.
                        </p>
                        <Link href="/#contact">
                            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 rounded-full px-8 py-3 text-base font-semibold">
                                Get in Touch <MoveRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}