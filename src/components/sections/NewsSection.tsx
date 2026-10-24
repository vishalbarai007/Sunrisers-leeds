"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { newsArticles, NewsItem } from "@/data/news";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  FileText,
  Compass,
  Layers,
  TrendingUp,
  Bookmark,
  Radio
} from "lucide-react";

// Icons corresponding to each slot in the bento layout
const BENTO_ICONS = [
  FileText,
  Sparkles,
  Layers,
  Radio,
  Bookmark,
  TrendingUp,
  Compass
];

interface BentoCardProps {
  article: NewsItem;
  slotIndex: number;
  isWide?: boolean;
}

function BentoCard({ article, slotIndex, isWide = false }: BentoCardProps) {
  const IconComponent = BENTO_ICONS[slotIndex % BENTO_ICONS.length];

  return (
    <motion.div
      layout
      key={article.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`group relative rounded-2xl border border-white/15 bg-[#0B0E17]/90 backdrop-blur-md p-2.5 sm:p-3 lg:p-3.5 flex flex-col justify-between hover:border-[#FF4E03]/60 transition-all duration-300 shadow-xl overflow-hidden ${
        isWide ? "md:col-span-2" : "col-span-1"
      }`}
    >
      <Link
        href={article.link}
        className="flex flex-col justify-between h-full w-full"
        title={article.title}
      >
        {/* UPPER SUBGRID AREA: COVERED BY CARD IMAGE */}
        <div
          className={`relative w-full rounded-xl overflow-hidden bg-black/40 border border-white/10 ${
            isWide
              ? "aspect-[21/9] sm:aspect-[22/9]"
              : "aspect-[16/10] sm:aspect-[16/10]"
          }`}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={
              isWide
                ? "(max-width: 768px) 90vw, 680px"
                : "(max-width: 768px) 90vw, 360px"
            }
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105"
          />

          {/* Vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

          {/* Top category badge */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
            <span className="bg-[#070A12]/80 backdrop-blur-md text-white font-redzone text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border border-white/15">
              {article.category}
            </span>
          </div>

          {/* Top Right Arrow Indicator */}
          <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#FF4E03] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* LOWER SUBGRID AREA: ICON + TITLE + SUBTITLE / DESCRIPTION */}
        <div className="pt-2 sm:pt-2.5 flex flex-col justify-end">
          <div className="flex items-center gap-1.5 mb-1 text-white/60">
            <IconComponent className="w-3.5 h-3.5 text-[#FF4E03] shrink-0" />
            <span className="font-forma text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
              {article.date} &bull; {article.readTime}
            </span>
          </div>

          <h3 className="font-redzone font-black text-xs sm:text-sm lg:text-base text-white uppercase tracking-wide group-hover:text-[#FF4E03] transition-colors duration-200 line-clamp-1 leading-tight">
            {article.title}
          </h3>

          <p className="font-forma text-[11px] sm:text-xs text-white/70 line-clamp-1 mt-0.5 leading-snug">
            {article.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function NewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  // Next: shifts 1 card out from the left and brings 1 new card in from the right
  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % newsArticles.length);
  };

  // Prev: shifts 1 card in from the left and brings 1 card out to the right
  const handlePrev = () => {
    setStartIndex(
      (prev) => (prev - 1 + newsArticles.length) % newsArticles.length
    );
  };

  // 7 cards visible in the bento layout matching the attached image
  const visibleArticles = Array.from({ length: 7 }, (_, i) => {
    return newsArticles[(startIndex + i) % newsArticles.length];
  });

  return (
    <section
      id="news"
      className="relative w-full min-h-[70vh] py-12 lg:py-16 bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white overflow-hidden select-none border-t border-white/15 flex flex-col justify-center"
    >
      {/* Subtle Architectural Grid Lines */}
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

      {/* Consistent Orange Background Dotted Grid (36px 36px) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px"
        }}
      />

      {/* GIANT BACKGROUND TEXT Covering whole component with gradient effect */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 overflow-hidden leading-none">
        <span className="font-redzone font-black text-[18vw] sm:text-[16vw] lg:text-[14vw] tracking-tighter uppercase whitespace-nowrap bg-gradient-to-b from-white/20 via-white/10 to-transparent bg-clip-text text-transparent">
          NEWS &amp;
        </span>
        <span className="font-redzone font-black text-[18vw] sm:text-[16vw] lg:text-[14vw] tracking-tighter uppercase whitespace-nowrap bg-gradient-to-b from-white/15 via-white/05 to-transparent bg-clip-text text-transparent -mt-[4vw]">
          ARTICLES
        </span>
      </div>

      {/* MAIN CONTAINER: TAKES AT LEAST 70% OF SECTION WIDTH */}
      <div className="relative z-10 w-full max-w-[92vw] lg:w-[74%] xl:w-[72%] mx-auto px-2 sm:px-4 flex flex-col justify-between">
        {/* TOP HEADER: Centered Title + Prev/Next Controls matching site button font rules */}
        <div className="relative flex flex-col items-center text-center pb-5 sm:pb-6 border-b border-white/20">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-redzone text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90">
              LATEST DISPATCHES &bull; SUNRISERS LEEDS
            </span>
          </div>

          <h2 className="font-redzone text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider text-white leading-none">
            NEWS &amp; ARTICLES
          </h2>

          {/* PREV / NEXT BUTTONS (Following site font rules: font-redzone) */}
          <div className="mt-3.5 sm:mt-0 sm:absolute sm:right-0 sm:bottom-5 sm:translate-y-1/2 flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous article"
              className="px-3.5 py-1.5 rounded-lg bg-[#070A12]/80 hover:bg-[#FF4E03] text-white border border-white/20 font-redzone font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg hover:border-white/40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next article"
              className="px-3.5 py-1.5 rounded-lg bg-[#070A12]/80 hover:bg-[#FF4E03] text-white border border-white/20 font-redzone font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg hover:border-white/40"
            >
              <span>NEXT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BENTO GRID CONTAINER MATCHING EXACT ATTACHED IMAGE:
            Row 1: 3 cards (1-col each)
            Row 2: 2 cards (Left 2-col wide + Right 1-col)
            Row 3: 2 cards (Left 1-col + Right 2-col wide)
        */}
        <div className="pt-5 sm:pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
            <AnimatePresence mode="popLayout">
              {/* Row 1: 3 cards */}
              <BentoCard
                key={visibleArticles[0].id}
                article={visibleArticles[0]}
                slotIndex={0}
                isWide={false}
              />
              <BentoCard
                key={visibleArticles[1].id}
                article={visibleArticles[1]}
                slotIndex={1}
                isWide={false}
              />
              <BentoCard
                key={visibleArticles[2].id}
                article={visibleArticles[2]}
                slotIndex={2}
                isWide={false}
              />

              {/* Row 2: 2 cards (Left 2-col wide + Right 1-col) */}
              <BentoCard
                key={visibleArticles[3].id}
                article={visibleArticles[3]}
                slotIndex={3}
                isWide={true}
              />
              <BentoCard
                key={visibleArticles[4].id}
                article={visibleArticles[4]}
                slotIndex={4}
                isWide={false}
              />

              {/* Row 3: 2 cards (Left 1-col + Right 2-col wide) */}
             
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
