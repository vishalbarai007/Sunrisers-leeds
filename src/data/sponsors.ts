export interface SponsorItem {
  id: string;
  name: string;
  category?: string;
  logoId?: string;
  subtext?: string;
}

export const LEFT_SPONSORS: SponsorItem[] = [
  { id: "sp-castore", name: "CASTORE", logoId: "castore", category: "Kit Manufacturer" },
  { id: "sp-porsche", name: "PORSCHE", logoId: "porsche", subtext: "Automotive Partner", category: "Official Automotive" },
  { id: "sp-kookaburra", name: "KOOKABURRA", logoId: "kookaburra", category: "Official Match Ball" },
  { id: "sp-redbull", name: "RED BULL", logoId: "redbull", category: "Energy Partner" },
  { id: "sp-graynicolls", name: "GRAY-NICOLLS", logoId: "graynicolls", category: "Batting Gear" },
  { id: "sp-dream11", name: "DREAM11", logoId: "dream11", category: "Principal Partner" },
  { id: "sp-puma", name: "PUMA", logoId: "puma", category: "Athletic Footwear" },
  { id: "sp-dhl", name: "DHL", logoId: "dhl", category: "Official Logistics" },
  { id: "sp-tcl", name: "TCL", logoId: "tcl", category: "Official Display" },
  { id: "sp-bkt", name: "BKT TIRES", logoId: "bkt", category: "Official Tyre Partner" },
  { id: "sp-nb", name: "NEW BALANCE", logoId: "newbalance", category: "Equipment Partner" },
  { id: "sp-gulf", name: "GULF OIL", logoId: "gulfoil", category: "Lubricant Partner" },
  { id: "sp-boat", name: "boAt", logoId: "boat", category: "Audio Partner" },
  { id: "sp-fancode", name: "FANCODE", logoId: "fancode", category: "Merchandise & Stream" }
];

export const RIGHT_SPONSORS: SponsorItem[] = [
  { id: "sp-emirates", name: "EMIRATES", logoId: "emirates", category: "Official Airline" },
  { id: "sp-mrf", name: "MRF", logoId: "mrf", category: "Batting Partner" },
  { id: "sp-ceat", name: "CEAT", logoId: "ceat", category: "Timeout Partner" },
  { id: "sp-jio", name: "JIO 5G", logoId: "jio", category: "Digital Partner" },
  { id: "sp-monster", name: "MONSTER ENERGY", logoId: "monster", category: "Beverage Partner" },
  { id: "sp-spotify", name: "SPOTIFY", logoId: "spotify", category: "Music Partner" },
  { id: "sp-sg", name: "SG CRICKET", logoId: "sg", category: "Gear Manufacturer" },
  { id: "sp-toyota", name: "TOYOTA", logoId: "toyota", category: "Mobility Partner" },
  { id: "sp-aston", name: "ASTON MARTIN", logoId: "astonmartin", category: "Luxury Partner" },
  { id: "sp-sony", name: "SONY SPORTS", logoId: "sonysports", category: "Broadcast Partner" },
  { id: "sp-gatorade", name: "GATORADE", logoId: "gatorade", category: "Hydration Partner" },
  { id: "sp-oakley", name: "OAKLEY", logoId: "oakley", category: "Eyewear Partner" },
  { id: "sp-ua", name: "UNDER ARMOUR", logoId: "underarmour", category: "Training Apparel" },
  { id: "sp-sundirect", name: "SUN DIRECT", logoId: "sundirect", category: "Media Partner" }
];
