export interface MilestoneItem {
  id: string;
  index: number;
  theme: "white" | "orange";
  year: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  statsBadge: string;
}

export const milestonesData: MilestoneItem[] = [
  // 1. 2016 Maiden IPL Championship - STARTS WITH ORANGE GRADIENT THEME
  {
    id: "milestone-1-2016",
    index: 1,
    theme: "orange",
    year: "2016",
    tagline: "CHAMPIONSHIP GLORY",
    title: "THE MAIDEN CROWN",
    description:
      "SunRisers Hyderabad won the IPL in 2016, beating Royal Challengers Bengaluru in a historic final at the Chinnaswamy Stadium. We remain the only team in IPL history to lift the trophy coming all the way from the Eliminator in the Playoffs.",
    image: "https://sunrisershyderabad.in/assets/players/2016.png",
    statsBadge: "IPL 2016 CHAMPIONS"
  },

  // 2. 2018 Table Toppers - ALTERNATES TO WHITE THEME
  {
    id: "milestone-2-2018",
    index: 2,
    theme: "white",
    year: "2018",
    tagline: "DEFENSIVE SUPREMACY",
    title: "TABLE TOPPERS",
    description:
      "SunRisers Hyderabad finished on top of the points table in 2018 with 9 commanding victories and went on to reach the final. Known as the masters of defending modest totals, Hyderabad held oppositions under 140 four consecutive times.",
    image: "https://sunrisershyderabad.in/assets/players/2018.png",
    statsBadge: "NO. 1 IN POINTS TABLE"
  },

  // 3. 2024 Highest IPL Total (287/3) - ORANGE GRADIENT THEME
  {
    id: "milestone-3-287",
    index: 3,
    theme: "orange",
    year: "2024",
    tagline: "WORLD RECORD REWRITE",
    title: "THE 287 INVASION",
    description:
      "A breathtaking century from Travis Head at the Chinnaswamy Stadium against RCB in 2024, backed by a power-packed fifty from Heinrich Klaasen, powered us to 287/3 — the highest team total in IPL history and the second highest in all T20 cricket.",
    image: "https://d1zakxcsliwds.cloudfront.net/image-pool/3e5af5801131490f98405b96966bb7e1.png",
    statsBadge: "287/3 HIGHEST TOTAL"
  },

  // 4. 2024 Fastest 150+ Chase & Powerplay Blitz - WHITE THEME
  {
    id: "milestone-4-travishek",
    index: 4,
    theme: "white",
    year: "2024",
    tagline: "UNPRECEDENTED VELOCITY",
    title: "TRAVISHEK CARNAGE",
    description:
      "Chasing a total of 165 against LSG in IPL 2024, Abhishek Sharma and Travis Head produced a stunning opening blitz, chasing it down in just 9.4 overs. It was the fastest 150+ run chase in IPL history and the most runs ever scored in the first 10 overs.",
    image: "https://sunrisershyderabad.in/assets/players/mileStoneNew2.png",
    statsBadge: "CHASED IN 9.4 OVERS"
  }

  // 5. 2024 Record 178 Sixes in a Single Season - ORANGE GRADIENT THEME
  // {
  //   id: "milestone-5-178-sixes",
  //   index: 5,
  //   theme: "orange",
  //   year: "2024",
  //   tagline: "MAXIMUM MAXIMUMS",
  //   title: "RECORD 178 SIXES",
  //   description:
  //     "Our batters' relentless pursuit of fearless boundary hitting saw them dismantle bowling attacks with utter ease, smashing 178 sixes in IPL 2024 — the highest number of sixes ever struck by a team in a single tournament season.",
  //   image: "https://d1zakxcsliwds.cloudfront.net/image-pool/48e7f99086e148c5855811068946bb8c.png",
  //   statsBadge: "178 SIXES SEASON RECORD"
  // }
];
