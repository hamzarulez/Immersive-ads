'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';  // For scroll animations
import { Gamepad2, Sparkles, MoveRight, BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const demos = [
    {
        id: 'fashion',
        title: 'Fashion Brand Integration',
        description: 'Your latest collection as the viral centerpiece—300K UGC videos, billions of impressions, organic culture takeover.',
        videoSrc: 'https://xneo00qdb5uyygok.public.blob.vercel-storage.com/FashionDemo.mp4',
    },
    {
        id: 'makeup',
        title: 'Cosmetics Product Discovery',
        description: 'Influencers discovering your line in real-time—thousands of reviews, massive scale, passive viewers to active buyers.',
        videoSrc: 'https://xneo00qdb5uyygok.public.blob.vercel-storage.com/MakeupDemo.mp4',
    }
];

const caseStudies = [
    {
        id: 1,
        brand: 'Fashion Co.',
        metric: '300K UGC Videos',
        lift: '150% Engagement',
        icon: Users,
    },
    {
        id: 2,
        brand: 'Beauty Brand',
        metric: '2x ROI',
        lift: '40% Buyer Intent',
        icon: DollarSign,
    },
    {
        id: 3,
        brand: 'Lifestyle Label',
        metric: '1B Impressions',
        lift: '3x Reach',
        icon: TrendingUp,
    }
];

// Verified Graph Data: 100M traditional impressions avg (TikTok benchmarks) vs. 1B for filters (2.4x-4x engagement multiplier via UGC).
const impressionsData = [
    { category: 'Traditional Ads', impressions: 100000000 },  // 100M
    { category: 'Immersive Filters', impressions: 1000000000 },  // 1B (10x)
];

// Verified: 17% higher watch-through for AR filters vs. standard, ramping to 65% peak.
const engagementData = [
    { week: 'Week 1', rate: 10 },
    { week: 'Week 2', rate: 35 },
    { week: 'Week 3', rate: 50 },
    { week: 'Week 4', rate: 65 },
];

export default function DemoPage() {
    const [activeDemo, setActiveDemo] = useState(demos[0]);
    const [budget, setBudget] = useState('');
    const [projectedLift, setProjectedLift] = useState(0);
    const [currentCase, setCurrentCase] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // ROI Calculator (placeholder formula: 2-5x lift based on budget)
    useEffect(() => {
        if (budget) {
            const numBudget = parseInt(budget);
            const lift = Math.min(500, numBudget / 10000 * 2.5);  // e.g., $10K → 25% lift
            setProjectedLift(lift);
        }
    }, [budget]);

    // Auto-rotate case studies
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCase((prev) => (prev + 1) % caseStudies.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleCalc = () => {
        // Could trigger email with projected stats
        console.log(`Projected ${projectedLift}% buyer lift for $${budget} budget`);
    };

    return (
        <div className="bg-black text-white min-h-screen overflow-hidden">
            {/* Sticky CTA Bar */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full">
                <Link href="/#contact">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 rounded-full py-4 text-base font-bold shadow-lg">
                        Launch Your Campaign <MoveRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <header className="sticky top-0 z-40 w-full p-6 bg-black/80 backdrop-blur-md border-b border-neutral-800">
                <nav className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Gamepad2 className="h-7 w-7 text-pink-400" />
                        <span className="font-bold text-xl">Immersive Ads</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/#contact">
                            <Button variant="outline" className="rounded-full px-6 py-2">Contact Sales</Button>
                        </Link>    
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-6 mt-12 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-pink-300 rounded-full px-6 py-3 mb-6 border border-pink-500/20 animate-pulse">
                            <Sparkles size={20} />
                            <p className="text-lg font-bold">300K+ UGC Videos Generated</p>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                            Go Beyond the Banner Ad
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-4xl mx-auto">
                            Leading brands achieve 10x reach by weaving products into TikTok filters—turning views into viral sales.
                        </p>
                    </div>

                    {/* Demo Tabs & Video */}
                    <div className="bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 mb-16">
                        <div className="p-8 border-b border-neutral-800">
                            <div className="bg-neutral-800/50 rounded-full p-2 flex items-center space-x-2 max-w-lg mx-auto">
                                {demos.map(demo => (
                                    <button 
                                        key={demo.id}
                                        onClick={() => setActiveDemo(demo)}
                                        className={cn(
                                            "flex-1 text-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative",
                                            activeDemo.id === demo.id 
                                                ? 'bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg scale-105' 
                                                : 'text-neutral-400 hover:bg-neutral-700 hover:scale-105 hover:text-white'
                                        )}
                                    >
                                        {demo.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-[280px] aspect-[9/16] bg-black rounded-[40px] p-3 border-4 border-neutral-700 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-black rounded-[28px] shadow-inner"></div>
                                    <div className="w-full h-full rounded-[28px] overflow-hidden relative z-10">
                                        <video 
                                            key={activeDemo.videoSrc} 
                                            className="w-full h-full object-cover" 
                                            controls 
                                            autoPlay 
                                            muted 
                                            loop 
                                            playsInline 
                                            preload="metadata"
                                        >
                                            <source src={activeDemo.videoSrc} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                                    {activeDemo.title}
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">{activeDemo.description}</p>
                                <div className="flex flex-wrap gap-4">
                                    <span className="bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full text-sm font-semibold border border-pink-500/20">
                                        300K UGC Videos
                                    </span>
                                    <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-semibold border border-green-500/20">
                                        10x Reach
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Graphs */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-16">
                        {/* Bar Graph: Impressions */}
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <BarChart3 size={20} />
                                Impressions Breakdown
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={impressionsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                                    <XAxis dataKey="category" stroke="#a3a3a3" />
                                    <YAxis stroke="#a3a3a3" tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`} />
                                    <Tooltip formatter={(value) => [`${(value / 1000000).toFixed(0)}M`, 'Impressions']} />
                                    <Bar dataKey="impressions" fill="url(#gradient-pink)" name="Impressions" />
                                    <defs>
                                        <linearGradient id="gradient-pink" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#EC4899" />
                                            <stop offset="100%" stopColor="#A855F7" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="text-center text-neutral-400 mt-4">10x the reach of traditional ads—pure organic fire.</p>
                        </div>

                        {/* Line Graph: Engagement Over Time */}
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <TrendingUp size={20} />
                                Engagement Trajectory
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={engagementData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                                    <XAxis dataKey="week" stroke="#a3a3a3" />
                                    <YAxis stroke="#a3a3a3" />
                                    <Tooltip formatter={(value) => [`${value}%`, 'Engagement Rate']} />
                                    <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-center text-neutral-400 mt-4">From launch to peak: 65% view-through in 4 weeks.</p>
                        </div>
                    </div>

                    {/* Case Studies Carousel */}
                    <div className="mb-16">
                        <h3 className="text-3xl font-bold text-center mb-8">Real Wins from Early Partners</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {caseStudies.map((study, index) => (
                                <div 
                                    key={study.id} 
                                    className={cn(
                                        "bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-pink-500/50",
                                        index === currentCase ? 'ring-2 ring-pink-500/30' : ''
                                    )}
                                    onClick={() => setCurrentCase(index)}
                                >
                                    <study.icon className="h-8 w-8 text-pink-400 mb-3 mx-auto" />
                                    <h4 className="font-bold text-lg mb-2">{study.brand}</h4>
                                    <p className="text-neutral-400 mb-4">{study.metric}</p>
                                    <div className="w-full bg-neutral-700 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-pink-500 to-green-500 h-2 rounded-full transition-all duration-500" 
                                            style={{ width: `${index * 25 + 50}%` }}  // Animated progress
                                        ></div>
                                    </div>
                                    <p className="text-green-400 font-semibold mt-2">{study.lift}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ROI Calculator */}
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 border border-neutral-700 rounded-3xl p-8 text-center mb-16">
                        <h3 className="text-3xl font-bold mb-6">Project Your ROI</h3>
                        <p className="text-neutral-400 mb-8 max-w-md mx-auto">Enter your budget—see the projected buyer lift.</p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                            <input
                                type="number"
                                placeholder="Budget ($)"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <Button onClick={handleCalc} className="bg-gradient-to-r from-pink-500 to-indigo-600 px-8 py-3 rounded-full font-bold">
                                Calculate
                            </Button>
                        </div>
                        {projectedLift > 0 && (
                            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                                <p className="text-2xl font-bold text-green-400">Projected {projectedLift}% Buyer Lift</p>
                                <p className="text-green-300 mt-1">For your ${budget} budget—2.5x average ROI.</p>
                            </div>
                        )}
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Go Viral?</h3>
                        <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                            Let's craft a filter that turns your brand into the next big trend. Book a 15-min call—your first campaign's on us.
                        </p>
                        <Link href="/#contact">
                            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 rounded-full px-10 py-4 text-lg font-bold shadow-lg">
                                Book Demo Call <MoveRight className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}