"use client";

import React, { useState } from 'react';
// --- FIX: Removed unused 'useRouter' import ---
import { createClient } from '../../utils/supabase/client';
import { Mail, Lock, User, ChevronsRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Header from '../../components/landing/Header';
import Footer from '../../components/landing/Footer';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
// --- FIX: Import ChangeEvent for the select handler ---
import type { ChangeEvent } from 'react';

// Define the shape of the props our icon component should accept
interface IconProps {
    size?: number;
    className?: string;
}

// Update InputFieldProps to expect a Component Type, not a React Element
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    IconComponent: React.ComponentType<IconProps>;
}

const InputField = ({ IconComponent, ...props }: InputFieldProps) => (
    <div className="relative">
        <IconComponent size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input {...props} className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow" />
    </div>
);


export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'brand' | 'creator' | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setRole(e.target.value as 'brand' | 'creator');
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Create Your Account</h1>
            <p className="text-neutral-400 mt-2">
              Join the future of in-game advertising.
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
            {isSuccess ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold">Check your inbox!</h3>
                <p className="text-neutral-400 mt-2">
                  We&apos;ve sent a confirmation link to your email address. Please click it to verify your account.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                
                <InputField IconComponent={User} type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <InputField IconComponent={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <InputField IconComponent={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <div className="relative">
                    <ChevronsRight size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <select 
                        value={role}
                        // --- FIX: Use a properly typed event handler ---
                        onChange={handleRoleChange}
                        required 
                        className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow appearance-none"
                    >
                        <option value="" disabled>I am a...</option>
                        <option value="brand">Brand / Advertiser</option>
                        <option value="creator">Game Creator</option>
                    </select>
                  </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-pink-500 hover:bg-pink-600 py-3 text-base font-semibold">
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            )}

            <p className="text-center text-sm text-neutral-400 mt-8">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-pink-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}