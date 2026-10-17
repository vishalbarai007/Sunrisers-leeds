export interface SponsorItem {
  id: string;
  name: string;
  category?: string;
  logoType?: "svg" | "text-mark";
  svgPath?: string;
  subtext?: string;
}

export const LEFT_SPONSORS: SponsorItem[] = [
  { id: "sp-1", name: "OKINII", category: "Dining Partner" },
  { id: "sp-2", name: "PORSCHE", subtext: "Centrum Twente", category: "Automotive" },
  { id: "sp-3", name: "RPM", subtext: "PARTNER", category: "Engineering" },
  { id: "sp-4", name: "M-TECH", category: "Performance" },
  { id: "sp-5", name: "BOKSMAN", category: "Logistics" },
  { id: "sp-6", name: "DIRECT SOCIALS", category: "Media Agency" },
  { id: "sp-7", name: "R&S", subtext: "HYDRAULIEK", category: "Industrial" },
  { id: "sp-8", name: "PROMAD", subtext: "DE PROJECTENBEDENKERS", category: "Development" },
  { id: "sp-9", name: "VBR", category: "Security" },
  { id: "sp-10", name: "MULLER", subtext: "RACING", category: "Motorsport" },
  { id: "sp-11", name: "KOOKABURRA", category: "Official Ball Partner" },
  { id: "sp-12", name: "GRAY-NICOLLS", category: "Batting Gear" },
  { id: "sp-13", name: "CASTORE", category: "Kit Manufacturer" },
  { id: "sp-14", name: "MEURS", category: "Equipment" }
];

export const RIGHT_SPONSORS: SponsorItem[] = [
  { id: "sp-15", name: "OCS", category: "Consulting" },
  { id: "sp-16", name: "BORING", category: "Apparel" },
  { id: "sp-17", name: "CLUB CLUB", category: "Hospitality" },
  { id: "sp-18", name: "D&B GROUP", category: "Facilities" },
  { id: "sp-19", name: "PROJECT TEAM", category: "Management" },
  { id: "sp-20", name: "WR RAPTOR", category: "Automotive" },
  { id: "sp-21", name: "CJPG", subtext: "Technical Maintenance", category: "Technical" },
  { id: "sp-22", name: "LEGALITAS", subtext: "ADVOCATEN", category: "Legal Partner" },
  { id: "sp-23", name: "BLUELEMON24", category: "Digital Solutions" },
  { id: "sp-24", name: "YOULYNQ.ME", category: "Communications" },
  { id: "sp-25", name: "{BI}XP", category: "Business Intelligence" },
  { id: "sp-26", name: "DRUMARKON", category: "Materials" },
  { id: "sp-27", name: "RED BULL", category: "Energy Partner" },
  { id: "sp-28", name: "MCCAFE", category: "Beverage Partner" }
];
