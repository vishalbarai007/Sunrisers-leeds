"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playing11Cards, PlayerData } from "@/data/playing11";
import { ArrowUpRight, Trophy } from "lucide-react";

export function Playing11Section() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0 || !containerRef.current || !pinRef.current) return;

    // Set initial card stacking: Card 0 is at yPercent: 0, Cards 1..5 at yPercent: 100
    cards.forEach((card, i) => {
      if (i > 0) {
        gsap.set(card, { yPercent: 100 });
      } else {
        gsap.set(card, { yPercent: 0 });
      }
    });

    const totalTransitions = cards.length - 1; // 5 transitions
    // "each 50vh scroll will change the card to next"
    const scrollDistance = totalTransitions * (window.innerHeight * 0.5);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: pinRef.current,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate active card index (0 to 5) with precise thresholding
            const progress = self.progress;
            const step = Math.min(
              cards.length - 1,
              Math.floor(progress * cards.length + 0.05)
            );
            setActiveCardIndex(step);
          }
        }
      });

      // Animate each subsequent card to slide up and cover the current card
      for (let i = 1; i < cards.length; i++) {
        const card = cards[i];
        const innerPlayer = card.querySelectorAll(".player-cutout");
        const innerText = card.querySelectorAll(".card-text-block");

        tl.to(
          card,
          {
            yPercent: 0,
            ease: "power2.inOut",
            duration: 1
          },
          (i - 1) * 1 // sequential time slots
        );

        // Subtle lift parallax on the player cutouts inside each card
        if (innerPlayer.length > 0) {
          tl.fromTo(
            innerPlayer,
            { y: 35, opacity: 0.85 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.6 },
            (i - 1) * 1 + 0.25
          );
        }

        if (innerText.length > 0) {
          tl.fromTo(
            innerText,
            { y: 15, opacity: 0.8 },
            { y: 0, opacity: 1, ease: "power1.out", duration: 0.5 },
            (i - 1) * 1 + 0.2
          );
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="playing-11"
      className="relative w-full bg-[#070A12] select-none"
    >
      {/* Pinned Viewport Container (h-screen) */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* CARDS STACK */}
        {playing11Cards.map((card, index) => {
          const isWhite = card.theme === "white";
          const isSolo = card.players.length === 1;

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{ zIndex: 10 + index * 5 }}
              className={`absolute inset-0 h-full w-full flex flex-col justify-between overflow-hidden shadow-2xl transition-colors ${
                isWhite
                  ? "bg-[#FFFFFF] text-[#0A0E1A]"
                  : "bg-gradient-to-br from-[#E64200] via-[#FF5500] to-[#BA2300] text-white"
              }`}
            >
              {/* Subtle Architectural Grid Lines from Footer for orange cards */}
              {!isWhite && (
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
              )}

              {/* Subtle background sports watermark / contour lines */}
              <div
                className={`absolute inset-0 pointer-events-none opacity-[0.03] ${
                  isWhite ? "mix-blend-multiply" : "mix-blend-overlay"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
                  backgroundSize: "36px 36px",
                  backgroundPosition: "0 0, 18px 18px"
                }}
              />

              {/* TOP EDITORIAL HEADER (Matches Cadillac F1 "A TALE OF TWO ICONS" / "EXCELLENCE IN RESERVE") */}
              {/* Added generous pt-20 sm:pt-24 md:pt-28 to ensure clean clearance below the fixed navbar */}
              <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-20 sm:pt-24 md:pt-28 flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4 card-text-block">
                {/* Left Header info */}
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        isWhite ? "bg-[#FF4B03]" : "bg-white"
                      }`}
                    />
                    <span
                      className={`font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] ${
                        isWhite ? "text-[#FF4B03]" : "text-white/80"
                      }`}
                    >
                      {card.category}
                    </span>
                  </div>

                  <h2
                    className={`font-redzone text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none ${
                      isWhite ? "text-[#0A0E1A]" : "text-white"
                    }`}
                  >
                    {card.headline}
                  </h2>

                  <p
                    className={`font-forma text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-1 ${
                      isWhite ? "text-slate-500" : "text-white/80"
                    }`}
                  >
                    {card.subhead}
                  </p>
                </div>

                {/* Right narrative description (Cadillac F1 editorial paragraph) */}
                <div className="max-w-md hidden md:block text-right">
                  <p
                    className={`font-forma text-xs sm:text-[13px] leading-relaxed ${
                      isWhite ? "text-slate-600" : "text-white/85"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>

              {/* CENTER STAGE: ATHLETE CUTOUTS & CADILLAC F1 MICRO-DATA METADATA */}
              <div className="relative z-10 flex-1 w-full px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-center min-h-0">
                {isSolo ? (
                  /* CARD 1: SOLO CAPTAIN PAT CUMMINS */
                  <SoloCaptainLayout player={card.players[0]} isWhite={isWhite} />
                ) : (
                  /* CARDS 2-6: DUAL PLAYERS (Head & Abhishek, Klaasen & Kishan, etc.) */
                  <DualPlayerLayout
                    player1={card.players[0]}
                    player2={card.players[1]}
                    isWhite={isWhite}
                  />
                )}
              </div>

              {/* BOTTOM FOOTER OF CARD (Micro details + Mobile description) */}
              <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-5 sm:pb-7 flex items-end justify-between">
                {/* Left: Squad watermark / branding */}
                <div className="flex flex-col">
                  <span
                    className={`font-redzone text-xs sm:text-sm font-black uppercase tracking-wider ${
                      isWhite ? "text-[#0A0E1A]/40" : "text-white/40"
                    }`}
                  >
                    SUNRISERS LEEDS &bull; MATCHDAY XI
                  </span>
                  <span
                    className={`font-forma text-[10px] tracking-widest uppercase font-semibold ${
                      isWhite ? "text-slate-400" : "text-white/60"
                    }`}
                  >
                    OFFICIAL SQUAD LINEUP 2026
                  </span>
                </div>

                {/* Mobile-only narrative display */}
                <div className="max-w-xs md:hidden pr-20">
                  <p
                    className={`font-forma text-[10px] line-clamp-2 ${
                      isWhite ? "text-slate-500" : "text-white/80"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* BOTTOM-RIGHT FIXED COUNTER HUD (Cadillac F1 Card Counter) */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-4 sm:bottom-6 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#070A12]/90 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-2xl pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#FF4B03] animate-pulse" />
          <span className="font-forma text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-slate-300">
            CARD
          </span>
          <div className="font-mono text-xs sm:text-sm md:text-base font-black tracking-widest text-white flex items-center">
            <span className="text-[#FF4B03]">
              {String(activeCardIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/70">
              {String(playing11Cards.length).padStart(2, "0")}
            </span>
          </div>

          {/* Mini progress dots */}
          <div className="hidden sm:flex items-center gap-1 ml-1.5 pl-2 border-l border-white/20">
            {playing11Cards.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === i
                    ? "w-4 bg-[#FF4B03]"
                    : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// SOLO CAPTAIN COMPONENT (CARD 1 - PAT CUMMINS)
// --------------------------------------------------------------------------
function SoloCaptainLayout({
  player,
  isWhite
}: {
  player: PlayerData;
  isWhite: boolean;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-4 sm:gap-6 lg:gap-8 h-full">
      {/* Left Column: Key Stats & Leadership Highlights */}
      <div className="hidden md:flex md:col-span-3 flex-col justify-center space-y-5 text-left card-text-block">
        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            ROLE & SPECIALISM
          </span>
          <p
            className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player.role}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            BOWLING STYLE
          </span>
          <p
            className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player.bowlingStyle}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            GLOBAL RANKING
          </span>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#FF4B03]" />
            <p
              className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider ${
                isWhite ? "text-[#0A0E1A]" : "text-white"
              }`}
            >
              {player.ranking}
            </p>
          </div>
        </div>
      </div>

      {/* Center Stage: Pat Cummins Cutout & Link */}
      <div className="md:col-span-6 flex flex-col items-center justify-center relative player-cutout h-full">
        {/* Subtle radial aura behind captain */}
        <div
          className={`absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none opacity-40 -z-10 ${
            isWhite ? "bg-[#FF4B03]/15" : "bg-black/30"
          }`}
        />

        <Link
          href={player.link}
          className="group relative flex flex-col items-center cursor-pointer"
          title={`View full profile for ${player.name}`}
        >
          {/* Athlete Image Container */}
          <div className="relative w-56 sm:w-72 md:w-80 lg:w-96 h-[44vh] sm:h-[48vh] md:h-[52vh] transition-transform duration-500 group-hover:scale-105">
            <Image
              src={player.imageUrl}
              alt={player.name}
              fill
              priority
              sizes="(max-width: 768px) 280px, 420px"
              className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]"
            />
          </div>

          {/* Under Athlete Name & Jersey Tag (Cadillac F1 S.PEREZ 11 format) */}
          <div className="mt-2 text-center flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span
                className={`font-redzone text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider ${
                  isWhite ? "text-[#0A0E1A]" : "text-white"
                }`}
              >
                {player.shortName}
              </span>
              <span className="font-redzone text-2xl sm:text-3xl md:text-4xl font-black text-[#FF4B03]">
                {player.jersey}
              </span>
              <ArrowUpRight
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isWhite ? "text-[#FF4B03]" : "text-white"
                }`}
              />
            </div>
            <span
              className={`font-forma text-[10px] tracking-[0.25em] uppercase font-bold ${
                isWhite ? "text-slate-400" : "text-white/70"
              }`}
            >
              CLICK TO VIEW PROFILE
            </span>
          </div>
        </Link>
      </div>

      {/* Right Column: Micro metadata block */}
      <div className="hidden md:flex md:col-span-3 flex-col justify-center space-y-5 text-right card-text-block">
        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            NATIONALITY
          </span>
          <p
            className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player.nationality}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            BORN IN / AGE
          </span>
          <p
            className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player.bornIn} &bull; {player.age}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-1 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            CAREER RECORDS
          </span>
          <p
            className={`font-forma text-xs sm:text-sm font-black uppercase tracking-wider leading-snug ${
              isWhite ? "text-[#FF4B03]" : "text-white"
            }`}
          >
            {player.records}
          </p>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// DUAL PLAYER COMPONENT (CARDS 2 TO 6 - 2 PLAYERS EACH)
// --------------------------------------------------------------------------
function DualPlayerLayout({
  player1,
  player2,
  isWhite
}: {
  player1: PlayerData;
  player2: PlayerData;
  isWhite: boolean;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-2 sm:gap-4 lg:gap-6 h-full">
      {/* LEFT ATHLETE METADATA COLUMN (Cadillac F1 Left Athlete Data) */}
      <div className="hidden md:flex md:col-span-2 flex-col justify-center space-y-4 text-left card-text-block">
        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            NAME
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player1.name}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            ROLE
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player1.role}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            BORN IN / AGE
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player1.bornIn}
          </p>
          <span
            className={`font-forma text-[11px] font-semibold uppercase ${
              isWhite ? "text-slate-500" : "text-white/80"
            }`}
          >
            {player1.age}
          </span>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            KEY RECORD
          </span>
          <p
            className={`font-forma text-xs font-black uppercase tracking-wide leading-tight ${
              isWhite ? "text-[#FF4B03]" : "text-white"
            }`}
          >
            {player1.records}
          </p>
        </div>
      </div>

      {/* CENTER ATHLETES STAGE: TWO ATHLETE CUTOUTS SIDE-BY-SIDE */}
      <div className="md:col-span-8 grid grid-cols-2 gap-2 sm:gap-6 lg:gap-10 items-end justify-center player-cutout h-full pb-2">
        {/* ATHLETE 1 (Left Player) */}
        <Link
          href={player1.link}
          className="group relative flex flex-col items-center cursor-pointer"
          title={`View full profile for ${player1.name}`}
        >
          <div className="relative w-36 sm:w-56 md:w-64 lg:w-72 h-[40vh] sm:h-[46vh] md:h-[50vh] transition-transform duration-500 group-hover:scale-105">
            <Image
              src={player1.imageUrl}
              alt={player1.name}
              fill
              priority
              sizes="(max-width: 768px) 180px, 320px"
              className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Under Athlete Athletic Typography (Cadillac F1 S.PEREZ 11) */}
          <div className="mt-2 text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`font-redzone text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider ${
                  isWhite ? "text-[#0A0E1A]" : "text-white"
                }`}
              >
                {player1.shortName}
              </span>
              <span className="font-redzone text-lg sm:text-2xl md:text-3xl font-black text-[#FF4B03]">
                {player1.jersey}
              </span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isWhite ? "text-[#FF4B03]" : "text-white"
                }`}
              />
            </div>
            <span
              className={`font-forma text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold ${
                isWhite ? "text-slate-400" : "text-white/70"
              }`}
            >
              {player1.role}
            </span>
          </div>
        </Link>

        {/* ATHLETE 2 (Right Player) */}
        <Link
          href={player2.link}
          className="group relative flex flex-col items-center cursor-pointer"
          title={`View full profile for ${player2.name}`}
        >
          <div className="relative w-36 sm:w-56 md:w-64 lg:w-72 h-[40vh] sm:h-[46vh] md:h-[50vh] transition-transform duration-500 group-hover:scale-105">
            <Image
              src={player2.imageUrl}
              alt={player2.name}
              fill
              priority
              sizes="(max-width: 768px) 180px, 320px"
              className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Under Athlete Athletic Typography (Cadillac F1 V.BOTTAS 77) */}
          <div className="mt-2 text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`font-redzone text-lg sm:text-2xl md:text-3xl font-black uppercase tracking-wider ${
                  isWhite ? "text-[#0A0E1A]" : "text-white"
                }`}
              >
                {player2.shortName}
              </span>
              <span className="font-redzone text-lg sm:text-2xl md:text-3xl font-black text-[#FF4B03]">
                {player2.jersey}
              </span>
              <ArrowUpRight
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                  isWhite ? "text-[#FF4B03]" : "text-white"
                }`}
              />
            </div>
            <span
              className={`font-forma text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold ${
                isWhite ? "text-slate-400" : "text-white/70"
              }`}
            >
              {player2.role}
            </span>
          </div>
        </Link>
      </div>

      {/* RIGHT ATHLETE METADATA COLUMN (Cadillac F1 Right Athlete Data) */}
      <div className="hidden md:flex md:col-span-2 flex-col justify-center space-y-4 text-right card-text-block">
        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            NAME
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player2.name}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            ROLE
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player2.role}
          </p>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            BORN IN / AGE
          </span>
          <p
            className={`font-forma text-xs sm:text-[13px] font-black uppercase tracking-wider ${
              isWhite ? "text-[#0A0E1A]" : "text-white"
            }`}
          >
            {player2.bornIn}
          </p>
          <span
            className={`font-forma text-[11px] font-semibold uppercase ${
              isWhite ? "text-slate-500" : "text-white/80"
            }`}
          >
            {player2.age}
          </span>
        </div>

        <div>
          <span
            className={`font-forma text-[9px] uppercase tracking-[0.2em] font-bold block mb-0.5 ${
              isWhite ? "text-slate-400" : "text-white/60"
            }`}
          >
            KEY RECORD
          </span>
          <p
            className={`font-forma text-xs font-black uppercase tracking-wide leading-tight ${
              isWhite ? "text-[#FF4B03]" : "text-white"
            }`}
          >
            {player2.records}
          </p>
        </div>
      </div>
    </div>
  );
}
