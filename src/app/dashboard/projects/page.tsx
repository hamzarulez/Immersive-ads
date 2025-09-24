import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/actions';
import { LayoutDashboard, Briefcase, BarChart2, UserCircle, LogOut, Gamepad2, Megaphone, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Database } from '@/types/supabase'; // Import Database for typing

// --- FIX: Define specific type for props ---
type Project = Database['public']['Tables']['projects']['Row']

interface ProjectCardProps {
    project: Project; // Use specific Project type instead of 'any'
}
const ProjectCard = ({ project }: ProjectCardProps) => {
    // --- FIX: Define type for status styles ---
    const statusStyles: { [key: string]: { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bg: string; buttonText: string } } = {
        Invitation: { icon: Megaphone, color: "text-blue-400", bg: "bg-blue-500/10", buttonText: "View Offer" },
        Active: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10", buttonText: "Submit Work" },
        Completed: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10", buttonText: "View Details" },
    };
    const currentStatus = statusStyles[project.status] || statusStyles.Active;
    const StatusIcon = currentStatus.icon;

    return (
        <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-xs text-neutral-400">{project.brand_name}</p>
                    <h3 className="font-bold text-lg text-white">{project.project_title}</h3>
                </div>
                <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full ${currentStatus.bg} ${currentStatus.color}`}>
                    <StatusIcon size={14} />
                    <span>{project.status}</span>
                </div>
            </div>
            <p className="text-sm text-neutral-300 flex-grow mb-6">{project.description}</p>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-neutral-400">Contract Value</p>
                    <p className="text-xl font-bold text-green-400">${(project.contract_value || 0).toLocaleString()}</p>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600 rounded-full px-6">{currentStatus.buttonText}</Button>
            </div>
        </div>
    );
};

export default async function ProjectsPage() {
    const supabase = await createClient(); // Add await here
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { return redirect('/login'); }

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false });

    if (error) { console.error('Error fetching projects:', error.message); }
    
    const invitations = projects?.filter(p => p.status === 'Invitation') || [];
    const activeProjects = projects?.filter(p => p.status === 'Active') || [];
    const completedProjects = projects?.filter(p => p.status === 'Completed') || [];

    return (
        <div className="bg-black text-white min-h-screen flex">
            <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <Gamepad2 className="h-7 w-7 text-pink-400" />
                    <h1 className="text-xl font-bold">Immersive Ads</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    <Link href="/dashboard" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LayoutDashboard size={18} /> Overview</Link>
                    <Link href="/dashboard/projects" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><Briefcase size={18} /> Projects</Link>
                    <Link href="/dashboard/analytics" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Profile</Link>
                </nav>
                <div className="mt-auto">
                    <form action={signOut}><button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LogOut size={18} /><span>Sign Out</span></button></form>
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Project Management</h2>
                    <p className="text-neutral-400">View invitations, manage active projects, and see your completed work.</p>
                </header>

                <section>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">New Opportunities ({invitations.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {invitations.map(p => <ProjectCard key={p.id} project={p} />)}
                        {invitations.length === 0 && <p className="text-neutral-500 col-span-3">No new invitations at this time.</p>}
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">Active Projects ({activeProjects.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {activeProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                        {activeProjects.length === 0 && <p className="text-neutral-500 col-span-3">No projects currently active.</p>}
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-green-400">Completed Projects ({completedProjects.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedProjects.map(p => <ProjectCard key={p.id} project={p} />)}
                        {/* --- FIX: Escape apostrophe --- */}
                        {completedProjects.length === 0 && <p className="text-neutral-500 col-span-3">You haven&apos;t completed any projects yet.</p>}
                    </div>
                </section>
            </main>
        </div>
    );
}