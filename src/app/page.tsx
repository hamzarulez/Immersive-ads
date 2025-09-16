"use client";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BarChart3, Gamepad2, Sparkles, TrendingUp, DollarSign, Zap, Handshake } from "lucide-react";
import { cn } from "../lib/utils";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-sm fixed w-full z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Immersive Ads
        </h1>
        <nav className="hidden sm:flex gap-6 text-gray-300">
          <a href="#brands" className="hover:text-white">For Brands</a>
          <a href="#creators" className="hover:text-white">For Creators</a>
          <a href="#how-it-works" className="hover:text-white">How It Works</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen text-center px-6">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl font-extrabold tracking-tight mb-6">
            In-Game Advertising That Players Actually Welcome
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Connect your brand with millions of engaged players through
            immersive, native ad experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-pink-500 hover:bg-pink-600 px-6 py-3 text-lg"
              onClick={() => (window.location.href = "/brands")}
            >
              For Brands – Advertise With Us
            </Button>
            <Button
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 text-lg"
              onClick={() => (window.location.href = "/creators")}
            >
              For Creators – Monetize Your Game
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>

      {/* For Brands */}
      <div className="mb-16">
        <h4 className="text-2xl font-semibold text-center mb-8">For Brands</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {[
        { title: "Create Campaign", desc: "Upload your assets and define your target audience." },
        { title: "Smart Matchmaking", desc: "We connect your brand with the most relevant games." },
        { title: "Go Live", desc: "Ads are placed natively inside gameplay environments." },
        { title: "Measure Impact", desc: "Access real-time analytics & ROI reporting." },
      ].map((step, i) => (
        <Card key={i} className="bg-white/5 hover:bg-white/10 transition-colors">
          <CardContent className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-300">{step.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>

  {/* For Creators */}
  <div>
    <h4 className="text-2xl font-semibold text-center mb-8">For Creators</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {[
        { title: "Integrate Easily", desc: "Add our SDK or simple integration tools into your game." },
        { title: "Get Matched", desc: "Receive brand campaigns tailored to your audience." },
        { title: "Earn Revenue", desc: "Generate income without disrupting gameplay." },
        { title: "Track Earnings", desc: "View payouts & performance from your dashboard." },
      ].map((step, i) => (
        <Card key={i} className="bg-white/5 hover:bg-white/10 transition-colors">
          <CardContent className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-300">{step.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* For Brands */}
<section id="for-brands" className="py-20 px-6 bg-black text-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Left: Icon Block */}
    <div className="flex justify-center">
      <div className="w-80 h-80 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
        <BarChart3 className="w-32 h-32 text-white" />
      </div>
    </div>

    {/* Right: Text */}
    <div>
      <h3 className="text-3xl font-bold mb-6">Connect With Players Where They Play</h3>
      <ul className="space-y-4 text-lg text-gray-300">
        <li className="flex items-start">
          <Gamepad2 className="mr-3 text-purple-400 w-6 h-6" />
          Reach Gen-Z & Millennials in authentic game environments.
        </li>
        <li className="flex items-start">
          <Sparkles className="mr-3 text-purple-400 w-6 h-6" />
          Native ads that feel like part of the world, not interruptions.
        </li>
        <li className="flex items-start">
          <TrendingUp className="mr-3 text-purple-400 w-6 h-6" />
          Track performance with detailed analytics dashboards.
        </li>
      </ul>
      <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition">
        Advertise With Us
      </button>
    </div>
  </div>
</section>

{/* For Creators */}
<section id="for-creators" className="py-20 px-6 bg-gray-900 text-white">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Left: Text */}
    <div>
      <h3 className="text-3xl font-bold mb-6">Monetize Without Disrupting Gameplay</h3>
      <ul className="space-y-4 text-lg text-gray-300">
        <li className="flex items-start">
          <DollarSign className="mr-3 text-pink-400 w-6 h-6" />
          Unlock a new revenue stream beyond in-app purchases or pop-ups.
        </li>
        <li className="flex items-start">
          <Zap className="mr-3 text-pink-400 w-6 h-6" />
          Easy SDK integration — minimal setup, maximum impact.
        </li>
        <li className="flex items-start">
          <Handshake className="mr-3 text-pink-400 w-6 h-6" />
          Transparent payouts & full control over campaigns.
        </li>
      </ul>
      <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition">
        Start Monetizing
      </button>
    </div>

    {/* Right: Icon Block */}
    <div className="flex justify-center">
      <div className="w-80 h-80 bg-gradient-to-tr from-pink-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
        <Zap className="w-32 h-32 text-white" />
      </div>
    </div>
  </div>
</section>


      <section className="py-20 px-6 bg-black text-white">
  <h3 className="text-3xl font-bold text-center mb-12">By the Numbers</h3>

  {/* Main Stat Highlight */}
  <div className="max-w-4xl mx-auto text-center mb-16">
    <p className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
    95% Viewability
  </p>
  <p className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
    93% Completion
  </p>
  <p className="text-xl text-gray-300">
    </p>
    <p className="text-xl text-gray-300">
      Burger King’s in-game ad campaigns achieved <span className="font-semibold text-white">95% viewability</span> 
      and <span className="font-semibold text-white">93% video completion</span> — 
      significantly outperforming industry benchmarks. Their gamification strategies boosted 
      visit frequency and customer spending.
    </p>
    <p className="mt-4 text-sm text-gray-500 italic">
      Source: <a href="https://portuma.com/case-studies/burger-king/" target="_blank" className="underline hover:text-gray-300">Portuma Case Study</a>
    </p>
  </div>

  {/* Secondary 3 Stats */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
    {/* Stat 1 */}
    <div>
      <p className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        81%
      </p>
      <p className="text-lg text-gray-300">
        of consumers research products online before purchasing in-store.
      </p>
      <p className="mt-2 text-sm text-gray-500 italic">
        Source: Gitnux, 2025
      </p>
    </div>

    {/* Stat 2 */}
    <div>
      <p className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
        70%
      </p>
      <p className="text-lg text-gray-300">
        of shoppers say personalized experiences increase likelihood to buy.
      </p>
      <p className="mt-2 text-sm text-gray-500 italic">
        Source: Zipdo, 2025
      </p>
    </div>

    {/* Stat 3 */}
    <div>
      <p className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        300%
      </p>
      <p className="text-lg text-gray-300">
        higher revenue for brands that integrate multiple marketing channels.
      </p>
      <p className="mt-2 text-sm text-gray-500 italic">
        Source: WorldMetrics, 2025
      </p>
    </div>
  </div>
</section>



      {/* Closing CTA */}
      <section className="py-20 px-6 bg-gradient-to-t from-gray-900 to-black text-center">
        <h3 className="text-3xl font-bold mb-4">Join the Future of Advertising</h3>
        <p className="text-gray-300 mb-8">
          Unlock new revenue and reach millions of players. Get started today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 text-lg"
            onClick={() => (window.location.href = "/brands")}
          >
            For Brands
          </Button>
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 text-lg"
            onClick={() => (window.location.href = "/creators")}
          >
            For Creators
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 px-6 bg-black border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Immersive Ads. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="mailto:info@immersive-ads.com">Contact</a>
        </div>
      </footer>
    </main>
  );
}
