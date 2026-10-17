export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  theme: "premium" | "funky" | "minimal" | "bold-tech" | "sports";
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
    socials: {
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      facebook?: string;
      youtube?: string;
    };
  };
}

export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundMedia?: {
    type: "image" | "video";
    url: string;
    poster?: string;
  };
}

export interface MatchFixture {
  id: string;
  opponent: string;
  opponentLogo?: string;
  date: string;
  time: string;
  venue: string;
  matchType: string; // "T20" | "One Day" | "Championship"
  ticketUrl?: string;
  result?: string;
}

export interface PlayerProfile {
  id: string;
  name: string;
  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper";
  jerseyNumber?: number;
  imageUrl: string;
  battingStyle?: string;
  bowlingStyle?: string;
  stats?: {
    matches?: number;
    runs?: number;
    wickets?: number;
    average?: string;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
