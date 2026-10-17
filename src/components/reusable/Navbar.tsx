"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { mainNavItems } from "@/data/navigation";
import { X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Monitor window scroll state
  // Monitor hero scroll state: transparent on hero section, changes color only after hero is completely scrolled
  useEffect(() => {
    // 1. Listen for custom event dispatched from HeroSection GSAP ScrollTrigger
    const handleHeroChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPastHero: boolean }>;
      setIsScrolled(customEvent.detail.isPastHero);
    };

    // 2. Direct scroll check: only active after hero is completely scrolled past (~150px-160px)
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener("hero-scrolled-change", handleHeroChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("hero-scrolled-change", handleHeroChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll and handle Escape key when full-screen menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* 
        Main Navigation Bar:
        - When at top (initial): 100% transparent background, only 3 items (Hamburger, Logo, Contact)
        - When scrolled: Orange gradient background, white text font, center logo hangs down as seen in image 3
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 overflow-visible ${
          isScrolled
            ? "bg-gradient-to-r from-[#D93800] via-[#F4570B] to-[#D93800] shadow-[0_6px_25px_rgba(217,56,0,0.35)] border-b border-[#FF7324]/40 h-16 sm:h-20"
            : "bg-transparent border-b border-transparent h-20 sm:h-24"
        }`}
      >
        <div className="relative w-full h-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* 1. Leftmost Item: Hamburger Menu Button (copying reference newhum-one / nickho-motorsports) */}
          <div className="flex-1 flex items-center justify-start z-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded py-2 pr-3 cursor-pointer select-none transition-transform active:scale-95"
            >
              <div className="flex flex-col justify-center gap-1.5 w-6 h-5">
                <span className="block h-[2.5px] bg-white rounded-full transition-all duration-300 w-6 group-hover:w-4" />
                <span className="block h-[2.5px] bg-white rounded-full transition-all duration-300 w-4 group-hover:w-6" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] transition-colors duration-200 text-white group-hover:text-white/80 font-forma">
                Menu
              </span>
            </button>
          </div>

          {/* 
            2. Center Item: Logo with website URL (Home link)
            - Initial state: Centered cleanly in transparent header
            - Scrolled state: Hangs down over the bottom edge of the orange navbar as shown in reference image 3!
          */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-500 z-20 pointer-events-auto ${
              isScrolled
                ? "top-1.5 sm:top-2"
                : "top-1/2 -translate-y-1/2"
            }`}
          >
            <Link
              href="/"
              aria-label="Sunrisers Leeds Cricket Club Home"
              className="group flex items-center justify-center relative focus:outline-none"
            >
              <div
                className={`transition-all duration-500 ease-out flex items-center justify-center ${
                  isScrolled
                    ? "w-[125px] sm:w-[150px] md:w-[170px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] group-hover:scale-105"
                    : "w-[110px] sm:w-[135px] md:w-[155px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] group-hover:scale-105"
                }`}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Sunrisers Leeds Crest Logo"
                  width={152}
                  height={114}
                  priority
                  className="w-full h-auto object-contain select-none"
                />
              </div>
            </Link>
          </div>

          {/* 3. Rightmost Item: Contact Link */}
          <div className="flex-1 flex items-center justify-end z-10">
            <Link
              href="#contact"
              className="relative text-xs sm:text-sm font-bold uppercase tracking-[0.24em] transition-colors duration-200 text-white hover:text-white/85 py-1.5 group font-forma"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </header>

      {/* 
        Full-Screen Overlay Navigation Menu:
        - Orange gradient background
        - White text typography
        - Original full-color Sunrisers Leeds crest logo
        - 8 architectural vertical grid lines
        - Staggered entrance animation with rotation & delay (copied from nickho-motorsports.nl)
        - Hover dim effect on sibling menu items
        - Navitems: Tickets, Squads, Fixtures, Spotlight, News, Gallery, Profile
      */}
      <div
        id="fullscreen-menu-overlay"
        className={`fixed inset-0 z-[100] w-screen h-screen bg-gradient-to-br from-[#FF4E03] via-[#FF6200] to-[#CF2E00] fullscreen-menu-tile ${
          menuOpen ? "is-active pointer-events-auto" : "pointer-events-none"
        }`}
        data-navigation-status={menuOpen ? "active" : "not-active"}
      >
        {/* Architectural vertical grid lines in white */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
          <div className="border-r border-white/[0.08] h-full" />
          <div className="border-r border-white/[0.08] h-full" />
          <div className="border-r border-white/[0.08] h-full" />
          <div className="border-r border-white/[0.08] h-full" />
          <div className="hidden md:block border-r border-white/[0.08] h-full" />
          <div className="hidden md:block border-r border-white/[0.08] h-full" />
          <div className="hidden md:block border-r border-white/[0.08] h-full" />
          <div className="hidden md:block h-full" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-y-auto">
          {/* Top Bar inside Menu */}
          <div className="w-full flex items-center justify-between">
            {/* Original Full-Color Brand Logo inside Menu (Left) */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="w-12 sm:w-14 h-auto flex items-center justify-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo.svg"
                  alt="Sunrisers Leeds"
                  width={152}
                  height={114}
                  priority
                  className="w-full h-auto object-contain"
                />
              </div>
              <span className="font-heading text-lg sm:text-2xl font-black text-white uppercase tracking-wider hidden sm:inline leading-none drop-shadow-sm">
                SUNRISERS LEEDS
              </span>
            </Link>

            {/* Close Button 'X' (Right, like Nick Ho) */}
            <button
              id="menu-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black/40 hover:bg-black/70 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all duration-300 shadow-xl group active:scale-95"
            >
              <X className="w-6 h-6 text-white transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>

          {/* 
            Center Navigation Items:
            - Tickets, Squads, Fixtures, Spotlight, News, Gallery, Profile
            - Large bold condensed font in pure white
            - Staggered animated reveal
            - Dimming on hover: all sibling items fade to 20% opacity while hovered item is 100% white
          */}
          <div className="my-auto py-8 sm:py-10 flex flex-col items-center justify-center text-center w-full">
            <ul className="menu-nav-list flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 w-full">
              {mainNavItems.map((item, idx) => (
                <li
                  key={item.label}
                  className="menu-item-wrapper overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="menu-item-link overflow-hidden">
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative inline-flex items-center justify-center font-redzone text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black uppercase text-white tracking-tight leading-[1.05] select-none py-1 transition-transform drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                    >
                      {/* Dual text roll hover effect */}
                      <div className="relative h-[1.1em] overflow-hidden">
                        <span className="menu-text-roll">
                          <span className="block">{item.label}</span>
                          <span className="block text-white/95">{item.label}</span>
                        </span>
                      </div>

                      {/* Animated Diamond Sparkle Badge on Active/Hovered item */}
                      {hoveredIdx === idx && (
                        <span className="absolute -left-7 sm:-left-9 text-white animate-pulse hidden md:inline-flex">
                          <Sparkles className="w-5 h-5 fill-current drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                        </span>
                      )}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Bar inside Menu: Socials & Email */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/20 text-xs sm:text-sm font-forma font-bold text-white">
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 uppercase tracking-[0.2em] text-white/90">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Instagram
              </a>
              <span className="opacity-40">&bull;</span>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:underline underline-offset-4 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Twitter
              </a>
              <span className="opacity-40 hidden sm:inline">&bull;</span>
              <a
                href="mailto:info@sunrisersleeds.com"
                className="lowercase hover:text-white hover:underline underline-offset-4 transition-all tracking-normal"
              >
                info@sunrisersleeds.com
              </a>
            </div>

            <div className="text-[11px] font-normal text-white/70 tracking-wider">
              &copy; {new Date().getFullYear()} Sunrisers Leeds
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
