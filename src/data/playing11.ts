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
  // CARD 1: Captain Solo (Pat Cummins) - WHITE BACKGROUND
  {
    id: "card-1-captain",
    cardIndex: 1,
    theme: "white",
    category: "CAPTAIN & TACTICIAN",
    headline: "THE ARCHITECT OF AGGRESSION",
    subhead: "BUILT TO LEAD FROM THE FRONT",
    description:
      "Masterminding relentless aggression, Pat Cummins spearheaded Sunrisers into a fearless new era. Pressure-tested in world finals, his ice-cold instincts and tactical acumen define Leeds' bold championship pursuit.",
    players: [
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
        link: "#"
      }
    ]
  },

  // CARD 2: Opening Duo (Travis Head & Abhishek Sharma) - ORANGE GRADIENT
  {
    id: "card-2-openers",
    cardIndex: 2,
    theme: "orange",
    category: "THE DEMOLITION ORDER",
    headline: "A TALE OF TWO FIRESTARTERS",
    subhead: "BUILT FOR MAXIMUM DAMAGE AT RECORD VELOCITY",
    description:
      "Redefining T20 cricket with historic powerplay brutality. Head and Abhishek dismantle opening attacks from ball one, posting world-record totals and leaving opposition bowling charts in ruins.",
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
        link: "#"
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
        link: "#"
      }
    ]
  },

  // CARD 3: Middle Order & Keepers (Heinrich Klaasen & Ishan Kishan) - WHITE BACKGROUND
  {
    id: "card-3-middle-order",
    cardIndex: 3,
    theme: "white",
    category: "THE ARTILLERY CORE",
    headline: "POWER IN THE REARGUARD",
    subhead: "BUILT FOR UNMATCHED SIX-HITTING & CLEAN GLOVES",
    description:
      "Unleashing devastating power against spin and express pace alike. Klaasen and Kishan provide the engine room fire, capable of turning any target into an effortless run-chase inside three overs.",
    players: [
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
        link: "#"
      },
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
        link: "#"
      }
    ]
  },

  // CARD 4: All-Round Engine (Nitish Kumar Reddy & Liam Livingstone) - ORANGE GRADIENT
  {
    id: "card-4-all-rounders",
    cardIndex: 4,
    theme: "orange",
    category: "THE CLUTCH ENGINE",
    headline: "DUAL-IMPACT VERSATILITY",
    subhead: "BUILT TO RESHAPE CRITICAL MATCH OVERLAYS",
    description:
      "Bridging heavy power hitting with crucial overs in the middle. Nitish and Livingstone supply dynamic six-hitting muscle and versatile overs, altering match momentum across both innings.",
    players: [
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
        link: "#"
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
        link: "#"
      }
    ]
  },

  // CARD 5: Seam & Death Maestros (Harshal Patel & Jaydev Unadkat) - WHITE BACKGROUND
  {
    id: "card-5-pacers",
    cardIndex: 5,
    theme: "white",
    category: "THE DEATH OVERS SPECIALISTS",
    headline: "SEAM VARIATION & CRUSHING ACCURACY",
    subhead: "BUILT FOR SLOWER BALLS, CUTTERS & TIGHT OVERS",
    description:
      "Combining legendary knuckle balls with left-arm angle mastery. Harshal's purple cap pedigree and Jaydev's match-winning variations systematically dismantle batting lineups at the death.",
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
        link: "#"
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
        link: "#"
      }
    ]
  },

  // CARD 6: Variations & International Flair (Kamindu Mendis & Shivam Mavi) - ORANGE GRADIENT
  {
    id: "card-6-variations",
    cardIndex: 6,
    theme: "orange",
    category: "THE VARIATION FORCE",
    headline: "AMBIDEXTROUS MAGIC & EXPRESS SEAM",
    subhead: "BUILT TO SURPRISE & PUNISH BOTH EDGES",
    description:
      "World-record ambidextrous spin meeting express skiddy seam. Kamindu's historic batting record and dual-arm bowling join Mavi's raw wicket-taking intensity to complete the Leeds matchday arsenal.",
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
        link: "#"
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
        link: "#"
      }
    ]
  }
];
