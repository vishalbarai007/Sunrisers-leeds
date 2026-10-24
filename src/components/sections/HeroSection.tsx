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
      className="relative w-full h-[100dvh] lg:h-screen min-h-[640px] sm:min-h-[700px] lg:min-h-[750px] bg-[#070A12] overflow-hidden select-none"
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
      <div className="absolute inset-x-0 top-[40%] sm:top-[44%] lg:top-1/2 -translate-y-1/2 z-20 px-4 sm:px-8 md:px-12 lg:px-[60px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3.5 sm:gap-5 lg:gap-0 pointer-events-none">
        {/* LEFT STATS COLUMN (Matches played, won, win rate - vertically centered at leftmost side on desktop, 3-col row on mobile/tablet) */}
        <div
          ref={leftColRef}
          className="order-2 lg:order-1 w-full max-w-md sm:max-w-xl lg:max-w-none lg:w-[260px] shrink-0 grid grid-cols-3 lg:block gap-2 sm:gap-6 lg:gap-0 lg:space-y-8 text-center lg:text-left pointer-events-auto"
        >
          {heroData.leftStats.map((stat) => (
            <div key={stat.label} className="group">
              <div className="font-redzone text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-none group-hover:text-[#FF4B03] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="font-forma text-[9px] sm:text-[11px] lg:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-slate-400 mt-1 sm:mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CENTER: GIANT LEEDS TYPOGRAPHY (Vertically centered, in center between left and right) */}
        <div className="order-1 lg:order-2 w-full lg:w-auto lg:flex-1 flex items-center justify-center px-2 sm:px-6 overflow-visible pointer-events-none">
          <h1
            ref={centerTextRef}
            className="font-redzone text-[22vw] sm:text-[18vw] md:text-[17vw] lg:text-[18vw] font-black uppercase tracking-tighter text-white/95 leading-none select-none text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] will-change-transform origin-center"
            style={{ letterSpacing: "-0.04em" }}
          >
            {heroData.centerText}
          </h1>
        </div>

        {/* RIGHT DETAILS COLUMN (Motto, Ground, Format - vertically centered at rightmost side on desktop) */}
        <div
          ref={rightColRef}
          className="order-3 w-full max-w-md sm:max-w-xl lg:max-w-none lg:w-[320px] shrink-0 flex flex-col sm:flex-row lg:block items-center justify-between gap-2 sm:gap-6 lg:gap-0 text-center sm:text-left lg:text-right lg:space-y-6 pointer-events-auto"
        >
          <p className="font-forma text-[11px] sm:text-xs md:text-sm lg:text-[15px] font-normal text-slate-200 leading-snug sm:leading-relaxed italic text-center sm:text-left lg:text-right max-w-xs sm:max-w-sm lg:max-w-none">
            &ldquo;{heroData.tagline}. <br /> {heroData.subheadline}&rdquo;
          </p>

          <div className="space-y-1 lg:space-y-4 pt-0.5 lg:pt-1 shrink-0 text-center sm:text-right">
            <div>
              {/* <div className="font-forma text-[9px] sm:text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-500">
                Home Ground
              </div> */}
              {/* <div className="font-heading text-xs sm:text-base md:text-lg lg:text-xl font-bold text-white uppercase flex items-center justify-center sm:justify-end gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4B03] shrink-0" />
                <span>{heroData.rightInfo.venue}</span>
              </div> */}
              {/* <div className="font-forma text-[10px] sm:text-xs text-slate-400">
                {heroData.rightInfo.city}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM SECTION (EXTREME CORNERS WITH P-15 / 60PX SPACING ON DESKTOP) */}
      <div className="absolute inset-x-0 bottom-10 sm:bottom-11 md:bottom-12 lg:bottom-[50px] z-20 px-4 sm:px-8 md:px-12 lg:px-[60px] flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 sm:gap-4 pointer-events-none">
        {/* Bottom-Left Corner: Official Sports Club badge, Title, Ethos & Partners */}
        <div
          ref={bottomLeftRef}
          className="max-w-sm sm:max-w-[260px] md:max-w-sm lg:max-w-md text-center sm:text-left pointer-events-auto"
        >
          <h2 className="font-redzone text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-wider uppercase leading-none mb-1.5 sm:mb-2">
            {heroData.teamName}
          </h2>
          {/* Sponsor marks strip */}
          {/* <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 text-[9px] sm:text-[11px] font-forma font-bold text-slate-500 uppercase tracking-widest">
            {heroData.partners.map((partner, i) => (
              <span key={partner} className="flex items-center gap-2 sm:gap-2.5">
                <span className="hover:text-slate-300 transition-colors">{partner}</span>
                {i < heroData.partners.length - 1 && (
                  <span className="text-white/20">&bull;</span>
                )}
              </span>
            ))}
          </div> */}
        </div>

        {/* Bottom-Right Corner: Next Fixture Card with Live Ticking Countdown */}
        <div
          ref={bottomRightRef}
          className="w-full max-w-[300px] sm:max-w-[270px] md:max-w-xs lg:max-w-sm sm:ml-auto pointer-events-auto"
        >
          <div className="relative overflow-hidden p-2.5 sm:p-3.5 md:p-4 lg:p-5 rounded-xl border border-white/20 bg-[#0A0E1A]/40 backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.2)] w-full transition-all duration-300 hover:border-white/30">
            {/* Top specular highlight for authentic glass finish */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-1.5 sm:mb-2.5">
              <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded bg-[#FF4B03] text-[#070A12] text-[9px] sm:text-[10px] font-redzone font-black uppercase tracking-wider shadow-sm">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>Next Fixture</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-forma font-semibold text-slate-300 truncate">
                {heroData.rightInfo.nextMatch.venue}
              </span>
            </div>

            <div className="font-redzone text-base sm:text-xl lg:text-2xl font-black text-white uppercase tracking-wide mb-1.5 sm:mb-2.5">
              {heroData.rightInfo.nextMatch.opponent}
            </div>

            {/* Countdown Ticker Blocks */}
            {/* <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center pt-1.5 sm:pt-2 border-t border-white/10">
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-md py-1 sm:py-1.5 px-1 border border-white/10">
                <div className="font-redzone text-sm sm:text-lg lg:text-xl font-bold text-white leading-tight">
                  {timeLeft.days}
                </div>
                <div className="font-forma text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400">
                  Days
                </div>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-md py-1 sm:py-1.5 px-1 border border-white/10">
                <div className="font-redzone text-sm sm:text-lg lg:text-xl font-bold text-white leading-tight">
                  {timeLeft.hours}
                </div>
                <div className="font-forma text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400">
                  Hours
                </div>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-md py-1 sm:py-1.5 px-1 border border-white/10">
                <div className="font-redzone text-sm sm:text-lg lg:text-xl font-bold text-white leading-tight">
                  {timeLeft.minutes}
                </div>
                <div className="font-forma text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400">
                  Mins
                </div>
              </div>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-md py-1 sm:py-1.5 px-1 border border-white/10">
                <div className="font-redzone text-sm sm:text-lg lg:text-xl font-bold text-[#FF4B03] leading-tight">
                  {timeLeft.seconds}
                </div>
                <div className="font-forma text-[7px] sm:text-[8px] uppercase tracking-wider text-slate-400">
                  Secs
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* 6. Subtle Scroll Indicator Cue (Bottom Center) */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1 opacity-70"
      >
        <span className="font-redzone text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-[#FF4B03] animate-bounce" />
      </div>
    </section>
  );
}
