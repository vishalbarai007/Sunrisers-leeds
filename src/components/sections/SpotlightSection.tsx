"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SPOTLIGHT_POSTS_DATA, SpotlightPost } from "@/data/spotlight";

function SpotlightCard({
  post,
  className
}: {
  post: SpotlightPost;
  className?: string;
}) {
  return (
    <Link
      href={post.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col gap-3.5 w-full h-full cursor-pointer ${className ?? ""}`}
    >
      {/* Media Container with crisp white border and Instagram branding */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/80 shadow-2xl bg-black/30 transition-all duration-500 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)] group-hover:border-white">
        <Image
          src={post.thumbnailUrl}
          alt={post.caption}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover object-center z-0 transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity duration-300 z-10" />

        {/* Top Instagram Badge */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/25 flex items-center justify-center p-1.5 shadow-md">
            <Image
              src="/images/Instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Top Right External Link Icon */}
        <div className="absolute top-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white text-[#0A0E1A] flex items-center justify-center shadow-lg">
            <ExternalLink className="w-4 h-4" strokeWidth={2.2} />
          </div>
        </div>

        {/* Bottom Social Engagement Stats (if available) */}
        {post.stats && post.stats.likes > 0 && (
          <div className="absolute bottom-3 left-3.5 z-20 flex items-center gap-2 text-white/90 text-xs font-forma font-semibold">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
              ❤️ {post.stats.likes.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Caption below image */}
      <div className="flex flex-col gap-1 px-1">
        <p className="text-white font-forma text-xs sm:text-sm md:text-[15px] font-medium leading-snug line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
          {post.caption}
        </p>
        <span className="text-white/60 font-forma text-[11px] font-semibold uppercase tracking-wider group-hover:text-white/90 transition-colors">
          View on Instagram →
        </span>
      </div>
    </Link>
  );
}

export function SpotlightSection() {
  const posts = SPOTLIGHT_POSTS_DATA.slice(0, 4);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("scroll", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);
    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("scroll", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi, updateScrollButtons]);

  return (
    <section
      id="spotlight"
      className="relative w-full bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden select-none border-t border-[#FF7324]/40 z-10"
    >
      {/* 8-Column Architectural Grid overlay matching Footer & Orange Sections */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-r border-white/[0.08] ${
              i >= 4 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ease: "easeOut", duration: 0.7 }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90">
              SOCIAL FEED & HIGHLIGHTS
            </span>
          </div>

          <h2 className="font-redzone text-white uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-center">
            SPOTLIGHT
          </h2>

          <Link
            href="https://www.instagram.com/sunrisershyd/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white font-forma text-sm sm:text-base font-semibold transition-all group shadow-sm hover:scale-105 active:scale-95"
          >
            <Image
              src="/images/Instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span>sunrisershyd</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
          </Link>
        </motion.div>

        {/* Desktop View (4-Card Grid with reliable Framer Motion staggered reveals) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {posts.map((post, idx) => (
            <motion.div
              key={post.code}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ ease: "easeOut", duration: 0.6, delay: idx * 0.1 }}
              className="w-full flex"
            >
              <SpotlightCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View (Carousel with Embla) */}
        <div className="md:hidden w-full flex flex-col items-center gap-6">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {posts.map((post, idx) => (
                <div
                  key={post.code}
                  className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[60%] pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ ease: "easeOut", duration: 0.5, delay: idx * 0.08 }}
                    className="w-full"
                  >
                    <SpotlightCard post={post} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Prev / Next Controls */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous spotlight post"
              className="w-11 h-11 rounded-full bg-white text-[#D93800] hover:bg-white/90 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.2} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next spotlight post"
              className="w-11 h-11 rounded-full bg-white text-[#D93800] hover:bg-white/90 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg active:scale-95"
            >
              <ArrowRight className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
