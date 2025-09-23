"use client";

import NextLink from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "../../components/ui/button";
import { Gamepad2 } from "lucide-react";
import { usePathname } from 'next/navigation'; // Import usePathname hook

export default function Header() {
  const pathname = usePathname(); // Get the current URL path
  const isHomePage = pathname === '/'; // Check if we are on the homepage

  const scrollProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -80,
  };

  // Define the navigation links
  const navLinks = (
    <>
      {isHomePage ? (
        <>
          <ScrollLink to="dashboard" {...scrollProps} className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer">
            Dashboard
          </ScrollLink>
          <ScrollLink to="features" {...scrollProps} className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer">
            Features
          </ScrollLink>
          <ScrollLink to="contact" {...scrollProps} className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1 cursor-pointer">
            Contact
          </ScrollLink>
        </>
      ) : (
        // On other pages, these links should go back to the homepage sections
        <>
          <NextLink href="/#dashboard" className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1">Dashboard</NextLink>
          <NextLink href="/#features" className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1">Features</NextLink>
          <NextLink href="/#contact" className="text-sm text-neutral-300 hover:text-white transition-colors px-2 py-1">Contact</NextLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full py-6">
      <div className="container mx-auto px-6 flex justify-center">
        <nav className="bg-neutral-900/50 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2 sm:space-x-4">
          <NextLink href="/" className="px-1" aria-label="Homepage">
            <Gamepad2 className="h-6 w-6 text-white" />
          </NextLink>
          
          <div className="hidden sm:flex items-center space-x-2">
            {navLinks}
          </div>
          
          {/* --- NEW SIGN IN / SIGN UP BUTTONS --- */}
          <div className="flex items-center space-x-2">
            <NextLink href="/login" className="text-sm text-neutral-300 hover:text-white transition-colors px-3 py-1">
              Sign In
            </NextLink>
            <Button asChild size="sm" className="bg-pink-500 hover:bg-pink-600 rounded-full px-4">
              <NextLink href="/signup">Sign Up</NextLink>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}