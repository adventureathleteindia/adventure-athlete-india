/**
 * Centralized Experience Configuration
 *
 * SINGLE SOURCE OF TRUTH for all experience data across the site.
 * Update this file to add new experiences or change hasContent status.
 * All pages (home, experiences, about, detail) will automatically reflect changes.
 */

// ==========================================
// AUTHOR (Default - Atul Chauhan)
// ==========================================

export interface Author {
  name: string;
  image: string;
  credentials: string;
  socials?: {
    instagram?: string;
    youtube?: string;
    strava?: string;
    facebook?: string;
  };
}

export const defaultAuthor: Author = {
  name: "Atul Chauhan",
  image: "/images/atul-profile.jpg",
  credentials: "Elite Cyclist | Trail Runner | Licensed Guide | Engineer",
  socials: {
    instagram: "https://instagram.com/adventureathlete.in",
    youtube: "https://youtube.com/@adventureathleteindia",
    strava: "https://strava.com/athletes/atulchauhan",
    facebook: "https://facebook.com/adventureathleteindia",
  },
};

// ==========================================
// EXPERIENCE DEFINITIONS
// ==========================================

export interface ExperienceNote {
  title: string;
  text: string;
}

export interface ExperienceAudio {
  title: string;
  duration: string;
  src: string;
}

export interface ExperienceVideo {
  thumbnail: string;
  title: string;
  youtubeId?: string; // Optional YouTube video ID
}

export interface Experience {
  // === BASIC INFO (required for all) ===
  slug: string;
  title: string;
  category: string;
  categoryValue: string;
  location: string;
  image: string; // Card/thumbnail image
  distance: string;
  elevation: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  difficultyLevel: number; // 1-5
  duration: string;
  hasContent: boolean; // true = detail page exists, false = shows Coming Soon

  // === ADDITIONAL STATS (for detail page) ===
  route?: string; // e.g., "Shimla → Kuppar Peak → Shimla (Loop)"
  bestSeason?: string; // e.g., "Mar-Jun, Sep-Nov"
  gear?: string; // e.g., "MTB · Full-sus recommended"

  // === IMAGES ===
  heroImage?: string; // High-res hero (defaults to `image` if not set)
  photos?: string[]; // Gallery photos (4-8 recommended)

  // === CONTENT ===
  intro?: string; // Opening hook paragraph (larger text)
  openingParagraph?: string; // Personal story paragraph
  content?: string; // Main route description (supports \n\n for paragraphs)
  gettingThere?: string; // How to reach (supports **bold** markdown)
  whatToBring?: string[]; // List of items to bring
  notes?: ExperienceNote[]; // Personal tips in yellow callout

  // === MEDIA ===
  audio?: ExperienceAudio; // Audio story/trail notes
  video?: ExperienceVideo; // Video section
  stravaActivityId?: string; // Strava activity embed

  // === AUTHOR (optional - defaults to Atul Chauhan) ===
  author?: Author;
}

/**
 * All experiences in the system.
 * To add a new experience: add entry here with hasContent: false
 * When content is ready: change hasContent to true and add detail in experienceDetails
 */
export const experiences: Experience[] = [
  // === CONTENT READY ===
  {
    slug: "shali-tibba",
    title: "Shali Tibba - Trail Run",
    category: "Trail Running",
    categoryValue: "trail",
    location: "Shimla District, Himachal Pradesh",
    image: "/images/experiences/shali-tibba-temple.jpg",
    distance: "8.8 km",
    elevation: "657m",
    difficulty: "Easy",
    difficultyLevel: 1,
    duration: "2-2.5 hrs",
    hasContent: true,

    route: "Khatnol \u2192 Shali Tibba Summit \u2192 Khatnol (Out & Back)",
    bestSeason: "Skip monsoon (mid-June to September end)",
    gear: "Trail shoes \u00B7 Poles recommended",

    // === IMAGES ===
    photos: [
      "/images/experiences/shali-tibba-gallery/1.jpg",
      "/images/experiences/shali-tibba-gallery/2.jpg",
      "/images/experiences/shali-tibba-gallery/3.jpg",
      "/images/experiences/shali-tibba-gallery/4.jpg",
      "/images/experiences/shali-tibba-gallery/5.jpg",
      "/images/experiences/shali-tibba-gallery/6.jpg",
      "/images/experiences/shali-tibba-gallery/7.jpg",
      "/images/experiences/shali-tibba-gallery/8.jpg",
      "/images/experiences/shali-tibba-gallery/9.jpg",
      "/images/experiences/shali-tibba-gallery/10.jpg",
      "/images/experiences/shali-tibba-gallery/11.jpg",
      "/images/experiences/shali-tibba-gallery/12.jpg",
      "/images/experiences/shali-tibba-gallery/13.jpg",
    ],

    // === CONTENT ===
    intro:
      "360\u00B0 Himalayan views from one of the best short trails near Shimla. The summit gives you a complete panorama of the Himalayan ranges.",
    openingParagraph:
      "I took this trail on a January afternoon, starting from Khatnol village. It was one of those bright sunny winter days, short but perfect for a run.",
    content: `The trail was dry despite it being winter. Usually there\u2019s snow this time of year, but the dry weather meant good running conditions. The path is rocky throughout, so I brought a pole for the descent. Took me about 50-55 minutes to reach the top, including stops to shoot some video.

The summit is the real reward. Standing there with views in every direction, it\u2019s one of those moments where you forget you\u2019re just a couple hours from Shimla. There\u2019s a small temple at the top with a Pujari, and you can even camp here with permission.`,
    gettingThere: `**By Bus:** Bus from Shimla ISBT to Khatnol (3 hours), then 3 km offroad to the trail head.
**By Car:** Drive from Shimla, around 2-2.5 hours one way. Can also take a cab.`,
    whatToBring: [
      "Trail running shoes (rocky terrain)",
      "1L water (also available at top)",
      "Trekking pole (helps on descent)",
      "Energy bar or snack",
      "Extra layer for summit",
      "In off-season, carry your own food (shop at top may not be open)",
    ],
    notes: [
      {
        title: "Start early.",
        text: "I started at 1 PM \u2014 too late. Go earlier for better light and more time at the top. Great spot for sunrise.",
      },
      {
        title: "Off-season tip.",
        text: "Carry your own food. The shop at the top may not be open in off-season.",
      },
      {
        title: "Solo-friendly.",
        text: "Solo runs are fine here, but it\u2019d be more fun with company.",
      },
      {
        title: "Easy navigation.",
        text: "The trail is straightforward, no navigation issues.",
      },
    ],

    // === MEDIA ===
    video: {
      thumbnail: "/images/experiences/shali-tibba-temple.jpg",
      title: "Shali Tibba Trail Run",
      youtubeId: "gB8VA90piM0",
    },
    stravaActivityId: "17012112435",
  },

  // === COMING SOON ===
  {
    slug: "chandernahan",
    title: "Chandernahan - First MTB Summit",
    category: "Mountain Biking",
    categoryValue: "mtb",
    location: "Shimla District, Himachal Pradesh",
    image: "/images/experiences/chandernahan.jpg",
    distance: "",
    elevation: "",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "",
    hasContent: false,
  },
  {
    slug: "chandertaal",
    title: "Chandertaal - Trail Run",
    category: "Trail Running",
    categoryValue: "trail",
    location: "Spiti Valley, Himachal Pradesh",
    image: "/images/experiences/chandertaal.jpg",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "chuur-peak",
    title: "Chuur Peak - Hike",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Kullu, Himachal Pradesh",
    image: "/images/experiences/chuur-peak.jpg",
    distance: "10.7 km",
    elevation: "1550m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "8-9 hrs",
    hasContent: true,

    route: "Thanach Village \u2192 Chuur Peak (3850m) \u2192 Thanach Village (Out & Back)",
    bestSeason: "Oct-Nov (late autumn)",
    gear: "Hiking shoes \u00B7 Pole \u00B7 Guide essential",

    photos: [
      "/images/experiences/chuur-peak-gallery/1.jpg",
      "/images/experiences/chuur-peak-gallery/2.jpg",
      "/images/experiences/chuur-peak-gallery/3.jpg",
      "/images/experiences/chuur-peak-gallery/4.jpg",
      "/images/experiences/chuur-peak-gallery/5.jpg",
      "/images/experiences/chuur-peak-gallery/6.jpg",
      "/images/experiences/chuur-peak-gallery/7.jpg",
    ],

    intro:
      "Most people drive past Jalori and never look up. This is what they're missing.",
    openingParagraph:
      "One of the less explored peaks in Himachal, Chuur Peak sits between the Jalori Pass area and Bashleo Pass. Most people drive right past it on the Anni road without knowing it's there.",
    content: `I did this as a speed attempt in late December 2022, starting from Thanach village near Anni. The climb goes from 2300m to 3850m in just under 5 km. That's the kind of steep where you question your life choices every 20 minutes. And there's no proper trail - just dense, wild forest with towering trees blocking out the sunlight. As you go higher, it gets rocky with dangerous drops and sheer cliffs on either side. There was actually no route. We just pushed through.

The forest here is serious. Bears live in it, and it's easy to get lost. Do not do this solo. Get a local guide or at least someone who knows the area.

Once we reached the top, the views made everything worth it. Standing at 3850m, I could see Shrikhand Mahadev to the northeast, Churdhar to the southeast, then Kuppar Peak, Moral Danda, Saru Lake, Darkali Hills, and Sundru Peak stretching towards the east. Full panoramic views in every direction.

One thing that hit me - it was late December and there was zero snow on these peaks. The only visible snow was on mountains above 5000m. That's how fast things are changing up here.`,
    gettingThere: `First reach **Anni**, about 120 km from Shimla. From Anni, it's a 30-minute drive to **Thanach village**. No bus service to Thanach, so you'll need a taxi or your own vehicle. The hike starts from the village.`,
    whatToBring: [
      "1.5L water minimum per person (no water on the trail)",
      "Trekking or hiking shoes",
      "Draat (hatchet sickle) for the bushy sections",
      "Plenty of food (avoid non-veg, it can attract wild animals)",
      "Hiking pole",
      "A guide or local person - this is not optional",
    ],
    notes: [
      {
        title: "Do not go solo.",
        text: "Wild forest, bears, no marked trail. A local guide is essential.",
      },
      {
        title: "Best in autumn.",
        text: "Late October to November. Less bush, clearer views.",
      },
      {
        title: "Relentless climbing.",
        text: "2300m to 3850m in under 5 km. Be ready for it.",
      },
    ],

    video: {
      thumbnail: "/images/experiences/chuur-peak.jpg",
      title: "Chuur Peak Hike",
      youtubeId: "eFu2RSlQZ0I",
    },
    stravaActivityId: "8269328652",
  },
  {
    slug: "dayara-thach",
    title: "Dayara Thach - Random Peak Hike",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Uttarakhand",
    image: "/images/experiences/dayara-thach.jpg",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "ghepan-lake",
    title: "Ghepan Lake - Hike",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Lahaul Spiti, Himachal Pradesh",
    image: "/images/experiences/ghepan-lake.jpg",
    distance: "23.3 km",
    elevation: "1609m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "~10 hrs",
    hasContent: true,

    route: "Labrang Village (near Sissu) \u2192 Ghepan Lake \u2192 Labrang Village (Out & Back)",
    bestSeason: "Autumn (Sep-Nov)",
    gear: "Trail shoes \u00B7 Hiking pole \u00B7 Warm jacket",

    photos: [
      "/images/experiences/ghepan-lake-gallery/1.jpg",
      "/images/experiences/ghepan-lake-gallery/2.jpg",
      "/images/experiences/ghepan-lake-gallery/3.jpg",
      "/images/experiences/ghepan-lake-gallery/4.jpg",
      "/images/experiences/ghepan-lake-gallery/5.jpg",
      "/images/experiences/ghepan-lake-gallery/6.jpg",
      "/images/experiences/ghepan-lake-gallery/7.jpg",
    ],

    intro:
      "The kind of lake you think only exists in wallpapers - until you're standing next to it.",
    openingParagraph:
      "Ghepan Lake sits at 4076m in the Lahaul Valley, near Sissu. To get there you cross the Atal Tunnel from Manali, enter Lahaul, and start the hike about 1 km above Labrang village, roughly 3 km from Sissu. This was my first proper big hike. Not a multi-day trek, just a single-day out-and-back. Left early morning, came back by evening. Took about 10 hours total.",
    content: `We were three people. Packed boiled potatoes, eggs, chocolate, and peanut butter bread for lunch. For gear I had trail running shoes, a jacket, cap, sunglasses, and a water pack, though honestly there's plenty of water on the trail so you don't need to carry much.

The route has four stream crossings. Three are manageable. One is genuinely difficult. Even in autumn when the water was lower, that one crossing made us work for it. My advice: start early. The glacier melts slower in the morning, so the water levels are lower and crossings get easier. By afternoon the meltwater picks up and it gets harder.

Autumn is the better season for this hike. Less water in the streams, clearer skies, and the valley looks incredible. If you go during peak summer, expect higher water and tougher crossings.

The altitude hits you. At 4076m, you feel it. Don't rush, take your time on the way up, and don't underestimate the mountain. This is not a casual walk. The elevation gain is over 1600m round trip, and by the time you're heading back you'll feel it in your legs and your lungs.`,
    gettingThere: `First reach **Manali**. From Manali, take a bus (about 2 hours) or a taxi through the **Atal Tunnel** into Lahaul Valley. Get to **Sissu**, then head to **Labrang village**. The hike starts about 1 km above the village.`,
    whatToBring: [
      "Trail running or hiking shoes (good grip for stream crossings)",
      "Warm jacket (it gets cold at altitude)",
      "Cap and sunglasses",
      "Water pack (but trail has water)",
      "Food for the day (no shops on the trail)",
      "Hiking pole",
      "Mini oxygen cylinder (optional, but smart at this altitude)",
    ],
    notes: [
      {
        title: "Start early.",
        text: "Morning glacier melt is slower, stream crossings are easier.",
      },
      {
        title: "Altitude warning.",
        text: "4076m hits different if you're not acclimatized. Don't rush.",
      },
      {
        title: "Stream crossings.",
        text: "4 total. One is very difficult even in autumn.",
      },
      {
        title: "Best in autumn.",
        text: "Less water, better conditions, clearer skies.",
      },
    ],

    video: {
      thumbnail: "/images/experiences/ghepan-lake.jpg",
      title: "Ghepan Lake Hike",
      youtubeId: "ySrJ9w9r8uQ",
    },
  },
  {
    slug: "hanumangarh",
    title: "Hanumangarh Peak - Trail Run",
    category: "Trail Running",
    categoryValue: "trail",
    location: "Shimla District, Himachal Pradesh",
    image: "/images/experiences/hanumangarh.jpg",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "kuppar-peak",
    title: "Kuppar Peak - Hike",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Shimla District, Himachal Pradesh",
    image: "/images/experiences/kuppar-peak.jpg",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "ladakh-high-passes",
    title: "Ladakh High Passes - Cycling",
    category: "Cycling",
    categoryValue: "cycling",
    location: "Ladakh, India",
    image: "/images/experiences/ladakh.jpg",
    distance: "",
    elevation: "",
    difficulty: "Hard",
    difficultyLevel: 5,
    duration: "",
    hasContent: false,
  },
  {
    slug: "shimla-to-bir",
    title: "Shimla to Bir - Cycling",
    category: "Cycling",
    categoryValue: "cycling",
    location: "Himachal Pradesh",
    image: "/images/experiences/shimla-to-bir.jpg",
    distance: "",
    elevation: "",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "",
    hasContent: false,
  },
  {
    slug: "skiing-narkanda",
    title: "Skiing in Narkanda",
    category: "Skiing",
    categoryValue: "skiing",
    location: "Narkanda, Himachal Pradesh",
    image: "/images/experiences/skiing-narkanda.jpg",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "lambri-meadows",
    title: "Lambri Meadows - Trail Run",
    category: "Trail Running",
    categoryValue: "trail",
    location: "Shimla District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "serolsar-lake",
    title: "Serolsar Lake - MTB",
    category: "Mountain Biking",
    categoryValue: "mtb",
    location: "Kullu District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
  {
    slug: "nochi-top",
    title: "Nochi Top - Hike",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Shimla District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
    distance: "",
    elevation: "",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "",
    hasContent: false,
  },
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get experience by slug
 */
export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((exp) => exp.slug === slug);
}

/**
 * Check if an experience has content (detail page ready)
 */
export function hasExperienceContent(slug: string): boolean {
  const exp = getExperienceBySlug(slug);
  return exp?.hasContent ?? false;
}

/**
 * Get href for an experience - returns path if has content, undefined if not
 */
export function getExperienceHref(slug: string): string | undefined {
  return hasExperienceContent(slug) ? `/experience/${slug}` : undefined;
}

/**
 * Get all experiences with content
 */
export function getExperiencesWithContent(): Experience[] {
  return experiences.filter((exp) => exp.hasContent);
}

/**
 * Get experiences for home page (first 3, mix of content/coming soon)
 */
export function getHomePageExperiences(): Experience[] {
  return experiences.slice(0, 3);
}

/**
 * Get experiences for experiences listing page
 */
export function getExperiencesListingData() {
  const initial = experiences.slice(0, 6);
  const additional = experiences.slice(6);
  return { initial, additional, total: experiences };
}

// ==========================================
// ROUTE CARD DATA FORMAT
// ==========================================

export interface RouteCardData {
  title: string;
  category: string;
  categoryValue?: string;
  image: string;
  href: string;
  distance: string;
  elevation: string;
  difficulty: string;
  duration: string;
  hasContent: boolean;
}

/**
 * Convert experience to RouteCard format
 */
export function toRouteCard(exp: Experience): RouteCardData {
  return {
    title: exp.title,
    category: exp.category,
    categoryValue: exp.categoryValue,
    image: exp.image,
    href: `/experience/${exp.slug}`,
    distance: exp.distance,
    elevation: exp.elevation,
    difficulty: exp.difficulty,
    duration: exp.duration,
    hasContent: exp.hasContent,
  };
}

/**
 * Get route cards for home page
 */
export function getHomePageRouteCards(): RouteCardData[] {
  return getHomePageExperiences().map(toRouteCard);
}

/**
 * Get all route cards for experiences listing
 */
export function getExperiencesRouteCards() {
  const { initial, additional } = getExperiencesListingData();
  return {
    initial: initial.map(toRouteCard),
    additional: additional.map(toRouteCard),
    all: experiences.map(toRouteCard),
  };
}

// ==========================================
// PHOTO GALLERY DATA FORMAT (for photo piles)
// ==========================================

export interface GalleryPhoto {
  src: string;
  alt: string;
  label: string;
  href?: string; // Only set if hasContent is true
  slug: string;  // Always set for reference
}

/**
 * Generate gallery photos from experiences + additional scenic photos
 */
export function getGalleryPhotos(): GalleryPhoto[] {
  // Use experience photos directly (local images don't need URL param changes)
  const experiencePhotos: GalleryPhoto[] = experiences.map((exp) => ({
    src: exp.image.startsWith("/") ? exp.image : exp.image.replace("w=800", "w=400"),
    alt: exp.title,
    label: exp.title,
    href: exp.hasContent ? `/experience/${exp.slug}` : undefined,
    slug: exp.slug,
  }));

  return experiencePhotos;
}

/**
 * Get photos for experiences page hero (PhotoPileHero component)
 */
export function getExperiencesHeroPhotos(): GalleryPhoto[] {
  return getGalleryPhotos().slice(0, 16); // Limit to 16 for photo pile
}

/**
 * Get photos for about page gallery with custom positions
 */
export interface AboutGalleryPhoto extends GalleryPhoto {
  style: {
    width: number;
    height: number;
    top: string;
    left?: string;
    right?: string;
    transform: string;
    zIndex: number;
  };
}

export function getAboutGalleryPhotos(): AboutGalleryPhoto[] {
  const photos = getGalleryPhotos();

  // Predefined positions matching the prototype
  const positions = [
    // Row 1
    { width: 180, height: 120, top: "5%", left: "3%", transform: "rotate(-8deg)", zIndex: 10 },
    { width: 140, height: 100, top: "8%", left: "18%", transform: "rotate(5deg)", zIndex: 12 },
    { width: 200, height: 140, top: "2%", left: "32%", transform: "rotate(-3deg)", zIndex: 8 },
    { width: 150, height: 110, top: "10%", left: "52%", transform: "rotate(7deg)", zIndex: 14 },
    { width: 170, height: 120, top: "5%", left: "68%", transform: "rotate(-6deg)", zIndex: 9 },
    { width: 130, height: 90, top: "3%", right: "3%", transform: "rotate(4deg)", zIndex: 11 },
    // Row 2
    { width: 160, height: 110, top: "40%", left: "2%", transform: "rotate(6deg)", zIndex: 13 },
    { width: 190, height: 130, top: "45%", left: "16%", transform: "rotate(-4deg)", zIndex: 7 },
    { width: 145, height: 100, top: "50%", left: "38%", transform: "rotate(8deg)", zIndex: 15 },
    { width: 175, height: 120, top: "42%", left: "55%", transform: "rotate(-7deg)", zIndex: 10 },
    { width: 155, height: 105, top: "48%", left: "75%", transform: "rotate(5deg)", zIndex: 12 },
    // Row 3
    { width: 140, height: 95, top: "72%", left: "5%", transform: "rotate(-5deg)", zIndex: 11 },
    { width: 165, height: 115, top: "74%", left: "22%", transform: "rotate(6deg)", zIndex: 9 },
    { width: 185, height: 125, top: "70%", left: "42%", transform: "rotate(-3deg)", zIndex: 14 },
    { width: 150, height: 100, top: "75%", left: "65%", transform: "rotate(4deg)", zIndex: 8 },
    { width: 135, height: 90, top: "68%", right: "3%", transform: "rotate(-8deg)", zIndex: 13 },
  ];

  return photos.slice(0, 16).map((photo, index) => ({
    ...photo,
    style: positions[index % positions.length],
  }));
}

// ==========================================
// CATEGORIES
// ==========================================

export const experienceCategories = [
  { label: "All", value: "all" },
  { label: "Mountain Biking", value: "mtb" },
  { label: "Trail Running", value: "trail" },
  { label: "Hiking", value: "hiking" },
  { label: "Cycling", value: "cycling" },
  { label: "Skiing", value: "skiing" },
];

export const homepageCategories = [
  { title: "Mountain Biking", image: "/images/experiences/chandernahan.jpg", href: "/experiences?category=mtb" },
  { title: "Trail Running", image: "/images/category-trail-running.jpg", href: "/experiences?category=trail" },
  { title: "Hiking & Treks", image: "/images/experiences/ghepan-lake.jpg", href: "/experiences?category=hiking" },
  { title: "Skiing", image: "/images/experiences/skiing-narkanda.jpg", href: "/experiences?category=skiing" },
];
