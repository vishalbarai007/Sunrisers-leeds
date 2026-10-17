export interface TeamScore {
  runs: number;
  wickets: number;
  overs: number | string;
  isBatting?: boolean;
}

export interface FixtureTeam {
  teamId: string;
  name: string;
  shortName: string;
  logoUrl: string;
  score: TeamScore | null;
}

export interface FixtureItem {
  id: string;
  matchName: string;
  homeTeam: FixtureTeam;
  awayTeam: FixtureTeam;
  venue: string;
  city: string;
  result?: string;
  scheduledAt: string;
  status: "COMPLETED" | "LIVE" | "UPCOMING";
  isLive: boolean;
  season: string;
}

export const TEAM_LOGOS: Record<string, string> = {
  CSK: "/images/teamLogo/csk.png",
  DC: "/images/teamLogo/dc.png",
  GT: "/images/teamLogo/gt.png",
  KKR: "/images/teamLogo/kkr.png",
  LSG: "/images/teamLogo/lsg.png",
  MI: "/images/teamLogo/mi.png",
  PBKS: "/images/teamLogo/pbks.png",
  RCB: "/images/teamLogo/rcb.png",
  RR: "/images/teamLogo/rr.png",
  SRH: "/images/teamLogo/srhLogo.svg"
};

export function getTeamLogoUrl(shortName?: string, fallbackUrl?: string): string {
  const key = (shortName ?? "").trim().toUpperCase();
  return TEAM_LOGOS[key] ?? fallbackUrl ?? "/images/teamLogo/srhLogo.svg";
}

export function formatTeamDisplayName(name: string): string {
  return name === "Sunrisers Hyderabad" ? "SunRisers Hyderabad" : name;
}

/**
 * Converts UTC ISO scheduledAt into IST (+05:30) date (YYYY-MM-DD) and time (HH:mm)
 * matching sunrisershyderabad.in's exact splitScheduledAt helper.
 */
export function splitScheduledAt(scheduledAt: string): { date: string; time: string } {
  if (!scheduledAt) return { date: "", time: "" };
  const d = new Date(scheduledAt);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };
  // +5 hours 30 minutes (19800000 ms)
  const ist = new Date(d.getTime() + 19800000);
  const year = ist.getUTCFullYear();
  const month = String(ist.getUTCMonth() + 1).padStart(2, "0");
  const day = String(ist.getUTCDate()).padStart(2, "0");
  const hours = String(ist.getUTCHours()).padStart(2, "0");
  const minutes = String(ist.getUTCMinutes()).padStart(2, "0");
  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`
  };
}

/**
 * Formats YYYY-MM-DD as "May 27, Wed" (displayed uppercase in date pills)
 */
export function formatDatePill(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const weekday = d.toLocaleString("en-US", { weekday: "short" });
  return `${month} ${day}, ${weekday}`;
}

export function convertTimeTo12Hour(timeStr: string): string {
  if (!timeStr) return "";
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  const hour12 = (h % 12 || 12).toString().padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  return `${hour12}:${mStr}${ampm}`;
}

/**
 * Formats date and time as "Wednesday, 27th May 2026 07:30pm"
 */
export function formatDateAndTime(dateStr: string, timeStr: string): string {
  if (!dateStr) return "TBA";
  const d = new Date(`${dateStr}T00:00:00`);
  const weekday = d.toLocaleString("en-US", { weekday: "long" });
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();

  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  const ordinal = day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);

  return `${weekday}, ${ordinal} ${month} ${year} ${convertTimeTo12Hour(timeStr)}`;
}

export const FIXTURES_DATA: FixtureItem[] = [
  {
    id: "fixture_2026_69666",
    matchName: "Eliminator",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 196, wickets: 10, overs: 19.2, isBatting: false }
    },
    awayTeam: {
      teamId: "7",
      name: "Rajasthan Royals",
      shortName: "RR",
      logoUrl: "/images/teamLogo/rr.png",
      score: { runs: 243, wickets: 8, overs: 20, isBatting: false }
    },
    venue: "Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur",
    city: "Chandigarh",
    result: "Rajasthan Royals won the match.",
    scheduledAt: "2026-05-27T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69661",
    matchName: "67th Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 255, wickets: 4, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "8",
      name: "Royal Challengers Bengaluru",
      shortName: "RCB",
      logoUrl: "/images/teamLogo/rcb.png",
      score: { runs: 200, wickets: 4, overs: 20, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-05-22T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69657",
    matchName: "63rd Match",
    homeTeam: {
      teamId: "2",
      name: "Chennai Super Kings",
      shortName: "CSK",
      logoUrl: "/images/teamLogo/csk.png",
      score: { runs: 180, wickets: 7, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 181, wickets: 5, overs: 19, isBatting: false }
    },
    venue: "MA Chidambaram Stadium",
    city: "Chennai",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-05-18T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69650",
    matchName: "56th Match",
    homeTeam: {
      teamId: "1976",
      name: "Gujarat Titans",
      shortName: "GT",
      logoUrl: "/images/teamLogo/gt.png",
      score: { runs: 168, wickets: 5, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 86, wickets: 10, overs: 14.5, isBatting: false }
    },
    venue: "Narendra Modi Stadium",
    city: "Ahmedabad",
    result: "Gujarat Titans won the match.",
    scheduledAt: "2026-05-12T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69643",
    matchName: "49th Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 235, wickets: 4, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "4",
      name: "Punjab Kings",
      shortName: "PBKS",
      logoUrl: "/images/teamLogo/pbks.png",
      score: { runs: 202, wickets: 7, overs: 20, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-05-06T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69639",
    matchName: "45th Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 165, wickets: 10, overs: 19, isBatting: false }
    },
    awayTeam: {
      teamId: "5",
      name: "Kolkata Knight Riders",
      shortName: "KKR",
      logoUrl: "/images/teamLogo/kkr.png",
      score: { runs: 169, wickets: 3, overs: 18.2, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Kolkata Knight Riders won the match.",
    scheduledAt: "2026-05-03T10:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69635",
    matchName: "41st Match",
    homeTeam: {
      teamId: "6",
      name: "Mumbai Indians",
      shortName: "MI",
      logoUrl: "/images/teamLogo/mi.png",
      score: { runs: 243, wickets: 5, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 249, wickets: 4, overs: 18.4, isBatting: false }
    },
    venue: "Wankhede Stadium",
    city: "Mumbai",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-29T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69630",
    matchName: "36th Match",
    homeTeam: {
      teamId: "7",
      name: "Rajasthan Royals",
      shortName: "RR",
      logoUrl: "/images/teamLogo/rr.png",
      score: { runs: 228, wickets: 6, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 229, wickets: 5, overs: 18.3, isBatting: false }
    },
    venue: "Sawai Mansingh Stadium",
    city: "Jaipur",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-25T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69625",
    matchName: "31st Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 242, wickets: 2, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "3",
      name: "Delhi Capitals",
      shortName: "DC",
      logoUrl: "/images/teamLogo/dc.png",
      score: { runs: 195, wickets: 9, overs: 20, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-21T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69621",
    matchName: "27th Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 194, wickets: 9, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "2",
      name: "Chennai Super Kings",
      shortName: "CSK",
      logoUrl: "/images/teamLogo/csk.png",
      score: { runs: 184, wickets: 8, overs: 20, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-18T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69615",
    matchName: "21st Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 216, wickets: 6, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "7",
      name: "Rajasthan Royals",
      shortName: "RR",
      logoUrl: "/images/teamLogo/rr.png",
      score: { runs: 159, wickets: 10, overs: 19, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-13T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69534",
    matchName: "17th Match",
    homeTeam: {
      teamId: "4",
      name: "Punjab Kings",
      shortName: "PBKS",
      logoUrl: "/images/teamLogo/pbks.png",
      score: { runs: 223, wickets: 4, overs: 18.5, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 219, wickets: 6, overs: 20, isBatting: false }
    },
    venue: "Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur",
    city: "Chandigarh",
    result: "Punjab Kings won the match.",
    scheduledAt: "2026-04-11T10:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69527",
    matchName: "10th Match",
    homeTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 156, wickets: 9, overs: 20, isBatting: false }
    },
    awayTeam: {
      teamId: "1979",
      name: "Lucknow Super Giants",
      shortName: "LSG",
      logoUrl: "/images/teamLogo/lsg.png",
      score: { runs: 160, wickets: 5, overs: 19.5, isBatting: false }
    },
    venue: "Rajiv Gandhi International Stadium",
    city: "Hyderabad",
    result: "Lucknow Super Giants won the match.",
    scheduledAt: "2026-04-05T10:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69523",
    matchName: "6th Match",
    homeTeam: {
      teamId: "5",
      name: "Kolkata Knight Riders",
      shortName: "KKR",
      logoUrl: "/images/teamLogo/kkr.png",
      score: { runs: 161, wickets: 10, overs: 16, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 226, wickets: 8, overs: 20, isBatting: false }
    },
    venue: "Eden Gardens",
    city: "Kolkata",
    result: "Sunrisers Hyderabad won the match.",
    scheduledAt: "2026-04-02T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  },
  {
    id: "fixture_2026_69518",
    matchName: "1st Match",
    homeTeam: {
      teamId: "8",
      name: "Royal Challengers Bengaluru",
      shortName: "RCB",
      logoUrl: "/images/teamLogo/rcb.png",
      score: { runs: 203, wickets: 4, overs: 15.4, isBatting: false }
    },
    awayTeam: {
      teamId: "9",
      name: "Sunrisers Hyderabad",
      shortName: "SRH",
      logoUrl: "/images/teamLogo/srhLogo.svg",
      score: { runs: 201, wickets: 9, overs: 20, isBatting: false }
    },
    venue: "M.Chinnaswamy Stadium",
    city: "Bengaluru",
    result: "Royal Challengers Bengaluru won the match.",
    scheduledAt: "2026-03-28T14:00:00.000Z",
    status: "COMPLETED",
    isLive: false,
    season: "2026"
  }
];
