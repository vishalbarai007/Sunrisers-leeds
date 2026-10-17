export interface SpotlightPost {
  code: string;
  instagramUrl: string;
  thumbnailUrl: string;
  caption: string;
  publishedAt: string;
  stats: {
    likes: number;
    comments: number;
    plays: number;
  };
}

export const SPOTLIGHT_POSTS_DATA: SpotlightPost[] = [
  {
    code: "DbLLI9PTvUn",
    instagramUrl: "https://www.instagram.com/p/DbLLI9PTvUn/",
    thumbnailUrl: "/images/spotlight/spotlight1.webp",
    caption:
      "His reflex story never changes 💙🧡\n\n[Play With Fire | SunRisers Hyderabad | ZIM vs IND]",
    publishedAt: "2026-07-24T11:51:32.000Z",
    stats: {
      likes: 38459,
      comments: 65,
      plays: 0
    }
  },
  {
    code: "DbKdZ1kTZHu",
    instagramUrl: "https://www.instagram.com/p/DbKdZ1kTZHu/",
    thumbnailUrl: "/images/spotlight/spotlight2.webp",
    caption:
      "Youngest to score a Men’s International fifty 🫡💙\n\n[Play With Fire | SunRisers Hyderabad | ZIM vs IND]",
    publishedAt: "2026-07-24T05:12:02.000Z",
    stats: {
      likes: 27120,
      comments: 57,
      plays: 0
    }
  },
  {
    code: "DbJC7K2k4Ir",
    instagramUrl: "https://www.instagram.com/p/DbJC7K2k4Ir/",
    thumbnailUrl: "/images/spotlight/spotlight3.webp",
    caption:
      "Started the series with a BIG W 💯🔥\n\n[Play With Fire | SunRisers Hyderabad | ZIM vs IND]",
    publishedAt: "2026-07-23T16:01:03.000Z",
    stats: {
      likes: 42926,
      comments: 58,
      plays: 0
    }
  },
  {
    code: "DbIVOFuE1ly",
    instagramUrl: "https://www.instagram.com/p/DbIVOFuE1ly/",
    thumbnailUrl: "/images/spotlight/spotlight4.webp",
    caption:
      "To more of these moments 🎂🧡\n\n[Harsh Dubey | Play With Fire | SunRisers Hyderabad]",
    publishedAt: "2026-07-23T09:21:41.000Z",
    stats: {
      likes: 32439,
      comments: 60,
      plays: 0
    }
  }
];
