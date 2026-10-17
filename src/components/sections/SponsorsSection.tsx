"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronsRight, Sparkles } from "lucide-react";
import { CricketBall3D } from "@/components/3d/CricketBall3D";
import { LEFT_SPONSORS, RIGHT_SPONSORS, SponsorItem } from "@/data/sponsors";

function SponsorCard({ item }: { item: SponsorItem }) {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-slate-100 bg-white/70 hover:bg-white hover:border-[#FF4B03]/30 hover:shadow-md transition-all duration-300 group min-h-[72px] sm:min-h-[88px] text-center w-full">
      <span className="font-forma text-xs sm:text-sm md:text-base font-extrabold text-slate-800 tracking-wider uppercase group-hover:text-[#FF4B03] transition-colors leading-tight">
        {item.name}
      </span>
      {item.subtext && (
        <span className="font-forma text-[9px] sm:text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">
          {item.subtext}
        </span>
      )}
      {item.category && (
        <span className="font-forma text-[8px] sm:text-[9px] text-slate-400 font-medium tracking-tight mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {item.category}
        </span>
      )}
    </div>
  );
}

export function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollableDistance = section.offsetHeight - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate progress 0 -> 1 within this 200vh section
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-[#FFFFFF] text-[#0A0E1A] select-none z-10"
    >
      {/* Pinned 100vh Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between border-t border-slate-200">
        {/* Subtle geometric dot grid watermark */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
            backgroundSize: "36px 36px",
            backgroundPosition: "0 0, 18px 18px"
          }}
        />

        {/* 3-Column Layout with Vertical Architectural Dividers */}
        <div className="relative z-10 w-full h-full flex flex-row">
          {/* ============================================================== */}
          {/* COLUMN 1: LEFT SPONSORS (Translates up on scroll)              */}
          {/* ============================================================== */}
          <div className="hidden md:flex flex-col w-[26%] lg:w-[28%] xl:w-[29%] h-full border-r border-slate-200/90 relative overflow-hidden px-3 lg:px-6">
            <div
              className="w-full flex flex-col gap-3.5 py-8 transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateY(-${scrollProgress * 42}%)`
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                {LEFT_SPONSORS.map((item) => (
                  <SponsorCard key={item.id} item={item} />
                ))}
              </div>
              {/* Duplicate set for endless vertical scrolling effect */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {LEFT_SPONSORS.slice(0, 8).map((item) => (
                  <SponsorCard key={`dup-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMN 2: CENTER PINNED 3D CRICKET BALL & HEADLINE             */}
          {/* ============================================================== */}
          <div className="flex-1 flex flex-col items-center justify-between h-full py-6 sm:py-8 md:py-10 px-4 relative">
            {/* Top Headline (Yellow/Orange gradient matching Nick Ho reference) */}
            <div className="flex flex-col items-center text-center z-20">
              <span className="font-forma text-[10px] sm:text-xs font-bold tracking-[0.28em] text-[#FF4B03] uppercase mb-1">
                GLOBAL COMMERCIAL PARTNERS
              </span>
              <h2 className="font-redzone text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFCB05] via-[#FF8800] to-[#E64200]">
                MORE FOCUSED, MORE COMPLETE.
              </h2>
            </div>

            {/* 3D Red Season Cricket Ball (Rotates around its axis on scroll) */}
            <div className="relative w-full flex-1 max-w-[480px] lg:max-w-[560px] max-h-[50vh] sm:max-h-[54vh] md:max-h-[58vh] flex items-center justify-center my-auto z-10">
              <CricketBall3D scrollProgress={scrollProgress} />
            </div>

            {/* Bottom CTA & Compass/Star Icon */}
            <div className="flex flex-col items-center gap-3 z-20">
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[#FFCB05] via-[#FFA000] to-[#FF4B03] text-black font-forma text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>BECOME PARTNER</span>
                <ChevronsRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* Decorative Four-Point Compass Star matching reference */}
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#FF4B03] shadow-sm">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMN 3: RIGHT SPONSORS (Translates up on scroll)             */}
          {/* ============================================================== */}
          <div className="hidden md:flex flex-col w-[26%] lg:w-[28%] xl:w-[29%] h-full border-l border-slate-200/90 relative overflow-hidden px-3 lg:px-6">
            <div
              className="w-full flex flex-col gap-3.5 py-8 transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translateY(-${scrollProgress * 42}%)`
              }}
            >
              <div className="grid grid-cols-2 gap-3">
                {RIGHT_SPONSORS.map((item) => (
                  <SponsorCard key={item.id} item={item} />
                ))}
              </div>
              {/* Duplicate set for endless vertical scrolling effect */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                {RIGHT_SPONSORS.slice(0, 8).map((item) => (
                  <SponsorCard key={`dup-${item.id}`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only Sponsor Strip beneath the ball */}
        <div className="md:hidden w-full overflow-hidden border-t border-slate-200 bg-slate-50/80 py-2.5 px-3 z-20">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {LEFT_SPONSORS.concat(RIGHT_SPONSORS)
              .slice(0, 10)
              .map((item) => (
                <div
                  key={`mob-${item.id}`}
                  className="shrink-0 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-center"
                >
                  <span className="font-forma text-[11px] font-extrabold text-slate-800">
                    {item.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
