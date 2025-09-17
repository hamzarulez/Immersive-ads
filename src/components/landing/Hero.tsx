"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center text-center pt-24 pb-12 px-6 bg-black text-white overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute -top-1/4 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-900/50 to-black/0 opacity-60 blur-3xl rounded-full"></div>
      <div className="absolute -top-1/4 right-0 w-1/2 h-full bg-gradient-to-l from-pink-900/50 to-black/0 opacity-60 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Reach Engaged Players, <span className="text-neutral-400">Not Just Viewers.</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-neutral-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          Eliminate disruptive ads and embrace seamless in-game brand integrations. Onboard your brand or monetize your game with our streamlined platform.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          {/* --- CORRECTED BRAND BUTTON --- */}
          <Button asChild className="bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-3 text-base font-semibold">
            <Link href="/brands">
              Start for Brands <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* --- CORRECTED CREATOR BUTTON --- */}
          <Button asChild variant="outline" className="bg-transparent border-neutral-700 hover:bg-neutral-900 hover:text-white rounded-full px-6 py-3 text-base font-semibold">
            <Link href="/creators">Explore for Creators</Link>
          </Button>

        </motion.div>
      </div>
    </section>
  );
}