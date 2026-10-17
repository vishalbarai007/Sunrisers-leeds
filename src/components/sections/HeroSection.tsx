"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroData } from "@/data/hero";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: "04",
    hours: "18",
    minutes: "32",
    seconds: "10"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(now.getTime() + (4 * 24 * 60 * 60 + 18 * 60 * 60 + 32 * 60) * 1000);
      const diff = Math.max(0, target.getTime() - now.getTime());

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0")
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger Animation (Matches nickho-motorsports.nl pinned depth scroll)
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=160px",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            window.dispatchEvent(
              new CustomEvent("hero-scrolled-change", { detail: { isPastHero: true } })
            );
          },
          onEnterBack: () => {
            window.dispatchEvent(
              new CustomEvent("hero-scrolled-change", { detail: { isPastHero: false } })
            );
          }
        }
      });

      // 1. Center LEEDS scales up with fade effect, fading away as it enlarges
      if (centerTextRef.current) {
        tl.to(
          centerTextRef.current,
          {
            scale: 8,
            opacity: 0,
            ease: "power2.inOut"
          },
          0
        );
      }

      // 2. Parallax depth on team background image
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          {
            scale: 1.15,
            opacity: 0.25,
            ease: "none"
          },
          0
        );
      }

      // 3. Left stats column slides far away to the left off-screen
      if (leftColRef.current) {
        tl.to(
          leftColRef.current,
          {
            x: -400,
            opacity: 0,
            ease: "power2.in"
          },
          0
        );
      }

      // 4. Right details column slides far away to the right off-screen
      if (rightColRef.current) {
        tl.to(
          rightColRef.current,
          {
            x: 400,
            opacity: 0,
            ease: "power2.in"
          },
          0
        );
      }

      // 5. Bottom corners slide away downwards & outward off-screen
      if (bottomLeftRef.current) {
        tl.to(
          bottomLeftRef.current,
          {
            y: 180,
            x: -150,
            opacity: 0,
            ease: "power2.in"
          },
          0
        );
      }

      if (bottomRightRef.current) {
        tl.to(
          bottomRightRef.current,
          {
            y: 180,
            x: 150,
            opacity: 0,
            ease: "power2.in"
          },
          0
        );
      }

      // 6. Scroll cue fades immediately
      if (scrollCueRef.current) {
        tl.to(
          scrollCueRef.current,
          {
            opacity: 0,
            y: 60,
            ease: "power1.in"
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="relative w-full h-screen min-h-[750px] bg-[#070A12] overflow-hidden select-none"
    >
      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-10">
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="border-r border-white/[0.04] h-full" />
        <div className="hidden md:block border-r border-white/[0.04] h-full" />
        <div className="hidden md:block border-r border-white/[0.04] h-full" />
        <div className="hidden md:block border-r border-white/[0.04] h-full" />
        <div className="hidden md:block h-full" />
      </div>

      {/* 3. Team Photo Parallax Background Layer */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu will-change-transform"
      >
        <Image
          src={heroData.imageSrc}
          alt="Sunrisers Leeds Cricket Team Celebrating"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125 brightness-[0.68]"
        />

        {/* Cinematic Dark Sports Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-[#070A12]/75" />
        <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-[#070A12]/30 to-[#070A12]" />
        {/* Subtle orange ambient glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[70vw] h-[260px] bg-[#FF4B03]/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* 4. MAIN MIDDLE ROW (VERTICALLY CENTERED: Left Stats <---> Center LEEDS <---> Right Details) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6 sm:px-10 md:px-[60px] flex items-center justify-between pointer-events-none">
        {/* LEFT STATS COLUMN (Matches played, won, win rate - vertically centered at leftmost side) */}
        <div
          ref={leftColRef}
          className="w-[170px] sm:w-[220px] lg:w-[260px] shrink-0 space-y-6 sm:space-y-8 pointer-events-auto"
        >
          {heroData.leftStats.map((stat) => (
            <div key={stat.label} className="group">
              <div className="font-redzone text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none group-hover:text-[#FF4B03] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="font-forma text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CENTER: GIANT LEEDS TYPOGRAPHY (Vertically centered, in center between left and right) */}
        <div className="flex-1 flex items-center justify-center px-2 sm:px-6 overflow-visible pointer-events-none">
          <h1
            ref={centerTextRef}
            className="font-redzone text-[15vw] sm:text-[16vw] lg:text-[18vw] font-black uppercase tracking-tighter text-white/95 leading-none select-none text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] will-change-transform origin-center"
            style={{ letterSpacing: "-0.04em" }}
          >
            {heroData.centerText}
          </h1>
        </div>

        {/* RIGHT DETAILS COLUMN (Motto, Ground, Format - vertically centered at rightmost side) */}
        <div
          ref={rightColRef}
          className="w-[200px] sm:w-[260px] lg:w-[320px] shrink-0 text-right space-y-5 sm:space-y-6 pointer-events-auto"
        >
          <p className="font-forma text-xs sm:text-sm lg:text-[15px] font-normal text-slate-200 leading-relaxed italic text-right">
            &ldquo;{heroData.tagline}. {heroData.subheadline}&rdquo;
          </p>

          <div className="space-y-4 pt-1">
            <div>
              <div className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                Home Ground
              </div>
              <div className="font-heading text-sm sm:text-lg lg:text-xl font-bold text-white uppercase flex items-center justify-end gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4B03] shrink-0" />
                <span>{heroData.rightInfo.venue}</span>
              </div>
              <div className="font-forma text-[11px] sm:text-xs text-slate-400">
                {heroData.rightInfo.city}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM SECTION (EXTREME CORNERS WITH P-15 / 60PX SPACING) */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-[50px] z-20 px-6 sm:px-10 md:px-[60px] flex items-end justify-between pointer-events-none">
        {/* Bottom-Left Corner: Official Sports Club badge, Title, Ethos & Partners */}
        <div
          ref={bottomLeftRef}
          className="max-w-sm sm:max-w-md pointer-events-auto"
        >
          <h2 className="font-redzone text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wider uppercase leading-none mb-2">
            {heroData.teamName}
          </h2>
          {/* <p className="font-forma text-xs sm:text-sm text-slate-400 leading-relaxed mb-3 line-clamp-2">
            {heroData.quote}
          </p> */}
          {/* Sponsor marks strip */}
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] font-forma font-bold text-slate-500 uppercase tracking-widest">
            {heroData.partners.map((partner, i) => (
              <span key={partner} className="flex items-center gap-2.5">
                <span className="hover:text-slate-300 transition-colors">{partner}</span>
                {i < heroData.partners.length - 1 && (
                  <span className="text-white/20">&bull;</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom-Right Corner: Next Fixture Card with Live Ticking Countdown */}
        <div
          ref={bottomRightRef}
          className="ml-auto pointer-events-auto hidden sm:block"
        >
          <div className="p-4 sm:p-5 rounded-xl border border-white/10 bg-[#0A0E1A]/85 backdrop-blur-md shadow-2xl max-w-xs sm:max-w-sm w-full">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FF4B03] text-[#070A12] text-[10px] font-forma font-black uppercase tracking-wider">
                <Calendar className="w-3 h-3" />
                <span>Next Fixture</span>
              </span>
              <span className="text-[11px] font-forma font-semibold text-slate-400">
                {heroData.rightInfo.nextMatch.venue}
              </span>
            </div>

            <div className="font-redzone text-xl sm:text-2xl font-black text-white uppercase tracking-wide mb-2.5">
              {heroData.rightInfo.nextMatch.opponent}
            </div>

            {/* Countdown Ticker Blocks */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-white/10">
              <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                <div className="font-redzone text-lg sm:text-xl font-bold text-white leading-tight">
                  {timeLeft.days}
                </div>
                <div className="font-forma text-[8px] uppercase tracking-wider text-slate-500">
                  Days
                </div>
              </div>
              <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                <div className="font-redzone text-lg sm:text-xl font-bold text-white leading-tight">
                  {timeLeft.hours}
                </div>
                <div className="font-forma text-[8px] uppercase tracking-wider text-slate-500">
                  Hours
                </div>
              </div>
              <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                <div className="font-redzone text-lg sm:text-xl font-bold text-white leading-tight">
                  {timeLeft.minutes}
                </div>
                <div className="font-forma text-[8px] uppercase tracking-wider text-slate-500">
                  Mins
                </div>
              </div>
              <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                <div className="font-redzone text-lg sm:text-xl font-bold text-[#FF4B03] leading-tight">
                  {timeLeft.seconds}
                </div>
                <div className="font-forma text-[8px] uppercase tracking-wider text-slate-500">
                  Secs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Subtle Scroll Indicator Cue (Bottom Center) */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 opacity-70"
      >
        <span className="font-forma text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-[#FF4B03] animate-bounce" />
      </div>
    </section>
  );
}
