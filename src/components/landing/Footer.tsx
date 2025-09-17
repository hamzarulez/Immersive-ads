import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900/50 text-neutral-400 py-12 px-6">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <Gamepad2 className="h-6 w-6 text-white" />
            <span className="font-bold text-lg text-white">Immersive Ads</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Immersive Ads. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6 mt-6 md:mt-0 text-sm">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          
          {/* --- ADD THIS NEW LINK --- */}
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}