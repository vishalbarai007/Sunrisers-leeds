export interface PointsTableEntry {
  rank: string;
  teamName: string;
  shortName: string;
  logoUrl: string;
  qualified?: boolean;
  matches: number;
  won: number;
  lost: number;
  nrr: string;
  points: number;
  form?: ("W" | "L" | "NR")[];
  isSunrisers?: boolean;
}

export const POINTS_TABLE_DATA: PointsTableEntry[] = [
  {
    rank: "01",
    teamName: "Royal Challengers Bangalore",
    shortName: "RCB",
    logoUrl: "/images/teamLogo/rcb.png",
    qualified: true,
    matches: 14,
    won: 9,
    lost: 5,
    nrr: "+0.744",
    points: 18,
    form: ["W", "W", "L", "W", "W"]
  },
  {
    rank: "02",
    teamName: "Gujarat Titans",
    shortName: "GT",
    logoUrl: "/images/teamLogo/gt.png",
    qualified: true,
    matches: 14,
    won: 9,
    lost: 5,
    nrr: "+0.695",
    points: 18,
    form: ["W", "L", "W", "W", "W"]
  },
  {
    rank: "03",
    teamName: "SunRisers Hyderabad",
    shortName: "SRH",
    logoUrl: "/images/teamLogo/srhLogo.svg",
    qualified: true,
    matches: 14,
    won: 9,
    lost: 5,
    nrr: "+0.524",
    points: 18,
    form: ["W", "W", "W", "L", "W"],
    isSunrisers: true
  },
  {
    rank: "04",
    teamName: "Rajasthan Royals",
    shortName: "RR",
    logoUrl: "/images/teamLogo/rr.png",
    qualified: true,
    matches: 14,
    won: 8,
    lost: 6,
    nrr: "+0.289",
    points: 16,
    form: ["L", "W", "L", "W", "W"]
  },
  {
    rank: "05",
    teamName: "Punjab Kings",
    shortName: "PBKS",
    logoUrl: "/images/teamLogo/pbks.png",
    qualified: false,
    matches: 14,
    won: 7,
    lost: 6,
    nrr: "+0.309",
    points: 15,
    form: ["W", "L", "W", "L", "W"]
  },
  {
    rank: "06",
    teamName: "Delhi Capitals",
    shortName: "DC",
    logoUrl: "/images/teamLogo/dc.png",
    qualified: false,
    matches: 14,
    won: 7,
    lost: 7,
    nrr: "-0.651",
    points: 14,
    form: ["L", "W", "W", "L", "L"]
  },
  {
    rank: "07",
    teamName: "Kolkata Knight Riders",
    shortName: "KKR",
    logoUrl: "/images/teamLogo/kkr.png",
    qualified: false,
    matches: 14,
    won: 6,
    lost: 7,
    nrr: "-0.147",
    points: 13,
    form: ["W", "L", "L", "W", "L"]
  },
  {
    rank: "08",
    teamName: "Chennai Super Kings",
    shortName: "CSK",
    logoUrl: "/images/teamLogo/csk.png",
    qualified: false,
    matches: 14,
    won: 6,
    lost: 8,
    nrr: "-0.345",
    points: 12,
    form: ["L", "L", "W", "L", "W"]
  },
  {
    rank: "09",
    teamName: "Mumbai Indians",
    shortName: "MI",
    logoUrl: "/images/teamLogo/mi.png",
    qualified: false,
    matches: 14,
    won: 4,
    lost: 10,
    nrr: "-0.564",
    points: 8,
    form: ["L", "L", "L", "W", "L"]
  },
  {
    rank: "10",
    teamName: "Lucknow Super Giants",
    shortName: "LSG",
    logoUrl: "/images/teamLogo/lsg.png",
    qualified: false,
    matches: 14,
    won: 4,
    lost: 10,
    nrr: "-0.666",
    points: 8,
    form: ["L", "W", "L", "L", "L"]
  }
];
