import { Navbar } from "@/components/reusable/Navbar";
import { Footer } from "@/components/reusable/Footer";
import { Flame, Trophy, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070A12]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold uppercase tracking-widest mb-8">
          <Flame className="w-4 h-4 fill-current" />
          <span>Engine Initialized & Ready</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mb-6 max-w-4xl font-heading">
          {siteConfig.name}
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          {siteConfig.tagline}
        </p>

        {/* Status indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full text-left">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-[#FF6B00]" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Architecture</div>
                <div className="text-xs text-slate-400">Next.js 15 + Tailwind CSS</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#F59E0B]" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Decoupled Data</div>
                <div className="text-xs text-slate-400">src/data & client-spec</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#FF6B00]" />
              <div>
                <div className="text-xs font-bold text-white uppercase">Ready For Flow</div>
                <div className="text-xs text-slate-400">Awaiting section specs</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
