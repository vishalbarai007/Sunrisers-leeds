"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { newsArticles } from "@/data/news";
import { ArrowLeft, ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";

export function NewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps"
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  return (
    <section
      id="news"
      className="relative w-full bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white py-20 sm:py-28 overflow-hidden select-none border-t border-white/15"
    >
      {/* Subtle Architectural Grid Lines from Footer (Applied to all orange sections as requested) */}
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

      {/* GIANT BACKGROUND TEXT (Replaced "MEDIA & ARTICLES" with "NEWS & ARTICLES" in white & grey gradient as requested) */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
        <span className="font-redzone font-black text-[14vw] tracking-tighter uppercase whitespace-nowrap bg-gradient-to-b from-white/20 via-white/10 to-transparent bg-clip-text text-transparent">
          NEWS &amp; ARTICLES
        </span>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-20">
        {/* TOP HEADER: Title + Navigation Carousel Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8 md:pb-12 border-b border-white/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">
                LATEST DISPATCHES &bull; SUNRISERS LEEDS
              </span>
            </div>

            <h2 className="font-redzone text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              NEWS &amp; ARTICLES
            </h2>
          </div>

          {/* Navigation Arrows (Matches Nick Ho carousel controls) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={scrollPrev}
              aria-label="Previous articles"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#D93800] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next articles"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 bg-white/10 hover:bg-white text-white hover:text-[#D93800] transition-all flex items-center justify-center cursor-pointer shadow-lg active:scale-95"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* CAROUSEL TRACK */}
        <div className="pt-8 md:pt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 sm:-ml-6">
            {newsArticles.map((article, idx) => (
              <div
                key={article.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3 pl-4 sm:pl-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ ease: "easeOut", duration: 0.6, delay: idx * 0.08 }}
                >
                  <Link
                    href={article.link}
                    className="group block relative"
                    title={article.title}
                  >
                    {/* Image Container with Nick Ho hover treatment */}
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/20">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                        <span className="bg-[#0A0E1A]/80 backdrop-blur-md text-white font-forma text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/15">
                          {article.category}
                        </span>
                      </div>

                      {/* Hover Arrow Pill */}
                      <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-[#D93800] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Content below the card */}
                    <div className="pt-3.5 space-y-1.5">
                      <div className="flex items-center gap-2 font-forma text-[10px] sm:text-[11px] font-semibold text-white/70 uppercase tracking-widest">
                        <span>{article.date}</span>
                        <span>&bull;</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-forma font-bold text-sm sm:text-base text-white/95 group-hover:text-white leading-snug line-clamp-2 transition-colors duration-200">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
