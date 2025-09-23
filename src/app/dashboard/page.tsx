import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/app/actions';
import { DollarSign, Banknote, Hourglass, LogOut, LayoutDashboard, Briefcase, BarChart2, UserCircle, Gamepad2 } from 'lucide-react';

// --- Reusable Stat Card Component ---
const StatCard = ({ title, amount, icon: Icon, color }: any) => (
  <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-neutral-400">{title}</p>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <p className="text-3xl font-bold text-white">{amount}</p>
  </div>
);

// --- Reusable Transaction Row Component ---
const TransactionRow = ({ brand, platform, amount, commission, share, status, date }: any) => (
  <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-b-0">
    <div className="col-span-3">
      <p className="font-semibold text-white">{brand}</p>
      <p className="text-xs text-neutral-400">{platform}</p>
    </div>
    <div className="col-span-2 text-right"><p className="text-sm text-neutral-300">{amount}</p></div>
    <div className="col-span-2 text-right"><p className="text-sm text-red-400">{commission}</p></div>
    <div className="col-span-2 text-right"><p className="text-sm text-green-400">{share}</p></div>
    <div className="col-span-1 text-center">
        <span className={`text-xs px-2 py-1 rounded-full inline-block ${status === 'Released' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{status}</span>
    </div>
    <div className="col-span-2 text-right"><p className="text-sm text-neutral-400">{date}</p></div>
  </div>
);

// --- The Main Dashboard Page ---
export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  // Fetch real data from the database
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('creator_id', user.id) // RLS also enforces this, but it's good practice
    .order('release_date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error.message);
    // You could render a friendly error message to the user here
    // For now, we'll just show an empty state.
  }
  
  // Calculate real numbers from the fetched data
  const totalEarnings = transactions?.reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const availableForPayout = transactions?.filter(t => t.status === 'Released').reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const inEscrow = transactions?.filter(t => t.status === 'In Escrow').reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const pendingClearance = 0; // Placeholder for now

  const userFullName = user.user_metadata?.full_name || 'Creator';
  
  // Helper to format numbers as currency
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="bg-black text-white min-h-screen flex">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
            <Gamepad2 className="h-7 w-7 text-pink-400" />
            <h1 className="text-xl font-bold">Immersive Ads</h1>
        </div>
        <nav className="flex flex-col gap-2">
            <a href="/dashboard" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><LayoutDashboard size={18} /> Overview</a>
            <a href="/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><Briefcase size={18} /> Projects</a>
            <a href="/dashboard/analytics" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</a>
            <a href="/dashboard/profile" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Profile</a>
        </nav>
        <div className="mt-auto">
            <form action={signOut}>
                <button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </form>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
            <p className="text-xs text-red-500">DEBUG: Logged in as user ID: {user.id}</p>
            <h2 className="text-3xl font-bold text-white">Welcome Back, {userFullName}!</h2>
            <p className="text-neutral-400">Here&apos;s a summary of your creator account.</p>
        </header>

        {/* Section 1: Financial Transparency and Earnings Hub */}
        <section>
            <h3 className="text-xl font-semibold mb-4">Earnings Hub</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Earnings" amount={formatCurrency(totalEarnings)} icon={DollarSign} color="text-green-400" />
                <StatCard title="Available for Payout" amount={formatCurrency(availableForPayout)} icon={Banknote} color="text-blue-400" />
                <StatCard title="In Escrow" amount={formatCurrency(inEscrow)} icon={Briefcase} color="text-yellow-400" />
                <StatCard title="Pending Clearance" amount={formatCurrency(pendingClearance)} icon={Hourglass} color="text-orange-400" />
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <div className="p-4 border-b border-neutral-800">
                    <h4 className="font-semibold text-white">Transaction History</h4>
                </div>
                <div className="grid grid-cols-12 gap-4 items-center p-4 text-xs text-neutral-500 font-semibold uppercase">
                    <div className="col-span-3">Brand & Project</div>
                    <div className="col-span-2 text-right">Contract Value</div>
                    <div className="col-span-2 text-right">Platform Fee</div>
                    <div className="col-span-2 text-right">Your Share</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-2 text-right">Date</div>
                </div>
                
                {transactions && transactions.length > 0 ? (
                    transactions.map(t => (
                        <TransactionRow 
                            key={t.id}
                            brand={t.brand_name}
                            platform={t.platform}
                            amount={formatCurrency(t.contract_value)}
                            commission={`-${formatCurrency(t.platform_fee)}`}
                            share={`+${formatCurrency(t.creator_share)}`}
                            status={t.status}
                            date={new Date(t.release_date).toLocaleDateString()}
                        />
                    ))
                ) : (
                    <div className="text-center p-8 text-neutral-500">
                        <p>No transactions found.</p>
                    </div>
                )}
            </div>
        </section>
      </main>
    </div>
  );
}