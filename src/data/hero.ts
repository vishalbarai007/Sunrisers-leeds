export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  teamName: string;
  centerText: string;
  tagline: string;
  subheadline: string;
  quote: string;
  leftStats: HeroStat[];
  rightInfo: {
    venue: string;
    city: string;
    experience: string;
    format: string;
    nextMatch: {
      opponent: string;
      venue: string;
      countdownTarget: string;
    };
  };
  partners: string[];
  imageSrc: string;
}

export const heroData: HeroData = {
  teamName: "SUNRISERS LEEDS",
  centerText: "LEEDS",
  tagline: "READY TO PLAY WITH FIRE",
  subheadline: "The pride, passion, and championship heartbeat of Yorkshire cricket.",
  quote: "For us, cricket is more than boundaries and wickets. It's about chasing greatness, lighting up Headingley with fire, and leaving a legacy with every ball bowled.",
  leftStats: [
    { value: "124", label: "Matches played" },
    { value: "78", label: "Matches won" },
    { value: "63%", label: "Win rate" }
  ],
  rightInfo: {
    venue: "Headingley Stadium",
    city: "Leeds, United Kingdom",
    experience: "10+ Years in Elite Cricket",
    format: "The Hundred & T20 Blast",
    nextMatch: {
      opponent: "VS WELSH FIRE",
      venue: "Headingley, Leeds",
      countdownTarget: "04:18:32:10"
    }
  },
  partners: ["APEX GROUP", "CASTORE", "THE HUNDRED", "VITALITY"],
  imageSrc: "/images/team-hero-opt.jpg"
};
