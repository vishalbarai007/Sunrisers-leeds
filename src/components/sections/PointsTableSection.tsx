"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { POINTS_TABLE_DATA } from "@/data/pointsTable";

export function PointsTableSection() {
  return (
    <section
      id="pointstable"
      className="relative w-full bg-[#FFFFFF] text-[#0A0E1A] flex flex-col items-center py-16 md:py-24 px-3 sm:px-6 md:px-10 lg:px-20 overflow-hidden select-none z-10 border-t border-slate-200"
    >
      {/* Subtle sports dots watermark for pure white background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px"
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ease: "easeInOut", duration: 0.8 }}
        className="flex flex-col items-center text-center mb-8 md:mb-12 relative z-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4B03]" />
          <span className="font-forma text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#FF4B03]">
            2026 LEAGUE STANDINGS
          </span>
        </div>
        <h2 className="font-redzone uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-[#0A0E1A]">
          POINTS{" "}
          <span className="bg-gradient-to-r from-[#FF4E03] via-[#FF6200] to-[#CF2E00] bg-clip-text text-transparent">
            TABLE
          </span>
        </h2>
      </motion.div>

      {/* Main Table Container in Sunrisers Orange Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ease: "easeInOut", duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl rounded-2xl border border-[#FF7324]/50 bg-gradient-to-br from-[#E64200] via-[#FF5500] to-[#BA2300] p-2.5 sm:p-4 md:p-6 md:skew-x-[-2deg] shadow-[0_25px_60px_-15px_rgba(230,66,0,0.45)]"
      >
        {/* 8-Column Architectural Grid overlay matching Footer & Orange Sections */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0 rounded-2xl overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-r border-white/[0.08] ${
                i >= 4 ? "hidden md:block" : ""
              }`}
            />
          ))}
        </div>

        {/* Counter-skew wrapper to ensure text remains crisp & straight */}
        <div className="relative z-10 md:skew-x-[2deg]">
          {/* Table Column Header Strip */}
          <div className="rounded-xl bg-white/95 backdrop-blur-sm px-3 sm:px-5 md:px-8 py-3.5 shadow-md border border-white/60 mb-2">
            <div className="grid w-full items-center grid-cols-[minmax(0,1fr)_44px_44px_44px_62px_44px] sm:grid-cols-[minmax(0,1fr)_56px_56px_56px_76px_56px] md:grid-cols-[minmax(0,1fr)_72px_72px_72px_96px_76px] lg:grid-cols-[minmax(0,1fr)_80px_80px_80px_104px_84px] text-[#0A0E1A] font-forma font-extrabold uppercase tracking-[0.14em] text-[11px] sm:text-xs md:text-sm">
              <span className="md:pl-10 text-left">TEAMS</span>
              <span className="text-center font-black">MAT</span>
              <span className="text-center font-black">W</span>
              <span className="text-center font-black">L</span>
              <span className="text-center font-black">N/R</span>
              <span className="text-center font-black">PTS</span>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="flex flex-col gap-1 sm:gap-1.5 mt-1">
            {POINTS_TABLE_DATA.map((row, index) => {
              const isHighlighted = Boolean(row.isSunrisers);

              return (
                <motion.div
                  key={row.rank}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ ease: "easeOut", duration: 0.45, delay: index * 0.035 }}
                  className={`relative transition-all duration-300 ${
                    isHighlighted
                      ? "my-1.5 py-3 sm:py-3.5 px-3 sm:px-5 md:px-8 rounded-xl bg-white text-[#0A0E1A] shadow-[0_12px_36px_rgba(0,0,0,0.28)] ring-2 ring-[#FFCB05] z-10 scale-[1.01] border border-amber-200"
                      : "py-2.5 sm:py-3 px-3 sm:px-5 md:px-8 text-white hover:bg-white/[0.08] rounded-xl relative"
                  }`}
                >
                  {/* Subtle horizontal divider line for non-highlighted rows */}
                  {!isHighlighted && index < POINTS_TABLE_DATA.length - 1 && (
                    <div
                      className="absolute bottom-0 left-4 right-4 h-[1px] pointer-events-none"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 20%, rgba(255, 255, 255, 0.25) 80%, rgba(255, 255, 255, 0) 100%)"
                      }}
                    />
                  )}

                  <div className="grid w-full items-center grid-cols-[minmax(0,1fr)_44px_44px_44px_62px_44px] sm:grid-cols-[minmax(0,1fr)_56px_56px_56px_76px_56px] md:grid-cols-[minmax(0,1fr)_72px_72px_72px_96px_76px] lg:grid-cols-[minmax(0,1fr)_80px_80px_80px_104px_84px]">
                    {/* Rank + Metallic Gold Badge + Team Name + Q status */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 pr-2">
                      {/* Rank Number */}
                      <span
                        className={`font-forma text-xs sm:text-sm md:text-base font-black w-5 sm:w-6 shrink-0 ${
                          isHighlighted ? "text-[#E64200]" : "text-white/80"
                        }`}
                      >
                        {row.rank}
                      </span>

                      {/* Metallic Gold Gradient Circle Badge */}
                      <div
                        className="relative flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full p-[1.5px] shadow-sm"
                        style={{
                          background:
                            "linear-gradient(59deg, #D0A440 0%, #FFF690 21%, #C6932F 57%, #B17D1E 67%, #895500 82%, #905D06 84%, #A57318 87%, #C79636 90%, #DCAD49 92%, #FBF09C 100%)"
                        }}
                      >
                        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-[#ffcb05] bg-white overflow-hidden">
                          <Image
                            src={row.logoUrl}
                            alt={`${row.teamName} logo`}
                            fill
                            sizes="44px"
                            className="object-contain p-1"
                          />
                        </div>
                      </div>

                      {/* Team Name + Qualified Badge */}
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        {/* Desktop Team Name */}
                        <span
                          className={`hidden md:inline font-forma text-sm lg:text-base truncate ${
                            isHighlighted
                              ? "font-black text-[#0A0E1A]"
                              : "font-bold text-white"
                          }`}
                        >
                          {row.teamName}
                        </span>

                        {/* Mobile Team Name */}
                        <span
                          className={`inline md:hidden font-forma text-xs sm:text-sm font-bold truncate ${
                            isHighlighted ? "text-[#0A0E1A] font-black" : "text-white"
                          }`}
                        >
                          {row.shortName}
                        </span>

                        {/* Qualified 'Q' Pill Badge (matching reference screenshot) */}
                        {row.qualified && (
                          <span
                            title="Qualified for Playoffs"
                            className={`inline-flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full text-[9px] sm:text-[10px] font-forma font-black shrink-0 shadow-sm ${
                              isHighlighted
                                ? "bg-[#FF4B03] text-white"
                                : "bg-[#E64200] text-white border border-white/40"
                            }`}
                          >
                            Q
                          </span>
                        )}

                        {/* Sunrisers Featured Badge */}
                        {isHighlighted && (
                          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-forma font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#FF4E03] to-[#CF2E00] text-white shadow-sm shrink-0">
                            Our Team
                          </span>
                        )}
                      </div>
                    </div>

                    {/* MAT (Matches Played) */}
                    <span
                      className={`text-center font-forma text-xs sm:text-sm md:text-base ${
                        isHighlighted
                          ? "font-black text-[#0A0E1A]"
                          : "font-bold text-white/95"
                      }`}
                    >
                      {row.matches}
                    </span>

                    {/* W (Won) */}
                    <span
                      className={`text-center font-forma text-xs sm:text-sm md:text-base ${
                        isHighlighted
                          ? "font-black text-[#0A0E1A]"
                          : "font-bold text-white/95"
                      }`}
                    >
                      {row.won}
                    </span>

                    {/* L (Lost) */}
                    <span
                      className={`text-center font-forma text-xs sm:text-sm md:text-base ${
                        isHighlighted
                          ? "font-black text-[#0A0E1A]"
                          : "font-bold text-white/95"
                      }`}
                    >
                      {row.lost}
                    </span>

                    {/* N/R (Net Run Rate) */}
                    <span
                      className={`text-center font-forma text-[11px] sm:text-xs md:text-sm ${
                        isHighlighted
                          ? "font-black text-[#E64200]"
                          : "font-bold text-white/90"
                      }`}
                    >
                      {row.nrr}
                    </span>

                    {/* PTS (Points) */}
                    <span
                      className={`text-center font-forma text-xs sm:text-sm md:text-base ${
                        isHighlighted
                          ? "font-black text-[#E64200] text-sm sm:text-base md:text-lg"
                          : "font-extrabold text-white"
                      }`}
                    >
                      {row.points}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Table Legend / Footer Note */}
          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-white/80 font-forma">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-[#E64200] text-white text-[9px] font-black border border-white/40">
                  Q
                </span>
                <span className="font-medium">Qualified for Playoffs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">N/R:</span>
                <span className="font-medium">Net Run Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">PTS:</span>
                <span className="font-medium">Total Points</span>
              </div>
            </div>

            <div className="text-white/70 italic font-medium">
              Top 4 teams qualify for the playoff round
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
