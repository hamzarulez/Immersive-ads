'use client'

import { useState, useEffect } from 'react';
import { signOut } from '@/app/actions';
import { LayoutDashboard, Briefcase, BarChart2, UserCircle, LogOut, Gamepad2, ThumbsUp, Medal, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

// --- FIX: Define specific types for props ---
interface KpiCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string; size?: number | string }>; // More specific than 'any' for Lucide icons
}
const KpiCard = ({ title, value, icon: Icon }: KpiCardProps) => (
    <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
        <div className="flex items-center gap-4">
            <div className="bg-neutral-800 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-pink-400" />
            </div>
            <div>
                <p className="text-sm text-neutral-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);

// --- FIX: Define type for the shell component ---
interface DashboardShellProps {
    children: React.ReactNode;
}
const DashboardShell = ({ children }: DashboardShellProps) => (
    <div className="bg-black text-white min-h-screen flex">
        <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <Gamepad2 className="h-7 w-7 text-pink-400" />
                <h1 className="text-xl font-bold">Immersive Ads</h1>
            </div>
            <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LayoutDashboard size={18} /> Overview</Link>
                <Link href="/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><Briefcase size={18} /> Projects</Link>
                <Link href="/dashboard/analytics" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><BarChart2 size={18} /> Analytics</Link>
                <Link href="/dashboard/profile" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Profile</Link>
            </nav>
            <div className="mt-auto">
                <form action={signOut}><button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LogOut size={18} /><span>Sign Out</span></button></form>
            </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white">Performance Analytics</h2>
                <p className="text-neutral-400">Understand your impact and growth on the platform.</p>
            </header>
            {children}
        </main>
    </div>
);

export default function AnalyticsPage() {
    // --- FIX: Define types for state ---
    const [kpiData, setKpiData] = useState<{ projects: number; value: number; rating: number | null } | null>(null);
    // --- FIX: Define specific type for chartData based on API response ---
    const [chartData, setChartData] = useState<Array<{ name: string; projects: number; value: number }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/analytics');
                if (!response.ok) { throw new Error('Failed to fetch analytics data'); }
                const data = await response.json();
                setKpiData(data.kpiData);
                setChartData(data.chartData);
            } catch (err: unknown) { // --- FIX: Use 'unknown' instead of 'any' for caught errors (safer for ESLint)
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) { return <DashboardShell><p className="text-neutral-500">Loading analytics...</p></DashboardShell>; }
    if (error) { return <DashboardShell><p className="text-red-500">Error: {error}</p></DashboardShell>; }

    const displayRating = kpiData?.rating ? `${kpiData.rating}/5` : "N/A";

    return (
        <DashboardShell>
            <div className="space-y-8">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KpiCard title="Completed Projects" value={String(kpiData?.projects || 0)} icon={Medal} />
                    <KpiCard title="Total Contract Value" value={`$${(kpiData?.value || 0).toLocaleString()}`} icon={DollarSign} />
                    <KpiCard title="Avg. Creator Rating" value={displayRating} icon={ThumbsUp} />
                </section>
                <section className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-4">Performance by Platform</h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                                <YAxis yAxisId="left" orientation="left" stroke="#a3a3a3" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                                <YAxis yAxisId="right" orientation="right" stroke="#a3a3a3" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#262626', border: '1px solid #404040' }} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
                                <Legend wrapperStyle={{fontSize: "14px"}} />
                                <Bar yAxisId="left" dataKey="value" name="Contract Value" fill="#EC4899" />
                                <Bar yAxisId="right" dataKey="projects" name="Projects" fill="#6366F1" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>
        </DashboardShell>
    );
}