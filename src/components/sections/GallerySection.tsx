"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface GallerySlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  actionText: string;
}

const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: "slide-1",
    badge: "01 / 06 · CHAMPIONSHIP GLORY",
    title: "The 2016 Maiden IPL Crown",
    subtitle:
      "Championship triumph against all odds at Chinnaswamy. The only team in tournament history to lift the trophy starting from the Eliminator.",
    image: "https://sunrisershyderabad.in/assets/players/2016.png",
    alt: "SunRisers 2016 IPL Championship Celebration",
    actionText: "Explore Legacy"
  },
  {
    id: "slide-2",
    badge: "02 / 06 · WORLD RECORD TOTAL",
    title: "The 287 Invasion",
    subtitle:
      "287/3 vs RCB — the highest team total in IPL history. Travis Head's blistering 39-ball century and Heinrich Klaasen's fireworks rewrote modern T20 cricket forever.",
    image: "https://d1zakxcsliwds.cloudfront.net/image-pool/3e5af5801131490f98405b96966bb7e1.png",
    alt: "SunRisers 287 Runs Record Inning",
    actionText: "View Record"
  },
  {
    id: "slide-3",
    badge: "03 / 06 · UNPRECEDENTED VELOCITY",
    title: "Travishek Carnage (166 in 9.4 Overs)",
    subtitle:
      "Chasing 166 in just 58 deliveries against LSG. Abhishek Sharma and Travis Head unleashed 125 runs in the first 6 overs — the most devastating powerplay blitz ever seen.",
    image: "https://sunrisershyderabad.in/assets/players/mileStoneNew2.png",
    alt: "Travis Head and Abhishek Sharma Travishek Blitz",
    actionText: "Match Highlights"
  },
  {
    id: "slide-4",
    badge: "04 / 06 · FORTRESS HYDERABAD",
    title: "55,000 Fans in Full Voice",
    subtitle:
      "Painting Rajiv Gandhi International Stadium orange with electric passion, thunderous applause, and relentless loyalty. The twelfth man that powers every victory.",
    image: "https://d1zakxcsliwds.cloudfront.net/image-pool/15047e69b0e44fc083870130ad03742c.jpg",
    alt: "Orange Army roaring at Rajiv Gandhi International Stadium",
    actionText: "Fan Experience"
  },
  {
    id: "slide-5",
    badge: "05 / 06 · TACTICAL SUPREMACY",
    title: "Pat Cummins Leadership & Chepauk Triumph",
    subtitle:
      "Ice-cool under pressure, ferocious on the field. World-class bowling rotations and fearless tactical aggression that marched the squad into the Grand Finale.",
    image: "https://d1zakxcsliwds.cloudfront.net/image-pool/21e65b4950fc4aabb1417a32ff1e4ffc.jpg",
    alt: "Captain Pat Cummins and SunRisers Playoff Glory",
    actionText: "Leadership Story"
  },
  {
    id: "slide-6",
    badge: "06 / 06 · A NEW CHAPTER",
    title: "Sunrisers Leeds · Unleash The Fire",
    subtitle:
      "Taking the championship spirit to Yorkshire and Headingley. Elite training facilities, world-class coaching, and an unbroken passion for the gentleman's game.",
    image: "https://d1zakxcsliwds.cloudfront.net/image-pool/056c6435583d49f1878efb7ce825d208.jpg",
    alt: "Sunrisers Leeds Squad Camaraderie",
    actionText: "Join The Squad"
  }
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const centerInitialBadgeRef = useRef<HTMLDivElement>(null);
  const slide1FullBadgeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Smooth scroll directly to #contact section (Footer)
  const handleSkip = () => {
    const contactElem = document.getElementById("contact") || document.querySelector("footer");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    } else if (containerRef.current) {
      const targetY = containerRef.current.offsetTop + containerRef.current.offsetHeight + 50;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Master GSAP Timeline tied to ScrollTrigger
      // Total scroll length: 250vh (50vh title + 50vh scale + 5 slides x 30vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1
        }
      });

      // ------------------------------------------------------------------------
      // STAGE 1: 0 -> 50vh (Timeline 0 -> 50)
      // Title starts small and smoothly scales up to full size (rock-solid, no glitch)
      // ------------------------------------------------------------------------
      gsap.set(titleWrapRef.current, {
        scale: 0.8,
        opacity: 0.8,
        transformOrigin: "center center",
        force3D: true
      });

      tl.to(
        titleWrapRef.current,
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          duration: 50
        },
        0
      );

      // ------------------------------------------------------------------------
      // STAGE 2: 50vh -> 100vh (Timeline 50 -> 100)
      // Center image expands to full screen (100vw x 100vh).
      // Left and right floating cards slide out and fade away.
      // Title fades out cleanly.
      // ------------------------------------------------------------------------
      tl.to(
        titleWrapRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 25,
          ease: "none"
        },
        50
      );

      if (leftCardRef.current) {
        tl.to(
          leftCardRef.current,
          {
            xPercent: -60,
            opacity: 0,
            duration: 35,
            ease: "power1.in"
          },
          50
        );
      }

      if (rightCardRef.current) {
        tl.to(
          rightCardRef.current,
          {
            xPercent: 60,
            opacity: 0,
            duration: 35,
            ease: "power1.in"
          },
          50
        );
      }

      // Initial card label fades out as image expands
      if (centerInitialBadgeRef.current) {
        tl.to(
          centerInitialBadgeRef.current,
          {
            opacity: 0,
            duration: 20,
            ease: "power1.in"
          },
          50
        );
      }

      // Center card expands to fill 100vw x 100vh borderless and sharp (rounded-0)
      if (centerCardRef.current) {
        tl.to(
          centerCardRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            borderWidth: "0px",
            boxShadow: "none",
            duration: 50,
            ease: "power2.inOut"
          },
          50
        );
      }

      // Full-bleed editorial badge for Slide 1 appears when expansion completes
      if (slide1FullBadgeRef.current) {
        gsap.set(slide1FullBadgeRef.current, { opacity: 0, y: 30 });
        tl.to(
          slide1FullBadgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 20,
            ease: "power1.out"
          },
          80
        );
      }

      // ------------------------------------------------------------------------
      // STAGE 3 to 7: 100vh -> 250vh (Timeline 100 -> 250)
      // Horizontal slide right-to-left: remaining slides slide smoothly into view
      // ------------------------------------------------------------------------
      if (trackRef.current) {
        // Slide 2: The 287 Invasion (100 -> 130)
        tl.to(
          trackRef.current,
          {
            xPercent: -16.666667,
            duration: 30,
            ease: "none"
          },
          100
        );

        // Slide 3: Travishek Carnage (130 -> 160)
        tl.to(
          trackRef.current,
          {
            xPercent: -33.333333,
            duration: 30,
            ease: "none"
          },
          130
        );

        // Slide 4: Fortress Hyderabad (160 -> 190)
        tl.to(
          trackRef.current,
          {
            xPercent: -50,
            duration: 30,
            ease: "none"
          },
          160
        );

        // Slide 5: Chepauk Conquest (190 -> 220)
        tl.to(
          trackRef.current,
          {
            xPercent: -66.666667,
            duration: 30,
            ease: "none"
          },
          190
        );

        // Slide 6: Sunrisers Leeds New Era (220 -> 250)
        tl.to(
          trackRef.current,
          {
            xPercent: -83.333333,
            duration: 30,
            ease: "none"
          },
          220
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative w-full h-[100svh] overflow-hidden bg-gradient-to-br from-[#FF4B03] via-[#F4570B] to-[#C92F00] text-white select-none"
    >
      {/* Background Matrix Grid Overlay (White Grid Pattern on Orange Background) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.28) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px"
        }}
        aria-hidden="true"
      />

      {/* Structural Architectural Column Dividers */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
        <div className="border-r border-white/[0.12] h-full" />
        <div className="border-r border-white/[0.12] h-full" />
        <div className="border-r border-white/[0.12] h-full" />
        <div className="border-r border-white/[0.12] h-full" />
        <div className="hidden md:block border-r border-white/[0.12] h-full" />
        <div className="hidden md:block border-r border-white/[0.12] h-full" />
        <div className="hidden md:block border-r border-white/[0.12] h-full" />
        <div className="hidden md:block h-full" />
      </div>

      {/* Pinned Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FF4B03] via-[#F4570B] to-[#C92F00]"
      >
        {/* Crisp Grid Background inside Pinned Viewport */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.28) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.28) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px"
          }}
          aria-hidden="true"
        />

        {/* Structural Column Dividers inside Pinned Stage */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
          <div className="border-r border-white/[0.12] h-full" />
          <div className="border-r border-white/[0.12] h-full" />
          <div className="border-r border-white/[0.12] h-full" />
          <div className="border-r border-white/[0.12] h-full" />
          <div className="hidden md:block border-r border-white/[0.12] h-full" />
          <div className="hidden md:block border-r border-white/[0.12] h-full" />
          <div className="hidden md:block border-r border-white/[0.12] h-full" />
          <div className="hidden md:block h-full" />
        </div>

        {/* Floating Skip to Contact Button */}
        <div className="absolute top-5 sm:top-7 right-5 sm:right-8 md:right-12 z-50 pointer-events-auto">
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip gallery to contact section"
            className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black/45 hover:bg-black/80 border border-white/25 hover:border-white/50 text-white text-[11px] sm:text-xs font-forma font-bold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
          >
            <span>Skip Gallery</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>

        {/*
          STAGE 1 TITLE:
          Anchored with inset-x-0 mx-auto and transform-gpu to prevent any scroll jitter or glitch.
        */}
        <div
          ref={titleWrapRef}
          className="absolute top-8 sm:top-12 md:top-14 inset-x-0 mx-auto w-full max-w-4xl px-6 z-30 text-center flex flex-col items-center pointer-events-none transform-gpu will-change-transform"
          style={{
            transformOrigin: "center center"
          }}
        >
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-8 h-[2px] bg-white/70" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-bold font-forma">
              SUNRISERS GALLERY · MOMENTS OF FIRE
            </span>
            <span className="w-8 h-[2px] bg-white/70" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
            Unleash The Fire Within.
          </h2>
        </div>

        {/* Left Floating Image Card (No rounded corners, no border) */}
        <div
          ref={leftCardRef}
          className="hidden md:block absolute left-[3%] lg:left-[5%] xl:left-[7%] top-1/2 -translate-y-1/2 z-20 w-[220px] lg:w-[260px] h-[320px] lg:h-[390px] rounded-none border-0 overflow-hidden shadow-2xl bg-black/40 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="https://sunrisershyderabad.in/assets/players/2018.png"
              alt="SunRisers 2018 Defensive Masters"
              fill
              sizes="260px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#FFCB05] font-bold block mb-0.5 font-forma">
                TABLE TOPPERS
              </span>
              <span className="text-sm font-bold truncate block font-heading tracking-wide">
                Defending Modest Totals
              </span>
            </div>
          </div>
        </div>

        {/* Right Floating Image Card (No rounded corners, no border) */}
        <div
          ref={rightCardRef}
          className="hidden md:block absolute right-[3%] lg:right-[5%] xl:right-[7%] top-1/2 -translate-y-1/2 z-20 w-[220px] lg:w-[260px] h-[320px] lg:h-[390px] rounded-none border-0 overflow-hidden shadow-2xl bg-black/40 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="https://d1zakxcsliwds.cloudfront.net/image-pool/8bfef31bc20c4c5894a1684a0c69cac5.jpeg"
              alt="SunRisers Relentless Hitting"
              fill
              sizes="260px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#FFCB05] font-bold block mb-0.5 font-forma">
                FEARLESS INTENT
              </span>
              <span className="text-sm font-bold truncate block font-heading tracking-wide">
                Relentless Boundary Carnage
              </span>
            </div>
          </div>
        </div>

        {/*
          CONTINUOUS FULLSCREEN HORIZONTAL SLIDER TRACK:
          w-[600vw] h-full flex with 0 gap between slides.
          Initially center card is framed inside Slide 1.
          When scrolled:
          - Center card expands to 100vw x 100vh borderless and sharp (rounded-0).
          - Track shifts horizontally revealing Slides 2 to 6 (6 total).
        */}
        <div
          ref={trackRef}
          className="absolute inset-0 z-10 flex h-full w-[600vw] will-change-transform pointer-events-auto"
        >
          {/* ================================================================ */}
          {/* SLIDE 1: CENTER CARD THAT EXPANDS TO FULL SCREEN                  */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <div
              ref={centerCardRef}
              className="relative w-[88vw] sm:w-[580px] lg:w-[640px] h-[360px] sm:h-[440px] lg:h-[480px] rounded-none border-0 overflow-hidden shadow-2xl bg-slate-900 transition-none will-change-[width,height]"
            >
              <Image
                src={GALLERY_SLIDES[0].image}
                alt={GALLERY_SLIDES[0].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />

              {/* Initial Center Card Label (Stage 1) */}
              <div
                ref={centerInitialBadgeRef}
                className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none"
              >
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#FFCB05] font-bold block mb-1 font-forma">
                    SUNRISERS · THE CHAMPIONSHIP MAIDEN
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold font-heading uppercase tracking-wide">
                    2016 Historic IPL Championship
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/85 mt-1 max-w-md font-forma">
                    Triumph at Chinnaswamy • Only Team to Lift Trophy from Eliminator
                  </p>
                </div>
              </div>

              {/* Fullscreen Editorial Overlay (Stage 2: Full Viewport Active) */}
              <div
                ref={slide1FullBadgeRef}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto"
              >
                <div className="max-w-2xl text-white">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#FFCB05] font-bold mb-1.5 font-forma">
                    {GALLERY_SLIDES[0].badge}
                  </div>
                  <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                    {GALLERY_SLIDES[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/85 mt-2 font-normal font-forma max-w-xl leading-relaxed">
                    {GALLERY_SLIDES[0].subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <span>{GALLERY_SLIDES[0].actionText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDES 2 to 6: REMAINING SUNRISERS GALLERY SLIDES                 */}
          {/* ================================================================ */}
          {GALLERY_SLIDES.slice(1).map((slide) => (
            <div
              key={slide.id}
              className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 md:p-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
                <div className="max-w-2xl text-white">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#FFCB05] font-bold mb-1.5 font-forma">
                    {slide.badge}
                  </div>
                  <h3 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/85 mt-2 font-normal font-forma max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <span>{slide.actionText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
