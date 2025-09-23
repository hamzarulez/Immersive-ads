// page.tsx
import { login } from './actions'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import Link from 'next/link'
import { Mail, Lock, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  // ✅ await the searchParams
  const params = await searchParams

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-neutral-400 mt-2">
              Sign in to manage your campaigns and earnings.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
            <form action={login} className="space-y-6">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                />
              </div>

              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
                />
              </div>

              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 py-3 text-base font-semibold">
                Sign In
              </Button>

              {params?.message && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2 mt-4">
                  <AlertTriangle size={16} />
                  <p>{params.message}</p>
                </div>
              )}
            </form>

            <p className="text-center text-sm text-neutral-400 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-pink-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
