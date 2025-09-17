"use client";

import { motion } from "framer-motion";
// Added Bitcoin to the import list
import { BarChart3, DollarSign, Handshake, Box, PartyPopper, Target, Bitcoin, LayoutDashboard } from "lucide-react";

export default function HowItWorks() {
  const brandSteps = [
    { icon: <Target size={28} className="text-pink-400" />, title: "Create Your Campaign", desc: "Define your target audience and upload your brand assets in minutes." },
    { icon: <Handshake size={28} className="text-pink-400" />, title: "Smart Matchmaking", desc: "Our platform connects your brand with the most relevant games and experiences." },
    { icon: <PartyPopper size={28} className="text-pink-400" />, title: "Go Live Natively", desc: "Your brand is integrated seamlessly into gameplay, reaching engaged players." },
    { icon: <BarChart3 size={28} className="text-pink-400" />, title: "Measure Real Impact", desc: "Access real-time analytics on impressions and audience demographics." },
    // --- NEW CRYPTO POINT FOR BRANDS ---
    { icon: <Bitcoin size={28} className="text-pink-400" />, title: "Web3 Ready Payments", desc: "Seamlessly pay creators worldwide using stablecoins or popular cryptocurrencies. Low fees, fast transactions." },
  ];

  const creatorSteps = [
    { icon: <Box size={28} className="text-indigo-400" />, title: "Place Our Smart Asset", desc: "No SDK needed. Simply drag and drop our pre-built ad unit into your game world." },
    { icon: <Handshake size={28} className="text-indigo-400" />, title: "Accept Brand Offers", desc: "Receive and approve campaign offers from top brands that fit your game's vibe." },
    { icon: <DollarSign size={28} className="text-indigo-400" />, title: "Earn Passive Revenue", desc: "Monetize your game's traffic without disrupting the player experience." },
    { icon: <LayoutDashboard size={28} className="text-indigo-400" />, title: "Track Your Earnings", desc: "View detailed payout reports and performance metrics from your dashboard." },
    // --- NEW CRYPTO POINT FOR CREATORS ---
    { icon: <Bitcoin size={28} className="text-indigo-400" />, title: "Get Paid in Crypto", desc: "Receive your earnings instantly in stablecoins like Bitcoin or other major cryptocurrencies. Your money, your way." },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 px-6 bg-black">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">A Frictionless Platform for Growth</h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16">
          Whether you&apos;re a brand looking to engage new audiences or a creator ready to monetize, our process is simple, transparent, and built for your ecosystem.
        </p>

        {/* Combined Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Brands Column */}
            <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-center md:text-left text-pink-400">For Brands</h3>
                {brandSteps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
                    >
                        <div className="flex-shrink-0 mt-1">{step.icon}</div>
                        <div>
                            <h4 className="font-semibold text-white">{step.title}</h4>
                            <p className="text-sm text-neutral-400">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Creators Column */}
            <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-center md:text-left text-indigo-400">For Creators</h3>
                {creatorSteps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
                    >
                        <div className="flex-shrink-0 mt-1">{step.icon}</div>
                        <div>
                            <h4 className="font-semibold text-white">{step.title}</h4>
                            <p className="text-sm text-neutral-400">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}