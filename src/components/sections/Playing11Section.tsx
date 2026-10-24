"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { playing11Cards, allPlayers, PlayerData } from "@/data/playing11";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Shield } from "lucide-react";

export function Playing11Section() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Mobile slider state (1 player per card, left/right buttons, no scroll hijack)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);

  const handleMobilePrev = () => {
    setMobileDirection(-1);
    setMobileIndex((prev) => (prev === 0 ? allPlayers.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    setMobileDirection(1);
    setMobileIndex((prev) => (prev === allPlayers.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only apply GSAP scroll pinning on desktop (md breakpoint: >= 768px)
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0 || !containerRef.current || !pinRef.current) return;

    // Reveal from bottom to top (umagobeverages.com style):
    // Slide 0 is fully visible (inset: 0% 0% 0% 0%), subsequent slides are clipped from bottom to top (inset: 100% 0% 0% 0%)
    slides.forEach((slide, i) => {
      if (i > 0) {
        gsap.set(slide, {
          clipPath: "inset(100% 0% 0% 0%)",
          zIndex: 10 + i,
          opacity: 1
        });
      } else {
        gsap.set(slide, {
          clipPath: "inset(0% 0% 0% 0%)",
          zIndex: 10,
          opacity: 1
        });
      }
    });

    const totalTransitions = slides.length - 1; // 3 transitions for 4 slides
    // Time taken by each slide on scroll: 50vh (window.innerHeight * 0.5)
    const scrollDistance = totalTransitions * (window.innerHeight * 0.5);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: pinRef.current,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(
              slides.length - 1,
              Math.floor(self.progress * slides.length + 0.05)
            );
            setActiveCardIndex(step);
          }
        }
      });

      // Animate each subsequent slide to unmask/reveal from bottom to top (NO fade)
      for (let i = 1; i < slides.length; i++) {
        tl.fromTo(
          slides[i],
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            duration: 1
          },
          i - 1
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const activeMobilePlayer = allPlayers[mobileIndex] || allPlayers[0];

  return (
    <section
      ref={containerRef}
      id="playing-11"
      className="relative w-full bg-[#070A12] select-none"
    >
      {/* =========================================================================
          DESKTOP & TABLET VIEW (md and up): GSAP PINNED BOTTOM-TO-TOP REVEAL
          Each slide has 3 players + center Visit Players Page button
         ========================================================================= */}
      <div
        ref={pinRef}
        className="hidden md:block relative h-screen w-full overflow-hidden"
      >
        {playing11Cards.map((card, cardIdx) => {
          const isWhite = card.theme === "white";

          return (
            <div
              key={card.id}
              ref={(el) => {
                slidesRef.current[cardIdx] = el;
              }}
              style={{ zIndex: 10 + cardIdx }}
              className={`absolute inset-0 h-full w-full flex flex-col justify-between overflow-hidden shadow-2xl ${
                isWhite
                  ? "bg-[#FFFFFF] text-[#0A0E1A]"
                  : "bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white"
              }`}
            >
              {/* Subtle Architectural Grid Lines */}
              {!isWhite && (
                <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="border-r border-white/[0.08] h-full" />
                  <div className="h-full" />
                </div>
              )}

              {/* Dotted Grid Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0"
                style={{
                  backgroundImage:
                    "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
                  backgroundSize: "36px 36px",
                  backgroundPosition: "0 0, 18px 18px"
                }}
              />

              {/* TOP HEADER BAR */}
              <div className="relative z-10 w-full px-8 lg:px-14 xl:px-20 pt-6 lg:pt-8 flex items-center justify-between border-b border-current/10">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] lg:text-xs font-redzone font-bold uppercase tracking-wider ${
                      isWhite
                        ? "bg-[#FF4E03] text-white"
                        : "bg-white text-[#D93800]"
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    <span>{card.category}</span>
                  </span>
                  <span className="font-redzone text-xs lg:text-sm font-bold uppercase tracking-widest opacity-70">
                    SQUAD CHAPTER 0{cardIdx + 1}
                  </span>
                </div>

                <div className="text-right">
                  <h2
                    className={`font-redzone font-black text-xl lg:text-2xl uppercase tracking-wider ${
                      isWhite ? "text-[#0A0E1A]" : "text-white"
                    }`}
                  >
                    {card.headline}
                  </h2>
                  <p
                    className={`font-forma text-xs lg:text-[13px] opacity-75 max-w-md ml-auto truncate ${
                      isWhite ? "text-slate-600" : "text-white/80"
                    }`}
                  >
                    {card.subhead}
                  </p>
                </div>
              </div>

              {/* 3 PLAYERS DESKTOP STAGE: LEFT, CENTER (WITH CTA), RIGHT */}
              <div className="relative z-10 flex-1 grid grid-cols-3 gap-6 lg:gap-10 items-end px-8 lg:px-16 xl:px-24 pb-6">
                {card.players.map((player, pIdx) => {
                  const isCenter = pIdx === 1;

                  return (
                    <div
                      key={player.id}
                      className={`relative flex flex-col items-center justify-end h-full ${
                        isCenter ? "z-20" : "z-10"
                      }`}
                    >
                      {/* PLAYER CUTOUT IMAGE (Substantially Increased Size) */}
                      <div
                        className={`relative w-full flex items-end justify-center transition-transform duration-500 hover:scale-105 ${
                          isCenter
                            ? "h-[54vh] lg:h-[60vh] xl:h-[64vh]"
                            : "h-[48vh] lg:h-[54vh] xl:h-[58vh]"
                        }`}
                      >
                        <Image
                          src={player.imageUrl}
                          alt={player.name}
                          fill
                          priority={cardIdx === 0}
                          sizes="(max-width: 1024px) 33vw, 420px"
                          className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                        />
                      </div>

                      {/* PLAYER DETAILS BLOCK */}
                      <div
                        className={`w-full text-center mt-2.5 flex flex-col items-center ${
                          isCenter ? "pt-1" : ""
                        }`}
                      >
                        {/* Short Name & Jersey */}
                        <div className="flex items-center justify-center gap-2">
                          <h3
                            className={`font-redzone font-black uppercase tracking-tight leading-none ${
                              isCenter
                                ? "text-xl lg:text-2xl xl:text-3xl"
                                : "text-lg lg:text-xl xl:text-2xl"
                            } ${isWhite ? "text-[#0A0E1A]" : "text-white"}`}
                          >
                            {player.name}
                          </h3>
                          <span className="font-redzone font-black text-sm lg:text-base text-[#FF4E03]">
                            #{player.jersey}
                          </span>
                        </div>

                        {/* Role & Records Badges */}
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`font-redzone text-[10px] lg:text-xs font-bold uppercase tracking-wider ${
                              isWhite ? "text-[#FF4E03]" : "text-white/90"
                            }`}
                          >
                            {player.role}
                          </span>
                          <span className="opacity-40">&bull;</span>
                          <span
                            className={`font-forma text-[10px] lg:text-xs truncate max-w-[200px] ${
                              isWhite ? "text-slate-600" : "text-white/70"
                            }`}
                          >
                            {player.ranking}
                          </span>
                        </div>

                        {/* BUTTON TO VISIT PLAYERS PAGE (RIGHT BELOW CENTER PLAYER NAME) */}
                        {isCenter && (
                          <div className="mt-3.5 z-30">
                            <Link
                              href="/players"
                              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] hover:brightness-110 text-white font-redzone font-black text-xs lg:text-sm uppercase tracking-wider shadow-2xl transition-all hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
                              title="Visit full Sunrisers Leeds Squad page"
                            >
                              <span>VISIT PLAYERS PAGE</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTTOM FOOTER BAR */}
              <div className="relative z-10 w-full px-8 lg:px-14 xl:px-20 pb-5 flex items-center justify-between border-t border-current/10">
                <span
                  className={`font-redzone text-xs font-black uppercase tracking-wider ${
                    isWhite ? "text-[#0A0E1A]/50" : "text-white/50"
                  }`}
                >
                  SUNRISERS LEEDS &bull; MATCHDAY PLAYING 11
                </span>

                <span
                  className={`font-forma text-xs font-semibold ${
                    isWhite ? "text-slate-500" : "text-white/60"
                  }`}
                >
                  SCROLL TO EXPLORE SQUAD
                </span>
              </div>
            </div>
          );
        })}

        {/* BOTTOM-RIGHT CLEAN COUNTER PILL */}
        <div className="absolute right-8 bottom-5 z-50 flex items-center gap-2 bg-[#070A12]/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-2xl pointer-events-none">
          <div className="font-redzone text-xs sm:text-sm font-black tracking-wider text-white flex items-center">
            <span className="text-[#FF4E03]">{activeCardIndex + 1}</span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/60">{playing11Cards.length}</span>
          </div>

          <div className="flex items-center gap-1 ml-1.5 pl-2 border-l border-white/20">
            {playing11Cards.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === i ? "w-4 bg-[#FF4E03]" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW (< md): NORMAL SLIDER (NOT ON SCROLL)
          1 player per card, left/right buttons, enlarged image + Visit Players Page
         ========================================================================= */}
      <div className="block md:hidden relative w-full min-h-[92vh] px-4 py-12 flex flex-col justify-between bg-gradient-to-b from-[#0A0E1A] via-[#0E1424] to-[#070A12] text-white">
        {/* MOBILE SECTION TITLE */}
        <div className="text-center pb-4 border-b border-white/10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FF4E03] animate-pulse" />
            <span className="font-redzone text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4E03]">
              OFFICIAL SQUAD
            </span>
          </div>
          <h2 className="font-redzone text-3xl font-black uppercase tracking-wider text-white">
            PLAYING 11
          </h2>
        </div>

        {/* SINGLE PLAYER CARD WITH ANIMATED TRANSITION */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={mobileDirection}>
            <motion.div
              key={activeMobilePlayer.id}
              custom={mobileDirection}
              initial={{ opacity: 0, x: mobileDirection * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -mobileDirection * 60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center text-center"
            >
              {/* ENLARGED PLAYER CUTOUT IMAGE FOR MOBILE */}
              <div className="relative w-full h-[46vh] max-h-[420px] flex items-end justify-center">
                <Image
                  src={activeMobilePlayer.imageUrl}
                  alt={activeMobilePlayer.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* PLAYER METADATA */}
              <div className="w-full mt-4 space-y-1.5 px-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FF4E03]/20 border border-[#FF4E03]/40 text-[#FF4E03] font-redzone text-[11px] font-bold tracking-wider uppercase">
                  JERSEY #{activeMobilePlayer.jersey} &bull; {activeMobilePlayer.role}
                </span>

                <h3 className="font-redzone font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight">
                  {activeMobilePlayer.name}
                </h3>

                <p className="font-forma text-xs text-white/70 max-w-xs mx-auto line-clamp-1">
                  {activeMobilePlayer.ranking} &bull; {activeMobilePlayer.records}
                </p>

                {/* VISIT PLAYERS PAGE BUTTON FOR EACH PLAYER CARD */}
                <div className="pt-3">
                  <Link
                    href="/players"
                    className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-6 rounded-lg bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white font-redzone font-black text-xs uppercase tracking-wider shadow-xl border border-white/20 active:scale-95 transition-all"
                  >
                    <span>VISIT PLAYERS PAGE</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* MOBILE NAVIGATION CONTROLS (PREV, COUNTER, NEXT) */}
        <div className="w-full pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleMobilePrev}
            aria-label="Previous player"
            className="w-11 h-11 rounded-lg border border-white/20 bg-white/5 hover:bg-[#FF4E03] text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="font-redzone text-sm font-black tracking-widest text-white flex items-center gap-1">
            <span className="text-[#FF4E03]">
              {String(mobileIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">
              {String(allPlayers.length).padStart(2, "0")}
            </span>
          </div>

          <button
            onClick={handleMobileNext}
            aria-label="Next player"
            className="w-11 h-11 rounded-lg border border-white/20 bg-white/5 hover:bg-[#FF4E03] text-white transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
