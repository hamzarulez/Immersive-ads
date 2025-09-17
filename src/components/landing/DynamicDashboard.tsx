"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { BarChart2, Bookmark, DollarSign, Gamepad2, Settings, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

// Import images
import robloxThumb from "../../../public/roblox.jpg";
import fortniteThumb from "../../../public/fortnite.jpg";
import tiktokThumb from "../../../public/tiktok.jpg";

// --- UPDATED FAKE DATA ---
const brandPlacements = [
  { thumbnail: robloxThumb, title: "Vibe Room Hangout", platform: "Roblox", metricName: "DAU", metricValue: 53178, status: "Active" },
  { thumbnail: fortniteThumb, title: "Neon Racers Map", platform: "Fortnite", metricName: "DAU", metricValue: 72315, status: "Disabled" },
  { thumbnail: tiktokThumb, title: "Summer Vibe Filter", platform: "TikTok", metricName: "Videos Created", metricValue: 413, status: "Active" },
];

const creatorGames = [
    { name: "Blade Battles", status: "Active", impressions: 1892345, eCPM: 3, revenue: 5677.06 },
    { name: "Vibe Room Hangout", status: "Active", impressions: 1595340, eCPM: 3, revenue: 4786.02 },
    { name: "Neon Racers Map", status: "Paused", impressions: 0, eCPM: 0, revenue: 0 },
];

const monthlyEarningsData = [
    { month: 'Apr', earnings: 0 }, { month: 'May', earnings: 8278 }, { month: 'Jun', earnings: 9142 },
    { month: 'Jul', earnings: 10278 }, { month: 'Aug', earnings: 9208.144 }, { month: 'Sep', earnings: 10463.8 },
];

// --- Animated Counter Hook (no changes) ---
const useAnimatedCounter = (to: number, options: { isCurrency?: boolean; decimals?: number } = {}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const num = parseFloat(latest.toFixed(options.decimals ?? 0));
    if (options.isCurrency) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: options.decimals ?? 0, maximumFractionDigits: options.decimals ?? 0 }).format(num); }
    return num.toLocaleString('en-US');
  });
  useEffect(() => { const controls = animate(count, to, { duration: 1.5, ease: "easeOut" }); return () => controls.stop(); }, [to, count]);
  return rounded;
};

// --- Brand Dashboard V3 ---

// --- FIX: Define a specific type for StatCard props ---
interface StatCardProps {
    title: string;
    value: React.ReactNode; // Can be a string or a motion value
    subtext: string;
}
const StatCard = ({ title, value, subtext }: StatCardProps) => (
    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4">
        <p className="text-xs text-neutral-400">{title}</p>
        <motion.p className="text-2xl font-bold text-white">{value}</motion.p>
        <p className="text-xs text-neutral-500">{subtext}</p>
    </div>
);

const BrandDashboardV3 = () => {
    const costPerDauPerMonth = 0.20;
    const totalActiveDAU = brandPlacements.filter(p => p.status === 'Active' && p.metricName === 'DAU').reduce((sum, p) => sum + p.metricValue, 0);
    const monthlyCost = totalActiveDAU * costPerDauPerMonth;

    return (
        <motion.div key="brand-dashboard-v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Monthly Cost" value={useAnimatedCounter(monthlyCost, { isCurrency: true })} subtext="Based on active DAU" />
                <StatCard title="Total Impressions" value={useAnimatedCounter(1595340)} subtext="+12% this month" />
                <StatCard title="Game Approval Ratings" value="96.2%" subtext="Average based on active contracts" />
            </div>
            <div className="flex-grow bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-3">Live Placements</h4>
                <div className="space-y-2">
                    {brandPlacements.map(p => (
                        <div key={p.title} className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-neutral-800 transition-colors">
                            <div className="col-span-1"><Image src={p.thumbnail} alt={p.title} className="rounded-md w-10 h-10 object-cover" /></div>
                            <div className="col-span-4"><p className="text-sm font-semibold text-white">{p.title}</p><p className="text-xs text-neutral-400">{p.platform}</p></div>
                            <div className="col-span-2 text-center"><div className={`text-xs px-2 py-1 rounded-full inline-block ${p.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-700 text-neutral-400'}`}>{p.status}</div></div>
                            <div className="col-span-2 text-center"><p className="text-sm font-semibold text-white">{p.metricValue.toLocaleString()}</p><p className="text-xs text-neutral-400">{p.metricName}</p></div>
                            <div className="col-span-2 text-right"><p className="text-sm font-semibold text-pink-400">{p.metricName === 'DAU' ? `$${(p.metricValue * costPerDauPerMonth).toLocaleString()}` : 'N/A'}</p><p className="text-xs text-neutral-400">Monthly Cost</p></div>
                            <div className="col-span-1 text-right text-neutral-500"><MoreHorizontal size={16} /></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// --- Creator Dashboard V3 ---
const CreatorDashboardV3 = () => {
    return (
        <motion.div key="creator-dashboard-v3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4">
                <div className="sm:col-span-1">
                    <StatCard title="Lifetime Earnings" value={useAnimatedCounter(47369, { isCurrency: true })} subtext="All-time total" />
                    <div className="mt-4"><StatCard title="Pending Payout" value={useAnimatedCounter(10463, { isCurrency: true })} subtext="Next on Oct 1, 2025" /></div>
                </div>
                <div className="sm:col-span-2">
                    <p className="text-xs text-neutral-400 mb-2">Monthly Earnings Trend</p>
                    <div className="w-full h-48">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyEarningsData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                <Tooltip contentStyle={{ backgroundColor: '#222', border: '1px solid #444', fontSize: '12px' }} cursor={{stroke: '#fff', strokeWidth: 1, strokeDasharray: '3 3'}}/>
                                <Line type="monotone" dataKey="earnings" stroke="#818CF8" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="flex-grow bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4">
                 <h4 className="font-semibold text-white mb-3">Performance By Game</h4>
                 <div className="space-y-2">
                    {creatorGames.map(g => (
                        <div key={g.name} className="grid grid-cols-10 gap-4 items-center p-2 rounded-lg hover:bg-neutral-800 transition-colors">
                            <div className="col-span-3"><p className="text-sm font-semibold text-white">{g.name}</p></div>
                            <div className="col-span-2 text-center"><div className={`text-xs px-2 py-1 rounded-full inline-block ${g.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-neutral-700 text-neutral-400'}`}>{g.status}</div></div>
                            <div className="col-span-2 text-center"><p className="text-sm font-semibold text-white">{g.impressions.toLocaleString()}</p><p className="text-xs text-neutral-400">Impressions</p></div>
                            <div className="col-span-1 text-center"><p className="text-sm font-semibold text-white">{`$${g.eCPM.toFixed(2)}`}</p><p className="text-xs text-neutral-400">eCPM</p></div>
                            <div className="col-span-2 text-right"><p className="text-sm font-semibold text-green-400">{`$${g.revenue.toLocaleString()}`}</p><p className="text-xs text-neutral-400">Revenue (30d)</p></div>
                        </div>
                    ))}
                 </div>
            </div>
        </motion.div>
    );
};


// --- Main Exported Component ---
export function DynamicDashboard({ view }: { view: 'brand' | 'creator' }) {
  return (
    <div className="w-full max-w-5xl mx-auto aspect-video p-4 sm:p-6 bg-neutral-900/70 rounded-2xl border border-neutral-700/50 shadow-2xl shadow-black/50 backdrop-blur-md">
      <div className="flex h-full gap-4">
        {/* Sidebar */}
        <div className="w-16 flex-shrink-0 flex flex-col items-center gap-6 py-4">
            <Gamepad2 className="h-7 w-7 text-white" />
            <div className="flex flex-col gap-4 text-neutral-400">
                <BarChart2 className={`h-6 w-6 cursor-pointer ${view === 'brand' ? 'text-pink-400' : 'hover:text-white'}`} />
                <DollarSign className={`h-6 w-6 cursor-pointer ${view === 'creator' ? 'text-indigo-400' : 'hover:text-white'}`} />
                <Bookmark className="h-6 w-6 cursor-pointer hover:text-white" />
                <Settings className="h-6 w-6 cursor-pointer hover:text-white mt-auto" />
            </div>
        </div>
        {/* Main Content */}
        <main className="flex-grow h-full">
          {view === 'brand' ? <BrandDashboardV3 /> : <CreatorDashboardV3 />}
        </main>
      </div>
    </div>
  );
}