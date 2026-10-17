"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { mainNavItems } from "@/data/navigation";
import { X, Flame, ArrowUpRight } from "lucide-react";

export function HeroNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-40 px-6 sm:px-10 py-6 flex items-center justify-between">
        {/* Brand Logo (Left Top) */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#FF4B03] to-[#FF8D35] flex items-center justify-center shadow-[0_0_20px_rgba(255,75,3,0.5)] group-hover:scale-105 transition-transform duration-300">
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl font-black text-white tracking-wider uppercase leading-none">
              SUNRISERS
            </span>
            <span className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FF4B03] leading-tight">
              LEEDS CRICKET
            </span>
          </div>
        </Link>

        {/* Square Hamburger Menu (Right Top - like Nick Ho) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          className="relative w-12 h-12 rounded-lg bg-[#FF4B03] hover:bg-[#FF6B00] active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(255,75,3,0.4)] group cursor-pointer"
        >
          <span className="w-5 h-[2.5px] bg-[#070A12] rounded-full transition-transform duration-300" />
          <span className="w-5 h-[2.5px] bg-[#070A12] rounded-full transition-transform duration-300" />
        </button>
      </header>

      {/* Full-Screen Overlay Navigation Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#070A12]/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-8 sm:p-14 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#FF4B03] flex items-center justify-center">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-heading text-lg font-black text-white uppercase tracking-wider">
              {siteConfig.name}
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-12 h-12 rounded-lg border border-white/20 hover:border-[#FF4B03] text-white hover:text-[#FF4B03] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full my-auto py-12">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#FF4B03] block mb-6">
              Navigation
            </span>
            <ul className="space-y-4">
              {mainNavItems.map((item, idx) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex items-center gap-4 text-3xl sm:text-5xl font-heading font-black text-white hover:text-[#FF4B03] uppercase tracking-wide transition-colors"
                  >
                    <span className="text-sm font-forma font-normal text-slate-500 group-hover:text-[#FF4B03]">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#FF4B03] block mb-4">
                Home Ground
              </span>
              <h3 className="font-heading text-2xl font-bold text-white uppercase mb-2">
                Headingley Stadium
              </h3>
              <p className="font-forma text-sm text-slate-400 leading-relaxed mb-6">
                St Michael’s Lane, Headingley, Leeds LS6 3BU, United Kingdom.
              </p>

              <a
                href="https://tickets.sunrisers.uk/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#FF4B03] hover:bg-[#FF6B00] text-white font-forma font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,75,3,0.4)] transition-all"
              >
                <span>Book Match Tickets</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-8">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 block mb-3">
                Connect With The Orange Army
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-forma text-slate-300">
                <a href={siteConfig.contact.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#FF4B03] transition-colors">
                  Instagram
                </a>
                <span>&bull;</span>
                <a href={siteConfig.contact.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-[#FF4B03] transition-colors">
                  Twitter
                </a>
                <span>&bull;</span>
                <a href={siteConfig.contact.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-[#FF4B03] transition-colors">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer inside menu */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-forma text-slate-500 pt-6 border-t border-white/10 gap-2">
          <span>&copy; {new Date().getFullYear()} SunRisers Leeds. All rights reserved.</span>
          <span>Designed with High Performance Engine</span>
        </div>
      </div>
    </>
  );
}
