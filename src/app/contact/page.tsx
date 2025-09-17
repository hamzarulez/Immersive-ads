"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Building, User, ChevronsRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import Footer from "../../components/landing/Footer";
import Header from "../../components/landing/Header";

// Reusable Input component for the form
const FormInput = ({ icon, ...props }: any) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
    />
  </div>
);

// Reusable Textarea component
const FormTextarea = ({ icon, ...props }: any) => (
  <div className="relative">
    <div className="absolute top-3.5 left-0 flex items-center pl-3 pointer-events-none">
        {icon}
    </div>
    <textarea
        {...props}
        className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow min-h-[120px]"
    />
  </div>
);

export default function ContactPage() {
  return (
    <div className="bg-black text-white">
      <Header />
      <main className="pt-24 sm:pt-32">
        <section className="py-24 px-6">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Let's Build the Future of In-Game Ads
              </h1>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                Whether you're a brand ready to launch a campaign or a creator with questions, we're here to help you get started.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left Side: Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-pink-400">Contact Information</h2>
                <p className="text-neutral-400 mb-8">
                  Have a quick question? Email is the best way to reach us for general inquiries and partnership opportunities. For specific campaign or monetization questions, please use the form.
                </p>
                <a href="mailto:info@immersive-ads.com" className="inline-flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-900 transition-colors">
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <span className="font-semibold">info@immersive-ads.com</span>
                </a>
              </motion.div>

              {/* Right Side: Contact Form */}
              <motion.div
                className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* --- UPDATED FORM TAG --- */}
                <form 
                  action="https://formspree.io/f/xqadvbko" // <-- PASTE YOUR URL HERE
                  method="POST" 
                  className="space-y-6"
                >
                  <FormInput icon={<User size={16} className="text-neutral-500" />} type="text" name="name" placeholder="Full Name" required />
                  <FormInput icon={<Mail size={16} className="text-neutral-500" />} type="email" name="email" placeholder="Email Address" required />
                  <FormInput icon={<Building size={16} className="text-neutral-500" />} type="text" name="company" placeholder="Company / Studio Name (Optional)" />
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ChevronsRight size={16} className="text-neutral-500" />
                    </div>
                    <select 
                        name="role" 
                        required 
                        defaultValue=""
                        className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow appearance-none"
                    >
                        <option value="" disabled>I am a...</option>
                        <option value="brand">Brand / Advertiser</option>
                        <option value="creator">Game Creator</option>
                        <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <FormTextarea icon={<MessageSquare size={16} className="text-neutral-500" />} name="message" placeholder="Your Message" required />
                  
                  <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 py-3 text-base font-semibold">
                    Send Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}