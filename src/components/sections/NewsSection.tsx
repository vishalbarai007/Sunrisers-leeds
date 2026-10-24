"use client";

import { useState, useRef, useEffect } from "react";
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

// Helper to safely get articles with circular wrap-around
const getArticleAt = (index: number): NewsItem => {
  const total = newsArticles.length;
  return newsArticles[((index % total) + total) % total];
};

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1], // easeOutCubic
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.32, 0, 0.67, 0], // easeInCubic
    },
  }),
};

interface BentoCardProps {
  article: NewsItem;
  slotIndex: number;
  isWide?: boolean;
  direction?: number;
}

function BentoCard({
  article,
  slotIndex,
  isWide = false,
  direction = 1
}: BentoCardProps) {
  const IconComponent = BENTO_ICONS[slotIndex % BENTO_ICONS.length];
  const [imgSrc, setImgSrc] = useState(article.image);

  // Sync image if article updates
  useEffect(() => {
    setImgSrc(article.image);
  }, [article.image]);

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="group relative rounded-2xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/15 backdrop-blur-md p-2.5 sm:p-3 lg:p-3.5 flex flex-col justify-between transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] overflow-hidden w-full h-full"
    >
      {/* Top subtle specular glass reflection line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <Link
        href={article.link}
        className="flex flex-col justify-between h-full w-full"
        title={article.title}
      >
        {/* UPPER SUBGRID AREA: COVERED BY CARD IMAGE */}
        <div
          className={`relative w-full rounded-xl overflow-hidden bg-black/25 border border-white/15 backdrop-blur-sm ${
            isWide
              ? "aspect-[22/9] sm:aspect-[24/9]"
              : "aspect-[16/10] sm:aspect-[16/10]"
          }`}
        >
          <Image
            src={imgSrc}
            alt={article.title}
            fill
            unoptimized
            onError={() => setImgSrc("/images/team-hero-opt.jpg")}
            sizes={
              isWide
                ? "(max-width: 768px) 90vw, 680px"
                : "(max-width: 768px) 90vw, 360px"
            }
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105"
          />

          {/* Gradient overlay for text/badge readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Top category badge */}
          <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
            <span className="bg-[#FF4E03]/90 hover:bg-[#FF4E03] text-white font-redzone text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm border border-white/20 backdrop-blur-sm transition-colors">
              {article.category}
            </span>
          </div>

          {/* Top Right Arrow Indicator */}
          <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 hover:bg-[#FF4E03] text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md border border-white/30 backdrop-blur-sm">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* LOWER SUBGRID AREA: METADATA & TEXTS */}
        <div className="pt-2 sm:pt-2.5 flex flex-col justify-end">
          {/* Metadata with Gold Icon & Crisp Light Text */}
          <div className="flex items-center gap-1.5 mb-1 text-white/80">
            <IconComponent className="w-3.5 h-3.5 text-[#FFCB05] shrink-0" />
            <span className="font-forma text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
              {article.date} &bull; {article.readTime}
            </span>
          </div>

          {/* Title: High-contrast white text that shines gold on hover */}
          <h3 className="font-redzone font-black text-xs sm:text-sm lg:text-base uppercase tracking-wide leading-snug line-clamp-1 text-white group-hover:text-[#FFCB05] transition-colors duration-200">
            {article.title}
          </h3>

          {/* Subtitle / Excerpt: Semi-transparent clean white for high legibility */}
          <p className="font-forma text-[11px] sm:text-xs text-white/70 line-clamp-1 mt-0.5 leading-snug font-medium group-hover:text-white/90 transition-colors duration-200">
            {article.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function NewsSection() {
  const [baseIndex, setBaseIndex] = useState(0);
  const [activeArticles, setActiveArticles] = useState<NewsItem[]>([
    getArticleAt(0),
    getArticleAt(1),
    getArticleAt(2),
    getArticleAt(3)
  ]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  // Next: Cascading sequential order
  // 1st Grid 1 slides out -> Grid 2 takes place of Grid 1 -> Grid 3 takes place of Grid 2 -> Grid 4 takes place of Grid 3 -> New Grid slides into Grid 4
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);

    const nextBase = (baseIndex + 1) % newsArticles.length;
    setBaseIndex(nextBase);

    // Staggered sequence: 0ms, 80ms, 160ms, 240ms
    const delays = [0, 80, 160, 240];

    delays.forEach((delay, slot) => {
      const t = setTimeout(() => {
        setActiveArticles((prev) => {
          const next = [...prev];
          next[slot] = getArticleAt(nextBase + slot);
          return next;
        });
      }, delay);
      timeoutsRef.current.push(t);
    });

    // Reset animating lock after last slot completes
    const endT = setTimeout(() => {
      setIsAnimating(false);
    }, 240 + 320);
    timeoutsRef.current.push(endT);
  };

  // Prev: Cascading reverse order
  // 1st Grid 4 slides out -> Grid 3 takes place of Grid 4 -> Grid 2 takes place of Grid 3 -> Grid 1 takes place of Grid 2 -> New Grid slides into Grid 1
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);

    const prevBase = (baseIndex - 1 + newsArticles.length) % newsArticles.length;
    setBaseIndex(prevBase);

    // Reverse stagger: Slot 3 (0ms) -> Slot 2 (80ms) -> Slot 1 (160ms) -> Slot 0 (240ms)
    [3, 2, 1, 0].forEach((slot, i) => {
      const delay = i * 80;
      const t = setTimeout(() => {
        setActiveArticles((prev) => {
          const next = [...prev];
          next[slot] = getArticleAt(prevBase + slot);
          return next;
        });
      }, delay);
      timeoutsRef.current.push(t);
    });

    const endT = setTimeout(() => {
      setIsAnimating(false);
    }, 240 + 320);
    timeoutsRef.current.push(endT);
  };

  return (
    <section
      id="news"
      className="relative w-full min-h-[70vh] py-12 lg:py-16 bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white overflow-hidden select-none flex flex-col justify-center"
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
        {/* TOP HEADER: Centered Title + Prev/Next Controls with Semi-Transparent Glass Styling */}
        <div className="relative flex flex-col items-center text-center pb-5 sm:pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-redzone text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90">
              LATEST DISPATCHES &bull; SUNRISERS LEEDS
            </span>
          </div>

          <h2 className="font-redzone text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider text-white leading-none">
            NEWS &amp; ARTICLES
          </h2>

          {/* PREV / NEXT BUTTONS: Semi-transparent Frosted Glass Styling */}
          <div className="mt-3.5 sm:mt-0 sm:absolute sm:right-0 sm:bottom-1 flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              aria-label="Previous article"
              className="px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white border border-white/30 hover:border-white/50 backdrop-blur-md font-redzone font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              aria-label="Next article"
              className="px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white border border-white/30 hover:border-white/50 backdrop-blur-md font-redzone font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <span>NEXT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BENTO GRID CONTAINER:
            Row 1: 2 cards (Left 2-col wide + Right 1-col)
            Row 2: 2 cards (Left 1-col + Right 2-col wide)
            Each grid slot has fixed dimensions, with overflow-hidden for silky-smooth slide transitions.
        */}
        <div className="pt-3 sm:pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5 w-full">
            {/* Grid 1: Slot 0 (Left 2-col wide) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <BentoCard
                  key={activeArticles[0].id}
                  article={activeArticles[0]}
                  slotIndex={0}
                  isWide={true}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Grid 2: Slot 1 (Right 1-col) */}
            <div className="col-span-1 relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <BentoCard
                  key={activeArticles[1].id}
                  article={activeArticles[1]}
                  slotIndex={1}
                  isWide={false}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Grid 3: Slot 2 (Left 1-col) */}
            <div className="col-span-1 relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <BentoCard
                  key={activeArticles[2].id}
                  article={activeArticles[2]}
                  slotIndex={2}
                  isWide={false}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Grid 4: Slot 3 (Right 2-col wide) */}
            <div className="md:col-span-2 relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <BentoCard
                  key={activeArticles[3].id}
                  article={activeArticles[3]}
                  slotIndex={3}
                  isWide={true}
                  direction={direction}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
