"use client";

import NextLink from "next/link"; // Use Next.js link for external/different pages
import { Link as ScrollLink } from "react-scroll"; // Use react-scroll for same-page scrolling
import { Button } from "../../components/ui/button";
import { Gamepad2 } from "lucide-react";

export default function Header() {
  const scrollProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -80, // Adjust this offset to account for the header's height
  };

  return (
    <header className="sticky top-0 z-50 w-full py-6">
      <div className="container mx-auto px-6 flex justify-center">
        <nav className="bg-neutral-900/50 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2 sm:space-x-4">
          <NextLink href="/" className="px-1" aria-label="Homepage">
            <Gamepad2 className="h-6 w-6 text-white" />
          </NextLink>

          {/* --- UPDATED SCROLL LINKS --- */}
          <ScrollLink 
            to="dashboard" 
            {...scrollProps}
            className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer"
          >
            Dashboard
          </ScrollLink>
          <ScrollLink 
            to="features" 
            {...scrollProps}
            className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer"
          >
            Features
          </ScrollLink>
          <ScrollLink 
            to="contact" 
            {...scrollProps}
            className="hidden sm:block text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer"
          >
            Contact
          </ScrollLink>
          
          <Button asChild size="sm" className="bg-white text-black hover:bg-neutral-200 rounded-full px-4">
            {/* This button still uses NextLink because it might go to a different page */}
            <NextLink href="/contact">Book a Demo</NextLink>
          </Button>
        </nav>
      </div>
    </header>
  );
}