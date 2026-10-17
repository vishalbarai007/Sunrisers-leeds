"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import {
  FIXTURES_DATA,
  FixtureItem,
  formatDateAndTime,
  formatDatePill,
  formatTeamDisplayName,
  getTeamLogoUrl,
  splitScheduledAt
} from "@/data/fixtures";

/**
 * Matches module 35881 on sunrisershyderabad.in:
 * Overflow-hidden container with vertical slide-in motion
 */
function SlideReveal({
  children,
  direction = "down",
  duration = 0.75,
  triggerKey
}: {
  children: React.ReactNode;
  direction?: "up" | "down";
  duration?: number;
  triggerKey?: string | number;
}) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        key={triggerKey}
        initial={{ y: direction === "up" ? "-100%" : "100%", opacity: 0.2 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FixturesSection() {
  const fixtures = FIXTURES_DATA;

  // Unique date keys in order
  const dates = useMemo(() => {
    const list: string[] = [];
    const seen = new Set<string>();
    fixtures.forEach((f) => {
      const { date } = splitScheduledAt(f.scheduledAt);
      if (date && !seen.has(date)) {
        list.push(date);
        seen.add(date);
      }
    });
    return list;
  }, [fixtures]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Embla carousel for the top date selector bar (align: center, loop: true like reference site)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance carousel every 3 seconds (3000ms)
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [emblaApi, isPaused, selectedIndex]);

  const handleSelectDate = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const activeDate = dates[selectedIndex] ?? dates[0];
  const activeFixture: FixtureItem = useMemo(() => {
    return (
      fixtures.find((f) => splitScheduledAt(f.scheduledAt).date === activeDate) ??
      fixtures[0]
    );
  }, [fixtures, activeDate]);

  const { date: fixtureDate, time: fixtureTime } = splitScheduledAt(
    activeFixture.scheduledAt
  );

  const homeLogo = getTeamLogoUrl(
    activeFixture.homeTeam.shortName,
    activeFixture.homeTeam.logoUrl
  );
  const awayLogo = getTeamLogoUrl(
    activeFixture.awayTeam.shortName,
    activeFixture.awayTeam.logoUrl
  );

  const homeScoreText = activeFixture.homeTeam.score
    ? `${activeFixture.homeTeam.score.runs}/${activeFixture.homeTeam.score.wickets}`
    : "--";
  const homeOversText = activeFixture.homeTeam.score
    ? `(${activeFixture.homeTeam.score.overs} Overs)`
    : "";

  const awayScoreText = activeFixture.awayTeam.score
    ? `${activeFixture.awayTeam.score.runs}/${activeFixture.awayTeam.score.wickets}`
    : "--";
  const awayOversText = activeFixture.awayTeam.score
    ? `(${activeFixture.awayTeam.score.overs} Overs)`
    : "";

  return (
    <section
      id="fixtures"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#FFFFFF] text-[#0A0E1A] flex flex-col items-center py-16 md:py-24 overflow-hidden select-none z-10 border-t border-slate-200"
    >
      {/* Subtle geometric dots watermark for white background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px"
        }}
      />

      {/* Heading (Black with Sunrisers Orange Gradient) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ease: "easeInOut", duration: 0.9 }}
        className="flex flex-col items-center text-center mb-6 md:mb-8 relative z-10"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FF4B03]" />
          <span className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FF4B03]">
            OFFICIAL 2026 MATCH CALENDAR
          </span>
        </div>
        <h2 className="font-redzone text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-[#0A0E1A]">
          MATCH{" "}
          <span className="bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] bg-clip-text text-transparent">
            FIXTURES
          </span>
        </h2>
      </motion.div>

      <div className="w-full overflow-hidden md:max-w-7xl md:mx-auto md:px-6 py-2 md:py-4 relative z-10">
        {/* Top Date Strip Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.1 }}
        >
          <div className="w-full flex items-center gap-0 md:gap-4 border-y border-slate-200 py-2.5 md:py-4">
            <button
              onClick={handlePrev}
              aria-label="Previous dates"
              className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white hover:brightness-110 shadow-md shadow-[#FF4E03]/35 transition-all flex items-center justify-center cursor-pointer active:scale-95 border border-white/20"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.4} />
            </button>

            <div className="w-full overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {dates.map((dateStr, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <div
                      key={`${dateStr}-${idx}`}
                      className="min-w-0 shrink-0 grow-0 basis-[42%] sm:basis-1/3 md:basis-1/5 flex justify-center px-2 sm:px-3 md:px-4 border-r border-slate-200"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSelectDate(idx)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectDate(idx);
                          }
                        }}
                        className={`w-full text-center md:rounded-lg md:px-3 lg:px-5 cursor-pointer transition-transform duration-300 ${
                          isActive ? "scale-105" : "hover:scale-[1.02]"
                        }`}
                      >
                        <div
                          className={`w-full rounded-lg py-2 px-2 transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white shadow-md border-transparent"
                              : "border border-slate-200 bg-white hover:border-[#FF4E03]/60 hover:bg-[#FFF8F4] text-slate-700"
                          }`}
                        >
                          <div
                            className={`text-[11px] sm:text-xs md:text-[13px] font-forma font-semibold tracking-wider uppercase whitespace-nowrap ${
                              isActive ? "text-white font-bold" : "text-slate-700"
                            }`}
                          >
                            {formatDatePill(dateStr)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next dates"
              className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white hover:brightness-110 shadow-md shadow-[#FF4E03]/35 transition-all flex items-center justify-center cursor-pointer active:scale-95 border border-white/20"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2.4} />
            </button>
          </div>
        </motion.div>

        {/* Main Fixture Card Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
          className="flex flex-col mt-8 md:mt-12 w-full items-center"
        >
          <div className="w-full flex items-center justify-center gap-3 md:gap-6 px-2 sm:px-4">
            {/* Desktop Left Arrow (Orange gradient, no grey bg) */}
            <button
              onClick={handlePrev}
              aria-label="Previous fixture"
              className="md:-mt-8 shrink-0 w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white hover:brightness-110 hover:scale-105 active:scale-95 transition-all hidden md:flex items-center justify-center shadow-md shadow-[#FF4E03]/35 cursor-pointer border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
            </button>

            {/* Center Fixture Card Wrapper */}
            <div className="w-full max-w-5xl flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFixture.id}
                  initial={{ opacity: 0.4, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0.4, x: -24 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full flex flex-col items-center"
                >
                  {/* Top Skewed Dark Venue Pill */}
                  {(activeFixture.venue || activeFixture.city) && (
                    <div className="w-fit max-w-[90%] md:max-w-[80%] text-center flex justify-center bg-[#0A0E1A] rounded-t-xl px-4 md:px-8 skew-x-[-3deg] md:skew-x-[-10deg] shadow-md border-t border-x border-[#0A0E1A]">
                      <SlideReveal
                        direction="down"
                        duration={0.7}
                        triggerKey={`venue-${activeFixture.id}`}
                      >
                        <div className="py-2 md:px-4 gap-2.5 w-full flex items-center justify-center skew-x-[3deg] md:skew-x-[10deg]">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#FF4E03]/25 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,78,3,0.4)]">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF4E03]" strokeWidth={2.6} />
                          </div>
                          <p className="text-white text-[11px] sm:text-xs md:text-[16px] font-forma font-semibold tracking-tight truncate">
                            {activeFixture.venue}
                          </p>
                        </div>
                      </SlideReveal>
                    </div>
                  )}

                  {/* Skewed Match Card (#FFF4ED warm cream/orange container with glowing VS.svg) */}
                  <div className="relative w-full px-1 sm:px-2">
                    {/* Center Glowing Diagonal VS Graphic */}
                    <Image
                      src="/images/VS.svg"
                      alt="VS"
                      width={240}
                      height={240}
                      className="block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[15vh] md:h-[28vh] w-auto z-10 pointer-events-none select-none opacity-80"
                    />

                    <div className="p-4 sm:p-6 md:p-10 w-full rounded-xl bg-gradient-to-r from-[#FFF5EE] via-[#FFEFE5] to-[#FFF5EE] border border-[#FF4E03]/30 overflow-hidden skew-x-[0deg] md:skew-x-[-10deg] shadow-xl">
                      <div className="relative z-10 flex flex-row items-center justify-between w-full skew-x-[0deg] md:skew-x-[10deg] gap-2 sm:gap-4 p-1 md:p-0">
                        {/* HOME TEAM (Left Half) */}
                        <div className="w-1/2 flex flex-col lg:flex-row items-center justify-start gap-2.5 lg:gap-6 md:pr-10 lg:pr-14">
                          {/* Animated Team Logo Circle */}
                          <div className="overflow-hidden rounded-full shrink-0">
                            <motion.div
                              key={`home-logo-${activeFixture.id}`}
                              className="bg-white rounded-full flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 p-2.5 md:p-4 overflow-hidden shrink-0 shadow-md border border-slate-200/80"
                              initial={{ y: "100%" }}
                              animate={{ y: "0%" }}
                              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.85 }}
                            >
                              <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                  src={homeLogo}
                                  alt={formatTeamDisplayName(activeFixture.homeTeam.name)}
                                  width={100}
                                  height={100}
                                  className={`w-full h-full object-contain ${
                                    activeFixture.homeTeam.shortName === "SRH" ? "pt-1.5" : ""
                                  }`}
                                />
                              </div>
                            </motion.div>
                          </div>

                          {/* Home Team Name & Score */}
                          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-1.5 lg:gap-4">
                            <div className="w-full">
                              <SlideReveal
                                direction="down"
                                duration={0.75}
                                triggerKey={`home-name-${activeFixture.id}`}
                              >
                                <h3 className="font-forma font-extrabold text-[#0A0E1A] text-sm sm:text-base md:text-[19px] leading-tight text-center lg:text-left">
                                  <span className="md:hidden">
                                    {activeFixture.homeTeam.shortName}
                                  </span>
                                  <span className="hidden md:inline">
                                    {formatTeamDisplayName(activeFixture.homeTeam.name)}
                                  </span>
                                </h3>
                              </SlideReveal>
                            </div>

                            <div className="flex flex-col items-center lg:items-end shrink-0">
                              <SlideReveal
                                direction="down"
                                duration={0.8}
                                triggerKey={`home-score-${activeFixture.id}`}
                              >
                                <div className="flex flex-col items-center">
                                  <span className="text-[#0A0E1A] font-forma font-extrabold text-sm sm:text-base md:text-lg leading-tight">
                                    {homeScoreText}
                                  </span>
                                  {homeOversText && (
                                    <span className="text-slate-500 font-forma font-medium text-[11px] sm:text-xs md:text-[13px] whitespace-nowrap">
                                      {homeOversText}
                                    </span>
                                  )}
                                </div>
                              </SlideReveal>
                            </div>
                          </div>
                        </div>

                        {/* AWAY TEAM (Right Half) */}
                        <div className="w-1/2 flex flex-col-reverse lg:flex-row items-center justify-end gap-2.5 lg:gap-6 md:pl-10 lg:pl-14">
                          {/* Away Team Score & Name */}
                          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-1.5 lg:gap-4">
                            <div className="flex flex-col items-center lg:items-start shrink-0">
                              <SlideReveal
                                direction="down"
                                duration={0.8}
                                triggerKey={`away-score-${activeFixture.id}`}
                              >
                                <div className="flex flex-col items-center">
                                  <span className="text-[#0A0E1A] font-forma font-extrabold text-sm sm:text-base md:text-lg leading-tight">
                                    {awayScoreText}
                                  </span>
                                  {awayOversText && (
                                    <span className="text-slate-500 font-forma font-medium text-[11px] sm:text-xs md:text-[13px] whitespace-nowrap">
                                      {awayOversText}
                                    </span>
                                  )}
                                </div>
                              </SlideReveal>
                            </div>

                            <div className="w-full">
                              <SlideReveal
                                direction="down"
                                duration={0.75}
                                triggerKey={`away-name-${activeFixture.id}`}
                              >
                                <h3 className="font-forma font-extrabold text-[#0A0E1A] text-sm sm:text-base md:text-[19px] leading-tight text-center lg:text-right">
                                  <span className="md:hidden">
                                    {activeFixture.awayTeam.shortName}
                                  </span>
                                  <span className="hidden md:inline">
                                    {formatTeamDisplayName(activeFixture.awayTeam.name)}
                                  </span>
                                </h3>
                              </SlideReveal>
                            </div>
                          </div>

                          {/* Animated Team Logo Circle */}
                          <div className="overflow-hidden rounded-full shrink-0">
                            <motion.div
                              key={`away-logo-${activeFixture.id}`}
                              className="bg-white rounded-full flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 p-2.5 md:p-4 overflow-hidden shrink-0 shadow-md border border-slate-200/80"
                              initial={{ y: "100%" }}
                              animate={{ y: "0%" }}
                              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.85 }}
                            >
                              <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                  src={awayLogo}
                                  alt={formatTeamDisplayName(activeFixture.awayTeam.name)}
                                  width={100}
                                  height={100}
                                  className={`w-full h-full object-contain ${
                                    activeFixture.awayTeam.shortName === "SRH" ? "pt-1.5" : ""
                                  }`}
                                />
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Date & Time below the Card */}
                  <div className="w-full text-center mt-4 md:mt-5">
                    <SlideReveal
                      direction="down"
                      duration={0.7}
                      triggerKey={`datetime-${activeFixture.id}`}
                    >
                      <p className="text-[#0A0E1A] font-forma font-bold text-xs sm:text-sm md:text-base tracking-wide">
                        {formatDateAndTime(fixtureDate, fixtureTime)}
                      </p>
                    </SlideReveal>
                  </div>

                  {/* View More Link (Orange Gradient Text) */}
                  <div className="w-full flex justify-center mt-3 md:mt-4">
                    <Link
                      href="#fixtures"
                      className="px-5 py-1.5 font-forma font-bold text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] bg-clip-text text-transparent underline underline-offset-4 hover:opacity-80 transition"
                    >
                      View Full Schedule
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Desktop Right Arrow (Orange gradient, no grey bg) */}
            <button
              onClick={handleNext}
              aria-label="Next fixture"
              className="md:-mt-8 shrink-0 w-11 h-11 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white hover:brightness-110 hover:scale-105 active:scale-95 transition-all hidden md:flex items-center justify-center shadow-md shadow-[#FF4E03]/35 cursor-pointer border border-white/20"
            >
              <ArrowRight className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>

          {/* Mobile Prev / Next Arrows (Orange gradient, no grey bg) */}
          <div className="mt-5 flex w-full items-center justify-center gap-4 md:hidden">
            <button
              onClick={handlePrev}
              aria-label="Previous fixture"
              className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white flex items-center justify-center shadow-md shadow-[#FF4E03]/30 active:scale-95 transition border border-white/20"
            >
              <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next fixture"
              className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white flex items-center justify-center shadow-md shadow-[#FF4E03]/30 active:scale-95 transition border border-white/20"
            >
              <ArrowRight className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
