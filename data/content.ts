// ─────────────────────────────────────────────────────────────────────────
// CENTRAL CONTENT CONFIG
// Every piece of replaceable content lives here. Search for "DEMO" to find
// every placeholder that needs a real replacement before launch.
// ─────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "MINITO.VFX",
  tagline: "I edit attention.",
  email: "hello@anantedits.demo" // DEMO — replace with real inbox
};

export const nav = [
  { label: "Worked with", href: "#worked-with" },
  { label: "Previous work", href: "#work" },
  { label: "Hire me", href: "#hire" }
];

export const hero = {
  eyebrow: "Video editor · Based in India",
  headline: "I edit attention.",
  sub: "Short-form & long-form video editing for creators, brands and businesses who want to stand out.",
  ctaPrimary: { label: "See previous work", href: "#work" },
  ctaSecondary: { label: "Hire me", href: "#hire" },
  // DEMO cinematic loop — replace with a real hosted background reel (mp4, muted, no audio needed)
  bgVideoUrl: "./mega showcase.mp4",
  bgPoster: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1800&auto=format&fit=crop"
};

export type Client = {
  name: string;
  logo: string;
  url: string; 
  subscribers: string;// DEMO — external link to the client's own site
};

// WORKED WITH — logos link out to each client. All DEMO until real clients exist.
// WORKED WITH — logos link out to each client.
export const clients: Client[] = [
  { 
    name: "Kuntal Plays", 
    logo: "https://unavatar.io/youtube/@kuntalplays", 
    url: "https://www.youtube.com/@kuntalplays",
    subscribers: "63.3K"
  },
  { 
    name: "Scalpo", 
    logo: "https://unavatar.io/youtube/@fx.scalpo", 
    url: "https://www.youtube.com/@fx.scalpo",
    subscribers: "1.21M"
  },
  { 
    name: "GAMING WITH DARSH", 
    logo: "https://unavatar.io/youtube/@gamewithdarshan", 
    url: "https://www.youtube.com/@gamewithdarshan",
    subscribers: "712K"
  },
  { 
    name: "Monke & Lizard Gaming", 
    logo: "https://unavatar.io/youtube/@monkelizard", 
    url: "https://www.youtube.com/@monkelizard",
    subscribers: "14K"
  },
  { 
    name: "Dattrax New", 
    logo: "https://unavatar.io/youtube/@dattraxreact", 
    url: "https://www.youtube.com/@dattraxreact",
    subscribers: "138K"
  },
  { 
    name: "NY Gamer", 
    logo: "https://unavatar.io/youtube/@nygamerofficial", 
    url: "https://www.youtube.com/@nygamerofficial",
    subscribers: "1.3M"
  },
  { 
    name: "Godzilla Plays", 
    logo: "https://unavatar.io/youtube/@godzillaplayss", 
    url: "https://www.youtube.com/@godzillaplayss",
    subscribers: "195K"
  },
  { 
    name: "PomPeuu Pattie's", 
    logo: "https://unavatar.io/youtube/@pompeuu_patties", 
    url: "https://www.youtube.com/@pompeuu_patties",
    subscribers: "59.6K"
  },
  { 
    name: "Aayush Kyu", 
    logo: "https://unavatar.io/youtube/@aayushkya", 
    url: "https://www.youtube.com/@aayushkya",
    subscribers: "35.5K"
  },
  { 
    name: "Dattrax", 
    logo: "https://unavatar.io/youtube/@dattraxg", 
    url: "https://www.youtube.com/@dattraxg",
    subscribers: "733k"
  }
];
export type Project = {
  id: string;
  title: string;
  category: string;
  platform: string;
  youtubeId: string; // DEMO — real YouTube video ID
};

// PREVIOUS WORK — each card is a real YouTube embed (hover preview, click opens on YouTube)
export const projects: Project[] = [
  { id: "proj-01", title: "Kuntal Plays", category: "", platform: "YouTube", youtubeId: "sHOu6vOqIIc" },
  { id: "proj-02", title: "Dattrax NEW", category: "", platform: "YouTube", youtubeId: "UfxyoHa3Sx0" },
  { id: "proj-03", title: "Monke & Lizard Gaming", category: "", platform: "YouTube", youtubeId: "74Xq458Xd6E" },
  { id: "proj-04", title: "GAMING WITH DARSH", category: "", platform: "YouTube", youtubeId: "WTuNNX2nNcM" },
  { id: "proj-05", title: "Dattrax New", category: "", platform: "YouTube", youtubeId: "yehes5Yl2VQ" },
  { id: "proj-06", title: "scalpo", category: "", platform: "YouTube", youtubeId: "AkTmlzIWfug" }
];

export const hireMe = {
  headline: "Have footage that deserves a better cut?",
  sub: "Book a call — a reply usually comes within a day.",
  ctaLabel: "Book a call",
  calendlyUrl: "https://calendly.com/labourplazzz/30min" // TODO — replace with real Calendly URL
};
