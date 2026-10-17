"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestonesData, MilestoneItem } from "@/data/milestones";
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

    // Initially: Slide 0 is fully visible (opacity 1, yPercent 0), subsequent slides are hidden (opacity 0, yPercent 40)
    slides.forEach((slide, i) => {
      if (i > 0) {
        gsap.set(slide, { opacity: 0, yPercent: 40, pointerEvents: "none" });
      } else {
        gsap.set(slide, { opacity: 1, yPercent: 0, pointerEvents: "auto" });
      }
    });

    const totalSteps = slides.length - 1; // 4 transitions for 5 slides
    const scrollDistance = totalSteps * (window.innerHeight * 0.7);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: pinRef.current,
          scrub: 0.6,
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

      // Stagger cross-fade/slide transitions between each milestone slide (matches nickho-motorsports.nl)
      for (let i = 0; i < totalSteps; i++) {
        const currentSlide = slides[i];
        const nextSlide = slides[i + 1];

        // Animate current slide out
        tl.to(
          currentSlide,
          {
            opacity: 0,
            yPercent: -30,
            ease: "power2.inOut",
            duration: 1,
            pointerEvents: "none"
          },
          i * 1.5
        );

        // Animate next slide in
        tl.fromTo(
          nextSlide,
          { opacity: 0, yPercent: 40, pointerEvents: "none" },
          {
            opacity: 1,
            yPercent: 0,
            ease: "power2.inOut",
            duration: 1,
            pointerEvents: "auto"
          },
          i * 1.5 + 0.3
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

  const currentMilestone = milestonesData[activeIndex] || milestonesData[0];
  const isWhite = currentMilestone.theme === "white";

  return (
    <section
      ref={containerRef}
      id="milestones"
      className="relative w-full bg-[#070A12] select-none"
    >
      {/* Pinned Viewport Container (h-screen) */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
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
                className={`absolute inset-0 h-full w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 ${
                  slideIsWhite
                    ? "bg-[#FFFFFF] text-[#0A0E1A]"
                    : "bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white"
                }`}
              >
                {/* Subtle Architectural Grid Lines from Footer (Applied to orange sections as requested) */}
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

                {/* Subtle geometric dots watermark for white sections */}
                {slideIsWhite && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
                      backgroundSize: "36px 36px",
                      backgroundPosition: "0 0, 18px 18px"
                    }}
                  />
                )}

                {/* TOP HEADER / CLEARANCE BELOW NAVBAR */}
                <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20 pt-20 sm:pt-24 md:pt-28 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        slideIsWhite ? "bg-[#FF4B03]" : "bg-white"
                      }`}
                    />
                    <span
                      className={`font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] ${
                        slideIsWhite ? "text-[#FF4B03]" : "text-white/80"
                      }`}
                    >
                      MILESTONES &bull; OUR GLORY JOURNEY
                    </span>
                  </div>

                  <div
                    className={`font-mono text-xs sm:text-sm font-black tracking-widest px-3 py-1 rounded-full border ${
                      slideIsWhite
                        ? "border-[#0A0E1A]/15 bg-black/5 text-[#0A0E1A]"
                        : "border-white/20 bg-white/10 text-white"
                    }`}
                  >
                    {item.statsBadge}
                  </div>
                </div>

                {/* MAIN CONTENT: 3-COLUMN EDITORIAL GRID WITH SINGLE LANDSCAPE IMAGE */}
                <div className="relative z-10 flex-1 w-full px-6 sm:px-10 md:px-14 lg:px-20 grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-10 min-h-0 py-2 sm:py-4">
                  {/* LEFT COLUMN: Large Bold Headline & Year */}
                  <div className="md:col-span-4 flex flex-col justify-center text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`font-forma text-xs sm:text-sm font-bold tracking-[0.2em] uppercase ${
                          slideIsWhite ? "text-slate-400" : "text-white/60"
                        }`}
                      >
                        YEAR
                      </span>
                      <span
                        className={`font-redzone text-lg sm:text-xl font-black ${
                          slideIsWhite ? "text-[#FF4B03]" : "text-white"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>

                    <h2
                      className={`font-redzone text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-[0.9] ${
                        slideIsWhite ? "text-[#0A0E1A]" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h2>

                    <span
                      className={`font-forma text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mt-3 ${
                        slideIsWhite ? "text-[#FF4B03]" : "text-white/80"
                      }`}
                    >
                      {item.tagline}
                    </span>
                  </div>

                  {/* CENTER COLUMN: 1 ONLY LANDSCAPE IMAGE + SKIP BUTTON (As requested: "there are 2 images here, make it 1 only and it should be landscape") */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center relative w-full h-full max-h-[52vh] sm:max-h-[56vh]">
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[46vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                      <Image
                        src={item.image}
                        alt={`${item.title} Landscape`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, 540px"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtle vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                      {/* SKIP >> BUTTON: Floating at bottom-center over the landscape image */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                        <button
                          onClick={handleSkip}
                          className="group/btn bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] text-white font-forma font-bold text-xs sm:text-sm tracking-widest uppercase px-5 py-2.5 rounded shadow-2xl flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-white/20"
                          title="Skip milestone timeline to next section"
                        >
                          <span>SKIP</span>
                          <ChevronsRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Editorial Narrative Paragraph */}
                  <div className="md:col-span-3 flex flex-col justify-center text-left md:pl-2">
                    <p
                      className={`font-forma text-xs sm:text-sm md:text-[15px] leading-relaxed ${
                        slideIsWhite ? "text-slate-600" : "text-white/90"
                      }`}
                    >
                      {item.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-current/15 flex items-center gap-3">
                      <Award
                        className={`w-4 h-4 ${
                          slideIsWhite ? "text-[#FF4B03]" : "text-white"
                        }`}
                      />
                      <span
                        className={`font-forma text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                          slideIsWhite ? "text-[#0A0E1A]/70" : "text-white/80"
                        }`}
                      >
                        SUNRISERS HERITAGE &bull; LEEDS CRICKET
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM FOOTER / BRANDING */}
                <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 lg:px-20 pb-5 sm:pb-7 flex items-end justify-between">
                  <span
                    className={`font-redzone text-xs sm:text-sm font-black uppercase tracking-wider ${
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

        {/* BOTTOM-RIGHT FIXED COUNTER (Nick Ho style with diagonal orange gradient accent squares) */}
        <div className="absolute right-4 sm:right-8 md:right-12 bottom-4 sm:bottom-6 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#070A12]/90 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/20 shadow-2xl pointer-events-none">
          {/* Two diagonal orange gradient squares (Replacing yellow from Nick Ho) */}
          <div className="relative w-4 h-4 grid grid-cols-2 grid-rows-2 gap-0.5">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-gradient-to-br from-[#FF4E03] to-[#FF6200]" />
            <span className="w-1.5 h-1.5 rounded-[1px] opacity-0" />
            <span className="w-1.5 h-1.5 rounded-[1px] opacity-0" />
            <span className="w-1.5 h-1.5 rounded-[1px] bg-gradient-to-br from-[#FF4E03] to-[#FF6200]" />
          </div>

          <div className="font-mono text-xs sm:text-sm md:text-base font-black tracking-widest text-white flex items-center">
            <span className="text-[#FF4B03]">{activeIndex + 1}</span>
            <span className="text-white/40 mx-1">/</span>
            <span className="text-white/70">{milestonesData.length}</span>
          </div>

          {/* Mini progress dots */}
          <div className="hidden sm:flex items-center gap-1 ml-1.5 pl-2 border-l border-white/20">
            {milestonesData.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-4 bg-[#FF4B03]" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
