"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroNav } from "@/components/reusable/HeroNav";
import { heroData } from "@/data/hero";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: "04",
    hours: "18",
    minutes: "32",
    seconds: "10"
  });

  useEffect(() => {
    // Ticking countdown effect
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
          end: "+=120%",
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // 1. Center LEEDS text zooms and floats up with dramatic opacity fade
      if (centerTextRef.current) {
        tl.to(
          centerTextRef.current,
          {
            scale: 1.35,
            y: -100,
            opacity: 0.18,
            ease: "power1.out"
          },
          0
        );
      }

      // 2. Parallax depth on team background image
      if (imageRef.current) {
        tl.to(
          imageRef.current,
          {
            y: 70,
            scale: 1.08,
            ease: "none"
          },
          0
        );
      }

      // 3. Left stats & bio column drifts upward and fades out
      if (leftColRef.current) {
        tl.to(
          leftColRef.current,
          {
            y: -130,
            opacity: 0,
            ease: "power2.out"
          },
          0
        );
      }

      // 4. Right details & countdown drifts upward and fades out
      if (rightColRef.current) {
        tl.to(
          rightColRef.current,
          {
            y: -130,
            opacity: 0,
            ease: "power2.out"
          },
          0
        );
      }

      // 5. Scroll cue fades immediately
      if (scrollCueRef.current) {
        tl.to(
          scrollCueRef.current,
          {
            opacity: 0,
            y: -20,
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
      ref={heroRef}
      className="relative w-full h-screen min-h-[750px] bg-[#070A12] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Header / Navigation Overlay */}
      <HeroNav />

      {/* 2. Vertical Architectural Grid Lines (Direct inspiration from Nick Ho bg_lines_wrapper) */}
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
          className="object-cover object-center filter grayscale contrast-125 brightness-[0.72]"
        />

        {/* Cinematic Sports Vignette & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-[#070A12]/80" />
        <div className="absolute inset-0 bg-radial-[at_50%_40%] from-transparent via-[#070A12]/40 to-[#070A12]" />
        {/* Subtle orange ambient glow from bottom-center */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[70vw] h-[300px] bg-[#FF4B03]/15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* 4. Giant Center "LEEDS" Typography (Replaces "98" from Nick Ho) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] px-4 overflow-hidden">
        <h1
          ref={centerTextRef}
          className="font-redzone text-[22vw] sm:text-[20vw] lg:text-[18vw] font-black uppercase tracking-tighter text-white/90 leading-none select-none text-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] will-change-transform"
          style={{ letterSpacing: "-0.04em" }}
        >
          {heroData.centerText}
        </h1>
      </div>

      {/* 5. Main Hero Content Grid (Left & Right Data) */}
      <div className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 pt-28 pb-10 flex flex-col justify-between pointer-events-none">
        {/* Top Split: Left Stats & Right Ethos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
          {/* Left Stats Column (Matches Played, Won, Win Rate) */}
          <div ref={leftColRef} className="space-y-6 max-w-sm pointer-events-auto">
            {heroData.leftStats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="font-redzone text-4xl sm:text-5xl font-black text-white tracking-tight leading-none group-hover:text-[#FF4B03] transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="font-forma text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Right Details Column (Quote, Ground, Format, Experience) */}
          <div ref={rightColRef} className="text-left md:text-right space-y-6 max-w-md ml-auto pointer-events-auto">
            <p className="font-forma text-sm sm:text-base font-normal text-slate-300 leading-relaxed italic">
              &ldquo;{heroData.tagline}. {heroData.subheadline}&rdquo;
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <div className="font-forma text-xs uppercase tracking-wider text-slate-500">
                  Home Ground
                </div>
                <div className="font-heading text-lg sm:text-xl font-bold text-white uppercase flex items-center md:justify-end gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#FF4B03]" />
                  <span>{heroData.rightInfo.venue}</span>
                </div>
                <div className="font-forma text-xs text-slate-400">
                  {heroData.rightInfo.city}
                </div>
              </div>

              <div>
                <div className="font-forma text-xs uppercase tracking-wider text-slate-500">
                  Competition Format
                </div>
                <div className="font-forma text-sm font-bold text-white uppercase mt-0.5">
                  {heroData.rightInfo.format}
                </div>
                <div className="font-forma text-xs text-[#FF4B03]">
                  {heroData.rightInfo.experience}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split: Team Bio (Left) & Next Fixture Countdown (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-12 border-t border-white/[0.08]">
          {/* Bottom Left: Team Title, Ethos & Partners */}
          <div className="max-w-lg pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B03]/15 border border-[#FF4B03]/30 text-[#FF4B03] text-[10px] font-forma font-bold uppercase tracking-widest mb-3">
              <span>Official Sports Club</span>
            </div>
            <h2 className="font-redzone text-3xl sm:text-4xl font-black text-white tracking-wider uppercase leading-none mb-3">
              {heroData.teamName}
            </h2>
            <p className="font-forma text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-none">
              {heroData.quote}
            </p>
            {/* Sponsor marks strip */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-forma font-bold text-slate-500 uppercase tracking-widest">
              {heroData.partners.map((partner, i) => (
                <span key={partner} className="flex items-center gap-3">
                  <span className="hover:text-slate-300 transition-colors">{partner}</span>
                  {i < heroData.partners.length - 1 && (
                    <span className="text-white/20">&bull;</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Right: Next Match Card with Live Countdown */}
          <div className="md:ml-auto pointer-events-auto">
            <div className="p-5 rounded-xl border border-white/10 bg-[#0A0E1A]/80 backdrop-blur-md shadow-2xl max-w-sm w-full">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FF4B03] text-[#070A12] text-[10px] font-forma font-black uppercase tracking-wider">
                  <Calendar className="w-3 h-3" />
                  <span>Next Fixture</span>
                </span>
                <span className="text-[11px] font-forma font-semibold text-slate-400">
                  {heroData.rightInfo.nextMatch.venue}
                </span>
              </div>

              <div className="font-redzone text-2xl font-black text-white uppercase tracking-wide mb-3">
                {heroData.rightInfo.nextMatch.opponent}
              </div>

              {/* Countdown Ticker Blocks */}
              <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-white/10">
                <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                  <div className="font-redzone text-xl font-bold text-white leading-tight">
                    {timeLeft.days}
                  </div>
                  <div className="font-forma text-[9px] uppercase tracking-wider text-slate-500">
                    Days
                  </div>
                </div>
                <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                  <div className="font-redzone text-xl font-bold text-white leading-tight">
                    {timeLeft.hours}
                  </div>
                  <div className="font-forma text-[9px] uppercase tracking-wider text-slate-500">
                    Hours
                  </div>
                </div>
                <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                  <div className="font-redzone text-xl font-bold text-white leading-tight">
                    {timeLeft.minutes}
                  </div>
                  <div className="font-forma text-[9px] uppercase tracking-wider text-slate-500">
                    Mins
                  </div>
                </div>
                <div className="bg-[#070A12]/90 rounded-md py-1.5 px-1 border border-white/5">
                  <div className="font-redzone text-xl font-bold text-[#FF4B03] leading-tight">
                    {timeLeft.seconds}
                  </div>
                  <div className="font-forma text-[9px] uppercase tracking-wider text-slate-500">
                    Secs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Subtle Scroll Indicator Cue */}
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
