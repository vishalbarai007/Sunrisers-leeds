"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestonesData } from "@/data/milestones";
import { ChevronsRight, Award } from "lucide-react";

export function MilestoneSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0 || !containerRef.current || !pinRef.current) return;

    // Bottom-to-top reveal animation (without fade effect):
    // Slide 0 starts fully visible, subsequent slides start clipped completely from bottom (inset: 100% 0% 0% 0%)
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

    const totalSteps = slides.length - 1;
    // "time taken by each slide on scroll will be 50vh"
    const scrollDistance = totalSteps * (window.innerHeight * 0.5);

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
            setActiveIndex(step);
          }
        }
      });

      // Sequential bottom-to-top unmask wipe for each slide without opacity fading
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

  // Handler for the "SKIP >>" button to smoothly scroll past the milestone section
  const handleSkip = () => {
    if (!containerRef.current) return;
    const containerBottom =
      containerRef.current.offsetTop + containerRef.current.offsetHeight;
    window.scrollTo({
      top: containerBottom,
      behavior: "smooth"
    });
  };

  return (
    <section
      ref={containerRef}
      id="milestones"
      className="relative w-full bg-[#070A12] select-none"
    >
      {/* Pinned Viewport Container (h-screen on desktop, 100dvh on mobile/tablet) */}
      <div
        ref={pinRef}
        className="relative h-[100dvh] lg:h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* MILESTONE SLIDES CONTAINER */}
        <div className="relative h-full w-full">
          {milestonesData.map((item, index) => {
            const slideIsWhite = item.theme === "white";

            return (
              <div
                key={item.id}
                ref={(el) => {
                  slidesRef.current[index] = el;
                }}
                style={{ zIndex: 10 + index }}
                className={`absolute inset-0 h-full w-full flex flex-col justify-between overflow-hidden shadow-2xl ${
                  slideIsWhite
                    ? "bg-[#FFFFFF] text-[#0A0E1A]"
                    : "bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white"
                }`}
              >
                {/* Subtle Architectural Grid Lines from Footer */}
                {!slideIsWhite && (
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

                {/* Consistent Orange Background Dotted Grid (matching all orange sections) */}
                {!slideIsWhite && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
                      backgroundSize: "36px 36px",
                      backgroundPosition: "0 0, 18px 18px"
                    }}
                  />
                )}

                {/* TOP HEADER / BADGE BAR (No black line) */}
                <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-20 pt-4 sm:pt-6 lg:pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-redzone font-bold uppercase tracking-wider ${
                        slideIsWhite
                          ? "bg-[#FF4E03] text-white"
                          : "bg-white text-[#D93800]"
                      }`}
                    >
                      {item.statsBadge}
                    </span>
                    <span className="font-redzone text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60">
                      MILESTONES &bull; CHAPTER 0{index + 1}
                    </span>
                  </div>

                  <span
                    className={`font-forma text-[10px] sm:text-xs font-semibold ${
                      slideIsWhite ? "text-slate-500" : "text-white/70"
                    }`}
                  >
                    SCROLL TO EXPLORE
                  </span>
                </div>

                {/* CENTER EDITORIAL STAGE (3 Columns: Left Typography, Center Landscape Image with Contain, Right Narrative) */}
                <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center px-4 sm:px-8 md:px-12 lg:px-20 py-2 sm:py-4 my-auto">
                  {/* LEFT COLUMN: Year + Huge Impact Headline + Tagline */}
                  <div className="md:col-span-4 flex flex-col justify-center text-left">
                    <div className="flex items-baseline gap-2 mb-1 sm:mb-2">
                      <span
                        className={`font-redzone text-xs sm:text-sm font-bold uppercase tracking-widest ${
                          slideIsWhite ? "text-[#0A0E1A]/60" : "text-white/60"
                        }`}
                      >
                        YEAR
                      </span>
                      <span
                        className={`font-redzone text-base sm:text-xl font-black ${
                          slideIsWhite ? "text-[#FF4E03]" : "text-white"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h2
                      className={`font-redzone text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-[0.92] lg:leading-[0.9] break-words ${
                        slideIsWhite ? "text-[#0A0E1A]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h2>

                    <span
                      className={`font-redzone text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] mt-1.5 lg:mt-3 ${
                        slideIsWhite ? "text-[#FF4E03]" : "text-white/80"
                      }`}
                    >
                      {item.tagline}
                    </span>
                  </div>

                  {/* CENTER COLUMN: LANDSCAPE DUMMY IMAGE WITH CONTAIN PROPERTY & NO REPEAT (Official Sunrisers Images) + SKIP BUTTON */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center relative w-full h-full max-h-[30vh] sm:max-h-[36vh] md:max-h-[46vh] lg:max-h-[50vh]">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[26vh] sm:max-h-[32vh] md:max-h-[42vh] lg:max-h-[46vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group flex items-center justify-center bg-black/40">
                      <Image
                        src={item.image}
                        alt={`${item.title} Landscape`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 540px"
                        className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                        style={{ objectFit: "contain" }}
                      />

                      {/* Subtle vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      {/* SKIP >> BUTTON: Floating at bottom-center over the landscape image */}
                      <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
                        <button
                          onClick={handleSkip}
                          className="group/btn bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white font-redzone font-black text-[11px] sm:text-sm tracking-widest uppercase px-4 py-1.5 sm:px-5 sm:py-2.5 rounded shadow-2xl flex items-center gap-1.5 sm:gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-white/20"
                          title="Skip milestone timeline to next section"
                        >
                          <span>SKIP</span>
                          <ChevronsRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Editorial Narrative Paragraph */}
                  <div className="md:col-span-3 flex flex-col justify-center text-left md:pl-2">
                    <p
                      className={`font-forma text-[11px] sm:text-xs md:text-xs lg:text-[15px] leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-none ${
                        slideIsWhite ? "text-slate-600" : "text-white/90"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className={`mt-2.5 pt-2.5 lg:mt-4 lg:pt-4 border-t ${slideIsWhite ? "border-slate-200" : "border-white/20"} flex items-center gap-2 sm:gap-3`}>
                      <Award
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                          slideIsWhite ? "text-[#FF4E03]" : "text-white"
                        }`}
                      />
                      <span
                        className={`font-forma text-[9px] sm:text-xs font-bold uppercase tracking-wider ${
                          slideIsWhite ? "text-[#0A0E1A]/70" : "text-white/80"
                        }`}
                      >
                        SUNRISERS HERITAGE &bull; LEEDS CRICKET
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM FOOTER / BRANDING */}
                <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-20 pb-4 sm:pb-6 lg:pb-7 flex items-end justify-between">
                  <span
                    className={`font-redzone text-[11px] sm:text-sm font-black uppercase tracking-wider ${
                      slideIsWhite ? "text-[#0A0E1A]/40" : "text-white/40"
                    }`}
                  >
                    SUNRISERS TIMELINE &bull; CHAPTER {index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM-RIGHT CLEAN SEMI-TRANSPARENT COUNTER PILL */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-4 sm:bottom-6 z-50 flex items-center gap-2 bg-[#070A12]/80 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-xl pointer-events-none">
          <div className="font-redzone text-xs sm:text-sm font-black tracking-wider text-white flex items-center">
            <span className="text-[#FF4E03]">{activeIndex + 1}</span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/60">{milestonesData.length}</span>
          </div>

          {/* Mini progress dots */}
          <div className="flex items-center gap-1 ml-1.5 pl-2 border-l border-white/20">
            {milestonesData.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-3.5 sm:w-4 bg-[#FF4E03]" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
