import { HeroSection } from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#070A12] text-white">
      {/* Task 1: Sunrisers Leeds Hero Section with GSAP scroll parallax */}
      <HeroSection />

      {/* Scroll canvas spacer to enable smooth testing of GSAP scroll animation */}
      <section className="relative z-20 min-h-[50vh] bg-gradient-to-b from-[#070A12] to-[#0A0E1A] border-t border-white/10 px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto">
          <span className="font-forma text-xs font-bold uppercase tracking-[0.25em] text-[#FF4B03] block mb-3">
            Task 1 Complete &bull; Hero Section Ready
          </span>
          <h2 className="font-redzone text-3xl sm:text-5xl font-black uppercase text-white mb-4">
            Next Sections Awaiting Flow
          </h2>
          <p className="font-forma text-sm text-slate-400 leading-relaxed">
            Scroll back up to test the hero section parallax, scale, and fade animations. Ready for Task 2 instructions and reference flow.
          </p>
        </div>
      </section>
    </main>
  );
}
