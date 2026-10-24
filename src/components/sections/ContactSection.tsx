"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been received by Sunrisers Leeds.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    }, 500);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-[100svh] bg-[#FFFFFF] text-[#0A0E1A] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden select-none border-t border-slate-200 z-10"
    >
      {/* Subtle 8-Column Architectural Grid Lines (matching website sections) */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-r border-slate-900/[0.05] ${
              i >= 4 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>

      {/*
        GIANT FULL-HEIGHT BACKGROUND "CONTACT" TYPOGRAPHY (Nick Ho Motorsports SVG)
        Covers 100% width and 100% height of the component in Sunrisers Orange Gradient,
        fading smoothly from the bottom into the white background.
      */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1386 670"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            {/* Full-height Sunrisers Orange Gradient unified across viewBox (0 -> 670) fading at bottom */}
            <linearGradient
              id="sunrisersContactGrad"
              gradientUnits="userSpaceOnUse"
              x1="693"
              y1="0"
              x2="693"
              y2="670"
            >
              <stop offset="0%" stopColor="#E64200" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#FF5500" stopOpacity="0.82" />
              <stop offset="68%" stopColor="#FF7D19" stopOpacity="0.45" />
              <stop offset="90%" stopColor="#FE9A2A" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* T */}
          <path
            d="M1386 132.005H1342.3V661.816H1255.92V132.005H1212.22V8.08252H1386V132.005Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* C */}
          <path
            d="M1206.44 420.258V508.26C1206.44 611.529 1167.32 669.898 1111.42 669.898H1106.85C1051.46 669.898 1010.81 611.529 1010.81 508.26V161.637C1010.81 58.3691 1051.46 0 1107.36 0H1111.93C1167.32 0 1206.44 58.3691 1206.44 161.637V234.374H1123.11V151.76C1123.11 130.208 1117.52 120.33 1110.91 120.33H1109.39C1102.27 120.33 1097.19 129.31 1097.19 151.76V518.138C1097.19 540.588 1102.27 549.568 1109.39 549.568H1110.91C1117.52 549.568 1123.11 539.69 1123.11 518.138V420.258H1206.44Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* A */}
          <path
            d="M880.625 661.816H796.274L840.482 8.08252H963.959L1009.69 661.816H920.259L916.702 587.284H883.165L880.625 661.816ZM898.917 171.516L887.738 463.362H911.621L898.917 171.516Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* T */}
          <path
            d="M812.86 132.005H769.161V661.816H682.778V132.005H639.078V8.08252H812.86V132.005Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* N */}
          <path
            d="M537.682 661.816L505.161 401.4L496.015 321.48V661.816H421.319V8.08252H513.291L543.779 257.723L553.434 343.929V8.08252H628.129V661.816H537.682Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* O */}
          <path
            d="M208.911 508.26V161.637C208.911 58.3691 250.07 0 305.964 0H310.538C365.924 0 407.083 58.3691 407.083 161.637V508.26C407.083 611.529 365.924 669.898 310.538 669.898H305.964C250.07 669.898 208.911 611.529 208.911 508.26ZM321.208 518.138V151.76C321.208 130.208 315.619 120.33 309.013 120.33H307.489C300.375 120.33 295.294 129.31 295.294 151.76V518.138C295.294 540.588 300.375 549.568 307.489 549.568H309.013C315.619 549.568 321.208 539.69 321.208 518.138Z"
            fill="url(#sunrisersContactGrad)"
          />
          {/* C */}
          <path
            d="M195.632 420.258V508.26C195.632 611.529 156.505 669.898 100.611 669.898H96.0374C40.6507 669.898 0 611.529 0 508.26V161.637C0 58.3691 40.6507 0 96.5455 0H101.119C156.505 0 195.632 58.3691 195.632 161.637V234.374H112.298V151.76C112.298 130.208 106.708 120.33 100.102 120.33H98.5781C91.4642 120.33 86.3829 129.31 86.3829 151.76V518.138C86.3829 540.588 91.4642 549.568 98.5781 549.568H100.102C106.708 549.568 112.298 539.69 112.298 518.138V420.258H195.632Z"
            fill="url(#sunrisersContactGrad)"
          />
        </svg>

        {/* Bottom-to-Top White Fade Mask so the giant CONTACT text dissolves seamlessly at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/70 to-transparent pointer-events-none" />
      </div>

      {/*
        FOREGROUND CONTACT FORM CARD
        Semi-transparent Sunrisers orange background with backdrop blur,
        following Nick Ho layout (Left: Title & Subtitle, Right: Form Fields + White Button).
      */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1280px] min-h-[540px] sm:min-h-[640px] lg:min-h-[680px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#E64200]/60 via-[#FF5500]/45 to-[#C92F00]/55 backdrop-blur-2xl backdrop-saturate-150 border border-white/35 shadow-[0_30px_90px_-15px_rgba(230,66,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] p-6 sm:p-12 md:p-16 lg:p-20 text-white flex flex-col justify-center overflow-hidden"
      >
        {/* Top specular reflection for glass finish */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Subtext */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <h2 className="font-redzone text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide text-white leading-[0.92]">
              CONTACT
            </h2>
            <p className="font-forma text-sm sm:text-base md:text-lg text-white/90 mt-3 sm:mt-6 font-medium leading-relaxed max-w-sm">
              Ready to support or just have questions ?
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            {submitted ? (
              <div className="rounded-2xl bg-white/15 border border-white/30 p-8 sm:p-12 flex flex-col items-start gap-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-white shrink-0" />
                  <h3 className="font-redzone text-2xl sm:text-3xl uppercase tracking-wide text-white">
                    Message Received
                  </h3>
                </div>
                <p className="font-forma text-base sm:text-lg text-white/90 leading-relaxed">
                  Thank you! Your message has been received by the Sunrisers Leeds team. We will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#D93800] hover:bg-white/95 font-redzone text-sm uppercase tracking-wider shadow-md transition-all cursor-pointer font-bold"
                >
                  <span>Send Another Message</span>
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-first-name"
                      className="font-forma text-xs sm:text-sm font-bold text-white/95 tracking-wide"
                    >
                      First Name
                    </label>
                    <input
                      id="contact-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                      className="w-full rounded-lg bg-white/20 border border-white/30 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-forma text-white placeholder:text-white/65 focus:outline-none focus:bg-white/25 focus:border-white transition-all shadow-inner"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-last-name"
                      className="font-forma text-xs sm:text-sm font-bold text-white/95 tracking-wide"
                    >
                      Last Name
                    </label>
                    <input
                      id="contact-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      required
                      className="w-full rounded-lg bg-white/20 border border-white/30 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-forma text-white placeholder:text-white/65 focus:outline-none focus:bg-white/25 focus:border-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-forma text-xs sm:text-sm font-bold text-white/95 tracking-wide"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@gmail.com"
                    required
                    className="w-full rounded-lg bg-white/20 border border-white/30 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-forma text-white placeholder:text-white/65 focus:outline-none focus:bg-white/25 focus:border-white transition-all shadow-inner"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-forma text-xs sm:text-sm font-bold text-white/95 tracking-wide"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message just here..."
                    required
                    className="w-full rounded-lg bg-white/20 border border-white/30 px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-forma text-white placeholder:text-white/65 focus:outline-none focus:bg-white/25 focus:border-white transition-all resize-y min-h-[160px] sm:min-h-[190px] shadow-inner"
                  />
                </div>

                {/* White Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg bg-[#FFFFFF] text-[#D93800] hover:bg-white/95 font-redzone text-sm sm:text-base font-black uppercase tracking-wider shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT"}</span>
                    <ChevronsRight
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.8}
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
