export interface PlayerData {
  id: string;
  name: string;
  shortName: string;
  jersey: string;
  role: string;
  nationality: string;
  bornIn: string;
  age: string;
  battingStyle: string;
  bowlingStyle: string;
  ranking: string;
  records: string;
  imageUrl: string;
  link: string;
}

export interface Playing11Card {
  id: string;
  cardIndex: number;
  theme: "white" | "orange";
  category: string;
  headline: string;
  subhead: string;
  description: string;
  players: PlayerData[];
}

export const playing11Cards: Playing11Card[] = [
  // SLIDE 1: TOP-ORDER DEMOLITION & CAPTAINCY (White Theme)
  {
    id: "slide-1-top-order",
    cardIndex: 1,
    theme: "white",
    category: "CAPTAIN & FIRESTARTERS",
    headline: "THE ARCHITECTS OF AGGRESSION",
    subhead: "BUILT TO LEAD FROM THE FRONT AT RECORD VELOCITY",
    description:
      "Masterminding relentless aggression, Pat Cummins and world-record opening pair Travis Head and Abhishek Sharma dismantle bowling attacks from ball one, posting historic powerplay totals.",
    players: [
      {
        id: "travis-head",
        name: "TRAVIS HEAD",
        shortName: "T. HEAD",
        jersey: "62",
        role: "OPENING BATTER",
        nationality: "AUSTRALIA",
        bornIn: "ADELAIDE, AUS",
        age: "31 YEARS",
        battingStyle: "LEFT-HAND BAT",
        bowlingStyle: "RIGHT-ARM OFF-BREAK",
        ranking: "ICC WORLD #1 T20I BATTER",
        records: "FASTEST 100 IN SRH HISTORY (39 BALLS)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/a9c68ab5d28247f4ae6bf4c745a4c006.png",
        link: "/players"
      },
      {
        id: "pat-cummins",
        name: "PAT CUMMINS",
        shortName: "P. CUMMINS",
        jersey: "30",
        role: "CAPTAIN & FAST BOWLER",
        nationality: "AUSTRALIA",
        bornIn: "WESTMEAD, AUS",
        age: "31 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM FAST",
        ranking: "ICC RANK #1 TEST BOWLER",
        records: "2024 IPL FINALIST SKIPPER • 170+ TEST WKTS",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/b05b97fe0933472abfde3b592609d575.png",
        link: "/players"
      },
      {
        id: "abhishek-sharma",
        name: "ABHISHEK SHARMA",
        shortName: "A. SHARMA",
        jersey: "04",
        role: "OPENING ALL-ROUNDER",
        nationality: "INDIA",
        bornIn: "AMRITSAR, IND",
        age: "24 YEARS",
        battingStyle: "LEFT-HAND BAT",
        bowlingStyle: "SLOW LEFT-ARM ORTHODOX",
        ranking: "TOP 10 T20I STRIKE RATE (204.2)",
        records: "FASTEST 50 FOR SRH (16 BALLS)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/6f132a786c2d40b9aaf406a39bf64c9d.png",
        link: "/players"
      }
    ]
  },

  // SLIDE 2: MIDDLE ORDER ARTILLERY & FINISHERS (Orange Theme)
  {
    id: "slide-2-middle-order",
    cardIndex: 2,
    theme: "orange",
    category: "THE ARTILLERY CORE",
    headline: "POWER IN THE REARGUARD",
    subhead: "BUILT FOR UNMATCHED SIX-HITTING & CLEAN GLOVES",
    description:
      "Unleashing devastating power against spin and pace alike. Heinrich Klaasen, Ishan Kishan, and Nitish Kumar Reddy provide the engine room fire to turn any target into an effortless run chase.",
    players: [
      {
        id: "ishan-kishan",
        name: "ISHAN KISHAN",
        shortName: "I. KISHAN",
        jersey: "23",
        role: "WICKETKEEPER-BATTER",
        nationality: "INDIA",
        bornIn: "PATNA, IND",
        age: "26 YEARS",
        battingStyle: "LEFT-HAND BAT",
        bowlingStyle: "WICKETKEEPER",
        ranking: "ODI DOUBLE CENTURION",
        records: "FASTEST ODI 200 IN CRICKET HISTORY (126B)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/e2dedcec226e44f5a099d3cf887000a9.png",
        link: "/players"
      },
      {
        id: "heinrich-klaasen",
        name: "HEINRICH KLAASEN",
        shortName: "H. KLAASEN",
        jersey: "45",
        role: "WICKETKEEPER-BATTER",
        nationality: "SOUTH AFRICA",
        bornIn: "PRETORIA, RSA",
        age: "33 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM OFF-BREAK",
        ranking: "#2 ICC T20 POWER INDEX",
        records: "MOST 6s IN MIDDLE OVERS (41 SIXES)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/c87cd11c723e4ed7a86f147389a29dce.png",
        link: "/players"
      },
      {
        id: "nitish-kumar-reddy",
        name: "NITISH KUMAR REDDY",
        shortName: "N. REDDY",
        jersey: "88",
        role: "SEAM-BOWLING ALL-ROUNDER",
        nationality: "INDIA",
        bornIn: "VISAKHAPATNAM, IND",
        age: "21 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM MEDIUM FAST",
        ranking: "IPL EMERGING PLAYER OF THE YEAR",
        records: "300+ RUNS & CLUTCH MATCH FINISHES (2024)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/b14052c12a5a4a74b79a506d061fc2f5.png",
        link: "/players"
      }
    ]
  },

  // SLIDE 3: SEAM & DEATH MAESTROS (White Theme)
  {
    id: "slide-3-pacers",
    cardIndex: 3,
    theme: "white",
    category: "DEATH SPECIALISTS & FINISHERS",
    headline: "SEAM VARIATION & SIX-HITTING MUSCLE",
    subhead: "BUILT FOR SLOWER BALLS, CUTTERS & TIGHT OVERS",
    description:
      "Combining legendary knuckle balls, left-arm angles, and monster power hitting. Liam Livingstone, Harshal Patel, and Jaydev Unadkat systematically dismantle batting lineups at the death.",
    players: [
      {
        id: "harshal-patel",
        name: "HARSHAL PATEL",
        shortName: "H. PATEL",
        jersey: "16",
        role: "DEATH-OVERS SEAMER",
        nationality: "INDIA",
        bornIn: "SANAND, IND",
        age: "34 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM MEDIUM FAST",
        ranking: "2X IPL PURPLE CAP WINNER",
        records: "MOST WKTS IN SINGLE IPL SEASON (32 WKTS)",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/cbea1a5890cb4c748d922d12fbcadea0.png",
        link: "/players"
      },
      {
        id: "liam-livingstone",
        name: "LIAM LIVINGSTONE",
        shortName: "L. LIVINGSTONE",
        jersey: "23",
        role: "EXPLOSIVE ALL-ROUNDER",
        nationality: "ENGLAND",
        bornIn: "CUMBRIA, ENG",
        age: "31 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM SPIN (LEG/OFF)",
        ranking: "T20 WORLD CUP WINNER",
        records: "117M MONSTER SIX • 145+ STRIKE RATE",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/68df092bf3c548f8901bb0959637e045.png",
        link: "/players"
      },
      {
        id: "jaydev-unadkat",
        name: "JAYDEV UNADKAT",
        shortName: "J. UNADKAT",
        jersey: "07",
        role: "LEFT-ARM SEAM BOWLER",
        nationality: "INDIA",
        bornIn: "PORBANDAR, IND",
        age: "33 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "LEFT-ARM MEDIUM",
        ranking: "RANJI TROPHY CHAMPION SKIPPER",
        records: "100+ T20 MATCHES • HAT-TRICK MAIDEN",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/a5669d06297b4ff89e3a67e6365118cf.png",
        link: "/players"
      }
    ]
  },

  // SLIDE 4: VARIATION & EXPRESS ATTACK (Orange Theme)
  {
    id: "slide-4-variations",
    cardIndex: 4,
    theme: "orange",
    category: "VARIATION FORCE & EXPRESS SEAM",
    headline: "AMBIDEXTROUS MAGIC & EXPRESS SEAM",
    subhead: "BUILT TO SURPRISE & PUNISH BOTH EDGES",
    description:
      "World-record ambidextrous spin meeting express skiddy seam. Kamindu Mendis, Rahul Chahar, and Shivam Mavi complete the Leeds matchday arsenal with unmatched dynamic versatility.",
    players: [
      {
        id: "kamindu-mendis",
        name: "KAMINDU MENDIS",
        shortName: "K. MENDIS",
        jersey: "21",
        role: "AMBIDEXTROUS ALL-ROUNDER",
        nationality: "SRI LANKA",
        bornIn: "GALLE, SL",
        age: "26 YEARS",
        battingStyle: "LEFT-HAND BAT",
        bowlingStyle: "AMBIDEXTROUS (OFF & ORTHODOX)",
        ranking: "ICC MEN'S PLAYER OF THE MONTH",
        records: "FASTEST TO 1,000 TEST RUNS IN 75 YEARS",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/969a8458ce9a46278be6f1d6cb3a45ec.png",
        link: "/players"
      },
      {
        id: "rahul-chahar",
        name: "RAHUL CHAHAR",
        shortName: "R. CHAHAR",
        jersey: "28",
        role: "PREMIER LEG-SPINNER",
        nationality: "INDIA",
        bornIn: "BHARATPUR, IND",
        age: "25 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM LEG BREAK",
        ranking: "IPL WINNING SPINNER",
        records: "70+ IPL WICKETS • BEST 4/27",
        imageUrl: "https://sunrisershyderabad.in/assets/players/mileStoneNew1.png",
        link: "/players"
      },
      {
        id: "shivam-mavi",
        name: "SHIVAM MAVI",
        shortName: "S. MAVI",
        jersey: "91",
        role: "EXPRESS FAST BOWLER",
        nationality: "INDIA",
        bornIn: "NOIDA, IND",
        age: "26 YEARS",
        battingStyle: "RIGHT-HAND BAT",
        bowlingStyle: "RIGHT-ARM FAST",
        ranking: "U-19 WORLD CUP WINNER",
        records: "4/22 ON INDIA T20I DEBUT",
        imageUrl: "https://d1zakxcsliwds.cloudfront.net/image-pool/cef85d257c8044fb81fca2bb0aaa30a3.png",
        link: "/players"
      }
    ]
  }
];

export const allPlayers: PlayerData[] = playing11Cards.flatMap((c) => c.players);
