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
      className="relative w-full min-h-[70svh] bg-[#FFFFFF] text-[#0A0E1A] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden select-none border-t border-slate-200 z-10"
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
        FOREGROUND CONTACT FORM CARD
        Semi-transparent Sunrisers orange background with backdrop blur,
        following Nick Ho layout (Left: Title & Subtitle, Right: Form Fields + White Button).
      */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[1280px] min-h-[540px] sm:min-h-[640px] lg:min-h-[680px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#E64200] via-[#FF5500] to-[#C92F00] backdrop-blur-2xl backdrop-saturate-150 border border-white/35 shadow-[0_30px_90px_-15px_rgba(230,66,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)] p-6 sm:p-12 md:p-16 lg:p-20 text-white flex flex-col justify-center overflow-hidden"
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
