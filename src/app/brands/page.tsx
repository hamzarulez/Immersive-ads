"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BrandsPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600 text-white">
      {/* Fake dashboard background (blurred) */}
      <div className="absolute inset-0 bg-[url('/dashboard-mock.png')] bg-cover bg-center blur-sm opacity-40" />

      {/* Overlay content */}
      <div className="relative z-10 max-w-md rounded-2xl bg-black/70 p-8 text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Brand Dashboard (Locked)</h1>
        <p className="mb-6 text-gray-300">
          Sign up to unlock your Immersive Ads brand dashboard and start
          connecting with creators.
        </p>

        <form className="space-y-4">
          <Input placeholder="Enter your email" type="email" required />
          <Button className="w-full bg-pink-500 hover:bg-pink-600">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
