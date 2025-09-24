import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { signOut } from '../../app/actions';
import { DollarSign, Banknote, Hourglass, LogOut, LayoutDashboard, Briefcase, BarChart2, UserCircle, Gamepad2 } from 'lucide-react';
import Link from 'next/link'; // Import Link

// --- FIX: Define specific types ---
interface StatCardProps {
    title: string;
    amount: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}
const StatCard = ({ title, amount, icon: Icon, color }: StatCardProps) => (
  <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-6">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm text-neutral-400">{title}</p>
      <Icon className={`h-5 w-5 ${color}`} />
    </div>
    <p className="text-3xl font-bold text-white">{amount}</p>
  </div>
);

// --- FIX: Define specific types ---
interface TransactionRowProps {
    brand: string | null;
    platform: string | null;
    amount: string;
    commission: string;
    share: string;
    status: string | null;
    date: string;
}
const TransactionRow = ({ brand, platform, amount, commission, share, status, date }: TransactionRowProps) => (
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

export default async function DashboardPage() {
  const supabase = await createClient(); // Add await here

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return redirect('/login'); }

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('creator_id', user.id)
    .order('release_date', { ascending: false });

  if (error) { console.error('Error fetching transactions:', error.message); }
  
  const totalEarnings = transactions?.reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const availableForPayout = transactions?.filter(t => t.status === 'Released').reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const inEscrow = transactions?.filter(t => t.status === 'In Escrow').reduce((sum, t) => sum + (t.creator_share || 0), 0) ?? 0;
  const pendingClearance = 0;

  const userFullName = user.user_metadata?.full_name || 'Creator';
  
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  return (
    <div className="bg-black text-white min-h-screen flex">
      <aside className="w-64 bg-neutral-900/50 border-r border-neutral-800 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
              <Gamepad2 className="h-7 w-7 text-pink-400" />
              <h1 className="text-xl font-bold">Immersive Ads</h1>
          </div>
          <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className="flex items-center gap-3 bg-neutral-800 text-white px-4 py-2 rounded-lg font-semibold"><LayoutDashboard size={18} /> Overview</Link>
              <Link href="/dashboard/projects" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><Briefcase size={18} /> Projects</Link>
              <Link href="/dashboard/analytics" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><BarChart2 size={18} /> Analytics</Link>
              <Link href="/dashboard/profile" className="flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><UserCircle size={18} /> Profile</Link>
          </nav>
          <div className="mt-auto">
              <form action={signOut}><button className="w-full flex items-center gap-3 text-neutral-400 hover:bg-neutral-800 hover:text-white px-4 py-2 rounded-lg"><LogOut size={18} /><span>Sign Out</span></button></form>
          </div>
        </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back, {userFullName}!</h2>
            <p className="text-neutral-400">Here&apos;s a summary of your creator account.</p>
        </header>

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
                            amount={formatCurrency(t.contract_value || 0)}
                            commission={`-${formatCurrency(t.platform_fee || 0)}`}
                            share={`+${formatCurrency(t.creator_share || 0)}`}
                            status={t.status}
                            date={new Date(t.release_date || new Date()).toLocaleDateString()}
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