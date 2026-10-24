"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { mainNavItems, footerNavItems } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";
import { toast } from "sonner";
import {
  MapPin,
  Mail,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  CheckCircle2
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Welcome to the Orange Army! Subscription confirmed.");
    setEmail("");
  };

  return (
    <footer id="footer" className="relative w-full bg-gradient-to-br from-[#D93800] via-[#F4570B] to-[#C92F00] text-white pt-20 sm:pt-24 pb-8 overflow-hidden border-t border-[#FF7324]/40 select-none">
      {/* Subtle Architectural Grid Lines in background */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 pointer-events-none z-0">
        <div className="border-r border-white/[0.06] h-full" />
        <div className="border-r border-white/[0.06] h-full" />
        <div className="border-r border-white/[0.06] h-full" />
        <div className="border-r border-white/[0.06] h-full" />
        <div className="hidden md:block border-r border-white/[0.06] h-full" />
        <div className="hidden md:block border-r border-white/[0.06] h-full" />
        <div className="hidden md:block border-r border-white/[0.06] h-full" />
        <div className="hidden md:block h-full" />
      </div>

      {/* Consistent geometric dots watermark (36px x 36px) across orange backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-0"
        style={{
          backgroundImage:
            "radial-gradient(#000 1.2px, transparent 1.2px), radial-gradient(#000 1.2px, #FFFFFF 1.2px)",
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0, 18px 18px"
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Top 3-Column Content Layout (modeled after https://newhum-one.vercel.app/) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          {/* Column 1 (Left): Club Mission, Address, Email, and Social Medias */}
          <div className="md:col-span-2 lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-redzone text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wider leading-[1.08] mb-3">
                Experience Championship Passion
              </h2>
              <p className="font-forma text-sm sm:text-base text-white/85 leading-relaxed max-w-xl">
                Home of the Sunrisers Leeds Cricket Club. Uniting the Yorkshire community through championship ambition, elite cricket, and passionate sportsmanship.
              </p>
            </div>

            {/* Location & Email (No phone number as specified) */}
            <div className="space-y-3 font-forma text-xs sm:text-sm text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>Headingley Stadium, St Michael&apos;s Lane, Leeds LS6 3BU, UK</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:underline underline-offset-4 transition-all"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="font-forma text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 block mb-3">
                Connect With The Squad
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sunrisers Leeds Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#D93800] border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sunrisers Leeds Twitter"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#D93800] border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.contact.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sunrisers Leeds YouTube"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#D93800] border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Sunrisers Leeds LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#D93800] border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 (Center): Navigation Links */}
          <div className="md:col-span-1 lg:col-span-3 lg:pl-8">
            <span className="font-forma text-xs uppercase font-bold tracking-[0.25em] text-white/80 block mb-5">
              Navigation
            </span>
            <ul className="space-y-2.5 font-forma text-sm">
              {mainNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#contact"
                  className="text-white/85 hover:text-white hover:translate-x-1 inline-block transition-all font-semibold"
                >
                  Contact Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 (Right): Newsletter Subscription Option */}
          <div className="md:col-span-1 lg:col-span-4">
            <span className="font-forma text-xs uppercase font-bold tracking-[0.25em] text-white/80 block mb-5">
              Join The Orange Army
            </span>
            <p className="font-forma text-sm text-white/85 leading-relaxed mb-5">
              Subscribe for early-bird match ticket releases, squad announcements, and exclusive club updates delivered straight to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/15 border border-white/30 flex items-center gap-3 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span className="font-forma text-xs font-bold text-white">
                  You are now subscribed to the Sunrisers newsletter!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-white/15 border border-white/30 rounded-xl px-4 py-3.5 text-sm font-forma text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-[#D93800] hover:bg-white/95 font-redzone text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-98 group"
                >
                  <span>Subscribe to Newsletter</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 
          Giant Typography Wordmark across the Footer
          (Scroll-triggered rise & fade animation when scrolled into view)
        */}
        <div className="w-full flex items-center justify-center overflow-visible pt-4 pb-6 sm:pb-8 border-t border-white/15">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-redzone text-[10.5vw] sm:text-[11.2vw] md:text-[11.8vw] font-black uppercase text-white tracking-tight leading-[0.95] select-none text-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.3)] w-full block whitespace-nowrap will-change-transform"
            style={{ letterSpacing: "-0.02em" }}
          >
            SUNRISERS
          </motion.h1>
        </div>

        {/* Bottom Bar: Original Logo, Copyright, and Legal Policies */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-forma text-white/80">
          {/* Left: Original Sunrisers Logo & Copyright */}
          <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0 hover:scale-105 transition-transform">
              <Image
                src="/images/logo.svg"
                alt="Sunrisers Leeds"
                width={48}
                height={36}
                className="w-10 sm:w-12 h-auto object-contain drop-shadow-md"
              />
            </Link>
            <span>
              &copy; {new Date().getFullYear()} Sunrisers Leeds Cricket Club. All rights reserved.
            </span>
          </div>

          {/* Right: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-semibold text-white/90">
            {footerNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white hover:underline underline-offset-4 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Sports Club Disclaimer */}
        <div className="pt-4 text-center md:text-left text-[11px] font-forma text-white/60 leading-relaxed">
          Disclaimer: Sunrisers Leeds Cricket Club is an official sports team. Match schedules, venue allocations, and ticketing availability are subject to official ECB and tournament regulations.
        </div>
      </div>
    </footer>
  );
}
