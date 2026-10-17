import React from "react";
import { SponsorItem } from "@/data/sponsors";

export function CastoreLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={className} fill="currentColor">
      <path d="M46 12L59 3L57 16L48 13Z" />
      <path d="M74 12L61 3L63 16L72 13Z" />
      <path d="M50 14L60 17L59 20L48 16Z" />
      <path d="M70 14L60 17L61 20L72 16Z" />
      <text x="60" y="29" textAnchor="middle" fontWeight="800" fontSize="9" letterSpacing="3.5" fontFamily="system-ui, sans-serif">
        CASTORE
      </text>
    </svg>
  );
}

export function PorscheLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 28" className={className} fill="currentColor">
      <text x="65" y="19" textAnchor="middle" fontWeight="900" fontSize="13" letterSpacing="5" fontFamily="system-ui, sans-serif">
        PORSCHE
      </text>
    </svg>
  );
}

export function RedBullLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 34" className={className} fill="none">
      <circle cx="65" cy="13" r="9" fill="#FFCB05" />
      <path d="M46 14C43 12 39 10 35 12C32 13 30 16 32 18C34 19 36 18 38 17C40 19 44 19 47 18C50 17 53 15 55 13C53 13 50 12 48 13Z" fill="#DC2626" />
      <path d="M35 12C33 10 30 9 27 10C26 11 28 12 30 12C28 14 29 16 31 17Z" fill="#DC2626" />
      <path d="M84 14C87 12 91 10 95 12C98 13 100 16 98 18C96 19 94 18 92 17C90 19 86 19 83 18C80 17 77 15 75 13C77 13 80 12 82 13Z" fill="#DC2626" />
      <path d="M95 12C97 10 100 9 103 10C104 11 102 12 100 12C102 14 101 16 99 17Z" fill="#DC2626" />
      <text x="65" y="29" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="10" letterSpacing="1" fontFamily="system-ui, sans-serif">
        Red Bull
      </text>
    </svg>
  );
}

export function KookaburraLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 30" className={className} fill="currentColor">
      <path d="M60 3C57 3 55 5 55 7C55 8 52 8 49 9C47 9.5 48 11 51 11C53 11 55 10.5 56 11C57 13 59 14 62 14C65 14 67 12 67 9C67 6 64 3 60 3ZM61 6.5C60.5 6.5 60 6.1 60 5.5C60 4.9 60.5 4.5 61 4.5C61.5 4.5 62 4.9 62 5.5C62 6.1 61.5 6.5 61 6.5Z" />
      <text x="65" y="25" textAnchor="middle" fontWeight="900" fontSize="10" letterSpacing="2.5" fontFamily="system-ui, sans-serif">
        KOOKABURRA
      </text>
    </svg>
  );
}

export function GrayNicollsLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 30" className={className} fill="currentColor">
      <g transform="translate(50, 3)">
        <polygon points="0,5 7,0 14,5 7,10" fill="#DC2626" />
        <polygon points="16,5 23,0 30,5 23,10" fill="#1E293B" />
      </g>
      <text x="65" y="25" textAnchor="middle" fontWeight="800" fontSize="9.5" letterSpacing="2" fontFamily="system-ui, sans-serif">
        GRAY-NICOLLS
      </text>
    </svg>
  );
}

export function Dream11Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 125 30" className={className} fill="none">
      <g transform="translate(18, 4)">
        <path d="M0 2L10 0L20 2V12C20 16 10 20 10 20C10 20 0 16 0 12Z" fill="#DC2626" />
        <text x="10" y="14" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="11" fontFamily="system-ui, sans-serif">
          D
        </text>
      </g>
      <text x="44" y="19" fill="currentColor" fontWeight="900" fontSize="13" letterSpacing="0.5" fontFamily="system-ui, sans-serif">
        DREAM11
      </text>
    </svg>
  );
}

export function PumaLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 28" className={className} fill="currentColor">
      <path d="M38 8C36 6 33 5 30 5.5C27 6 25 8.5 26.5 10C27.5 9 30 8.5 32 9C29 10.5 28 13 29 15C31 16.5 34 15 36 13.5C38 12 40 9.5 38 8Z" />
      <text x="68" y="20" textAnchor="middle" fontWeight="900" fontSize="15" letterSpacing="2" fontFamily="system-ui, sans-serif">
        PUMA
      </text>
    </svg>
  );
}

export function DhlLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 28" className={className} fill="none">
      <text x="60" y="17" textAnchor="middle" fill="#DC2626" fontStyle="italic" fontWeight="900" fontSize="17" letterSpacing="3" fontFamily="system-ui, sans-serif">
        DHL
      </text>
      <line x1="28" y1="21" x2="92" y2="21" stroke="#DC2626" strokeWidth="1.8" />
      <line x1="36" y1="24" x2="84" y2="24" stroke="#DC2626" strokeWidth="1.2" />
    </svg>
  );
}

export function TclLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 28" className={className} fill="none">
      <text x="55" y="20" textAnchor="middle" fill="#DC2626" fontWeight="900" fontSize="18" letterSpacing="3" fontFamily="system-ui, sans-serif">
        TCL
      </text>
      <circle cx="85" cy="11" r="2.5" fill="#DC2626" />
    </svg>
  );
}

export function BktLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <polygon points="55,3 88,15 55,27 22,15" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <text x="55" y="19" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="12" letterSpacing="2" fontFamily="system-ui, sans-serif">
        BKT
      </text>
    </svg>
  );
}

export function NewBalanceLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="currentColor">
      <g transform="translate(45, 3) scale(0.8)">
        <path d="M0 0H14L22 14V0H28V22H14L6 8V22H0V0Z" />
        <polygon points="2,4 10,4 8,7 0,7" fill="#FFFFFF" />
        <polygon points="4,10 12,10 10,13 2,13" fill="#FFFFFF" />
      </g>
      <text x="60" y="27" textAnchor="middle" fontWeight="800" fontSize="8" letterSpacing="2" fontFamily="system-ui, sans-serif">
        new balance
      </text>
    </svg>
  );
}

export function GulfLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <circle cx="36" cy="15" r="12" fill="#F97316" />
      <path d="M24 15A12 12 0 0 0 48 15Z" fill="#0284C7" />
      <text x="36" y="16" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">
        Gulf
      </text>
      <text x="74" y="20" fill="currentColor" fontWeight="800" fontSize="13" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        GULF
      </text>
    </svg>
  );
}

export function BoatLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="currentColor">
      <polygon points="30,6 30,19 38,19" />
      <polygon points="27,9 27,19 21,19" />
      <text x="66" y="20" textAnchor="middle" fontWeight="800" fontSize="14" letterSpacing="1" fontFamily="system-ui, sans-serif">
        bo<tspan fill="#DC2626">A</tspan>t
      </text>
    </svg>
  );
}

export function FanCodeLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <polygon points="26,6 40,15 26,24" fill="#F97316" />
      <text x="72" y="20" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="11" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        FANCODE
      </text>
    </svg>
  );
}

export function EmiratesLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <text x="60" y="13" textAnchor="middle" fill="#DC2626" fontStyle="italic" fontSize="9" letterSpacing="1" fontFamily="serif">
        Fly
      </text>
      <text x="60" y="25" textAnchor="middle" fill="#DC2626" fontWeight="900" fontSize="13.5" letterSpacing="2" fontFamily="serif">
        Emirates
      </text>
    </svg>
  );
}

export function MrfLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <rect x="20" y="4" width="70" height="22" rx="3" fill="#DC2626" />
      <text x="55" y="20" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14" letterSpacing="3" fontFamily="system-ui, sans-serif">
        MRF
      </text>
    </svg>
  );
}

export function CeatLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <text x="38" y="20" textAnchor="middle" fill="#2563EB" fontWeight="900" fontSize="16" letterSpacing="1" fontFamily="system-ui, sans-serif">
        CE
      </text>
      <text x="68" y="20" textAnchor="middle" fill="#EA580C" fontWeight="900" fontSize="16" letterSpacing="1" fontFamily="system-ui, sans-serif">
        AT
      </text>
    </svg>
  );
}

export function JioLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <circle cx="34" cy="15" r="11" fill="#0284C7" />
      <text x="34" y="19" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="12" fontFamily="system-ui, sans-serif">
        Jio
      </text>
      <text x="70" y="19" fill="currentColor" fontWeight="800" fontSize="11" letterSpacing="1" fontFamily="system-ui, sans-serif">
        5G
      </text>
    </svg>
  );
}

export function MonsterLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <g transform="translate(42, 2)">
        <path d="M4 20L4 2C5 5 7 8 7 10L7 20Z" fill="#22C55E" />
        <path d="M11 22L11 0C12 3 14 7 14 12L14 22Z" fill="#22C55E" />
        <path d="M18 18L18 4C19 7 21 9 21 13L21 18Z" fill="#22C55E" />
      </g>
      <text x="55" y="28" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="7" letterSpacing="2" fontFamily="system-ui, sans-serif">
        MONSTER
      </text>
    </svg>
  );
}

export function SpotifyLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <circle cx="32" cy="15" r="11" fill="#1DB954" />
      <path d="M26 12C29 10.5 35 11 38 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 15C30 14 34 14.5 37 16" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 18C31 17 33.5 17.5 35.5 18.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
      <text x="72" y="20" textAnchor="middle" fill="currentColor" fontWeight="800" fontSize="12" letterSpacing="0.8" fontFamily="system-ui, sans-serif">
        Spotify
      </text>
    </svg>
  );
}

export function SgCricketLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="none">
      <rect x="25" y="4" width="60" height="22" rx="11" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <text x="55" y="20" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="14" letterSpacing="3" fontFamily="system-ui, sans-serif">
        SG
      </text>
    </svg>
  );
}

export function ToyotaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={className} fill="currentColor">
      <g transform="translate(60, 10) scale(0.6)">
        <ellipse cx="0" cy="0" rx="18" ry="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="0" cy="-2" rx="7" ry="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="0" cy="-4" rx="13" ry="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      </g>
      <text x="60" y="27" textAnchor="middle" fontWeight="900" fontSize="9.5" letterSpacing="3" fontFamily="system-ui, sans-serif">
        TOYOTA
      </text>
    </svg>
  );
}

export function AstonMartinLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 30" className={className} fill="none">
      <path d="M25 10Q65 3 105 10Q65 14 25 10Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="35" y1="9" x2="95" y2="9" stroke="currentColor" strokeWidth="0.8" />
      <rect x="42" y="6" width="46" height="8" rx="1" fill="#047857" />
      <text x="65" y="12" textAnchor="middle" fill="#FFFFFF" fontWeight="800" fontSize="4.5" letterSpacing="1" fontFamily="system-ui, sans-serif">
        ASTON MARTIN
      </text>
      <text x="65" y="25" textAnchor="middle" fill="currentColor" fontWeight="800" fontSize="8" letterSpacing="2.5" fontFamily="system-ui, sans-serif">
        ASTON MARTIN
      </text>
    </svg>
  );
}

export function GatoradeLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <g transform="translate(24, 3)">
        <text x="12" y="20" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="20" fontFamily="system-ui, sans-serif">
          G
        </text>
        <polygon points="16,2 9,12 13,12 9,22 18,10 14,10" fill="#F97316" />
      </g>
      <text x="72" y="19" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="10.5" letterSpacing="1.2" fontFamily="system-ui, sans-serif">
        GATORADE
      </text>
    </svg>
  );
}

export function OakleyLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 30" className={className} fill="currentColor">
      <path d="M55 5C42 5 36 9 36 14C36 19 42 23 55 23C68 23 74 19 74 14C74 9 68 5 55 5ZM55 19C45 19 43 16 43 14C43 12 45 9 55 9C65 9 67 12 67 14C67 16 65 19 55 19Z" />
      <text x="55" y="29" textAnchor="middle" fontWeight="800" fontSize="6.5" letterSpacing="2.5" fontFamily="system-ui, sans-serif">
        OAKLEY
      </text>
    </svg>
  );
}

export function UnderArmourLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 32" className={className} fill="currentColor">
      <g transform="translate(60, 9) scale(0.55)">
        <path d="M-12 -8C-12 4 0 10 0 10C0 10 12 4 12 -8H7C7 1 0 5 0 5C0 5 -7 1 -7 -8Z" />
        <path d="M-12 8C-12 -4 0 -10 0 -10C0 -10 12 -4 12 8H7C7 -1 0 -5 0 -5C0 -5 -7 -1 -7 8Z" />
      </g>
      <text x="60" y="27" textAnchor="middle" fontWeight="800" fontSize="7.5" letterSpacing="2" fontFamily="system-ui, sans-serif">
        UNDER ARMOUR
      </text>
    </svg>
  );
}

export function SonySportsLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="currentColor">
      <text x="60" y="15" textAnchor="middle" fontWeight="900" fontSize="13" letterSpacing="2.5" fontFamily="serif">
        SONY
      </text>
      <text x="60" y="26" textAnchor="middle" fill="#EA580C" fontWeight="800" fontSize="7.5" letterSpacing="2" fontFamily="system-ui, sans-serif">
        SPORTS TEN
      </text>
    </svg>
  );
}

export function SunDirectLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} fill="none">
      <g transform="translate(32, 15)">
        <circle cx="0" cy="0" r="6" fill="#F97316" />
        <line x1="0" y1="-10" x2="0" y2="-8" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="-7" y1="-7" x2="-5.5" y2="-5.5" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="-7" x2="5.5" y2="-5.5" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <text x="72" y="15" textAnchor="middle" fill="currentColor" fontWeight="900" fontSize="10" letterSpacing="1" fontFamily="system-ui, sans-serif">
        SUN
      </text>
      <text x="72" y="24" textAnchor="middle" fill="#F97316" fontWeight="800" fontSize="7.5" letterSpacing="2" fontFamily="system-ui, sans-serif">
        DIRECT
      </text>
    </svg>
  );
}

/** Fallback stylized logo for any other brand name or legacy ID */
export function GenericBrandLogo({ name, className = "h-7 w-auto" }: { name: string; className?: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <svg viewBox="0 0 120 30" className={className} fill="currentColor">
      <g transform="translate(24, 5)">
        <rect x="0" y="0" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <text x="10" y="14" textAnchor="middle" fontWeight="900" fontSize="9" fontFamily="system-ui, sans-serif">
          {initials}
        </text>
      </g>
      <text x="68" y="19" textAnchor="middle" fontWeight="900" fontSize="10.5" letterSpacing="1.5" fontFamily="system-ui, sans-serif">
        {name.length > 9 ? name.slice(0, 9) + "." : name}
      </text>
    </svg>
  );
}

/** Unified SponsorLogo selector matching ID, logoId, or brand name */
export function SponsorLogo({ item, className = "h-7 sm:h-8 w-auto max-w-[125px] object-contain" }: { item: SponsorItem; className?: string }) {
  const key = (item.logoId || item.id || item.name).toLowerCase().replace(/[^a-z0-9]/g, "");

  if (key.includes("castore")) return <CastoreLogo className={className} />;
  if (key.includes("porsche")) return <PorscheLogo className={className} />;
  if (key.includes("redbull")) return <RedBullLogo className={className} />;
  if (key.includes("kookaburra")) return <KookaburraLogo className={className} />;
  if (key.includes("graynicolls") || key.includes("gray")) return <GrayNicollsLogo className={className} />;
  if (key.includes("dream11")) return <Dream11Logo className={className} />;
  if (key.includes("puma")) return <PumaLogo className={className} />;
  if (key.includes("dhl")) return <DhlLogo className={className} />;
  if (key.includes("tcl")) return <TclLogo className={className} />;
  if (key.includes("bkt")) return <BktLogo className={className} />;
  if (key.includes("newbalance") || key.includes("nb")) return <NewBalanceLogo className={className} />;
  if (key.includes("gulf") || key.includes("gulfoil")) return <GulfLogo className={className} />;
  if (key.includes("boat")) return <BoatLogo className={className} />;
  if (key.includes("fancode")) return <FanCodeLogo className={className} />;
  if (key.includes("emirates")) return <EmiratesLogo className={className} />;
  if (key.includes("mrf")) return <MrfLogo className={className} />;
  if (key.includes("ceat")) return <CeatLogo className={className} />;
  if (key.includes("jio")) return <JioLogo className={className} />;
  if (key.includes("monster")) return <MonsterLogo className={className} />;
  if (key.includes("spotify")) return <SpotifyLogo className={className} />;
  if (key.includes("sg") || key.includes("sgcricket")) return <SgCricketLogo className={className} />;
  if (key.includes("toyota")) return <ToyotaLogo className={className} />;
  if (key.includes("aston") || key.includes("astonmartin")) return <AstonMartinLogo className={className} />;
  if (key.includes("gatorade")) return <GatoradeLogo className={className} />;
  if (key.includes("oakley")) return <OakleyLogo className={className} />;
  if (key.includes("underarmour") || key.includes("ua")) return <UnderArmourLogo className={className} />;
  if (key.includes("sony") || key.includes("sonysports")) return <SonySportsLogo className={className} />;
  if (key.includes("sundirect") || key.includes("sun")) return <SunDirectLogo className={className} />;

  // Legacy mappings from old placeholders
  if (key.includes("sp1") || key.includes("okinii")) return <GenericBrandLogo name="OKINII" className={className} />;
  if (key.includes("sp3") || key.includes("rpm")) return <GenericBrandLogo name="RPM" className={className} />;
  if (key.includes("sp4") || key.includes("mtech")) return <GenericBrandLogo name="M-TECH" className={className} />;
  if (key.includes("sp10") || key.includes("muller")) return <GenericBrandLogo name="MULLER" className={className} />;

  return <GenericBrandLogo name={item.name} className={className} />;
}
