"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { mainNavItems } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Flame } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070A12]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E05A00] to-[#FFA040] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white uppercase block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B00]">
              Cricket Club
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#FF6B00] transition-colors font-semibold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="sunrisers" size="sm" className="text-xs uppercase tracking-wider font-bold">
            <Link href="#contact">Join Squad / Contact</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070A12] border-b border-slate-800 px-6 py-6 space-y-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-wider font-semibold text-slate-300 hover:text-[#FF6B00]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-800">
            <Button asChild variant="sunrisers" className="w-full text-xs uppercase tracking-wider font-bold">
              <Link href="#contact" onClick={() => setMobileOpen(false)}>
                Join Squad / Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
