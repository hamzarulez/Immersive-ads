"use client";

import { useState } from "react";
import { cn } from "../../lib/utils"; // Or your preferred classname utility
import { DynamicDashboard } from "./DynamicDashboard"; // Import the new component

export default function DashboardShowcase() {
  const [activeView, setActiveView] = useState<'brand' | 'creator'>('brand');

  return (
    
    <section id="dashboard" className="py-24 sm:py-32 px-6 bg-black">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Your Mission Control for In-Game Ads
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4">
            Get a crystal-clear view of your campaign performance. Our dynamic dashboards provide the data you need to make smarter decisions.
          </p>
        </div>

        {/* The Brand/Creator Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-neutral-900 p-1 rounded-full flex gap-1">
            <button
              onClick={() => setActiveView('brand')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300",
                activeView === 'brand' ? "bg-pink-500/30 text-white" : "text-neutral-400 hover:bg-neutral-800"
              )}
            >
              For Brands
            </button>
            <button
              onClick={() => setActiveView('creator')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300",
                activeView === 'creator' ? "bg-indigo-500/30 text-white" : "text-neutral-400 hover:bg-neutral-800"
              )}
            >
              For Creators
            </button>
          </div>
        </div>

        {/* Render the Dynamic Dashboard */}
        <DynamicDashboard view={activeView} />
        
      </div>
    </section>
  );
}