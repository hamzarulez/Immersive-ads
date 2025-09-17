"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { BarChart3, Search } from "lucide-react";

export default function ProductGlimpse() {
  return (
    <section className="px-6">
      <motion.div
        className="relative container max-w-5xl mx-auto -mt-36 md:-mt-48 z-20 p-2 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="p-4 md:p-8 bg-neutral-900/80 rounded-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white">Campaign Dashboard</h2>
            <div className="flex items-center w-full sm:w-auto space-x-2 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5">
              <Search className="h-4 w-4 text-neutral-400" />
              <input type="text" placeholder="Search campaigns..." className="bg-transparent text-sm text-neutral-300 w-full focus:outline-none" />
            </div>
          </div>
          
          <Card className="bg-gradient-to-br from-pink-600/20 to-neutral-900 border-pink-500/30">
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white">Active Campaign: CyberDrive</h3>
                <p className="text-sm text-neutral-300 mb-4">Racing Game Integration</p>
                <div className="flex items-center space-x-4">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-white">1,254,830</p>
                        <p className="text-xs text-neutral-400 uppercase tracking-wider">Impressions (Last 24h)</p>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}