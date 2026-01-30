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
  image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=200&q=80", // TODO: Replace with actual author photo
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
  // Featured / Content Ready
  {
    slug: "kuppar-peak-loop",
    title: "Kuppar Peak Loop",
    category: "Mountain Biking",
    categoryValue: "mtb",
    location: "Shimla District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    distance: "32 km",
    elevation: "1200m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "4-5 hrs",
    hasContent: true,

    // === ADDITIONAL STATS ===
    route: "Shimla → Kuppar Peak → Shimla (Loop)",
    bestSeason: "Mar-Jun, Sep-Nov",
    gear: "MTB · Full-sus recommended",

    // === IMAGES ===
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80",
    photos: [
      "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80",
    ],

    // === CONTENT ===
    intro:
      "The Kuppar Peak loop is one of my favorite rides in the Shimla region. It has everything — steep climbs, technical descents, ridge riding, and views that make you forget you're suffering.",
    openingParagraph:
      'I first discovered this route in 2019 while exploring unmapped trails behind Mashobra. What started as a random "let\'s see where this goes" turned into what I now consider the definitive Shimla MTB experience.',
    content: `You start from Shimla town, climbing steadily through the forest roads toward Mashobra. The first 8 km are on tarmac — use this to warm up because things get real after that.

Once you hit the Mashobra junction, take the dirt track heading northeast. This is where the climb begins in earnest. The gradient kicks up to 12-15% in places, and the loose gravel makes traction tricky. I usually shift to my granny gear and just grind.

The ridge section from kilometer 15-22 is pure magic. You're riding along a knife-edge with valleys dropping away on both sides. On clear days, you can see all the way to the Dhauladhar range. Stop here. Take photos. Breathe it in.

The descent from Kuppar Peak is technical — loose rocks, tight switchbacks, and some exposure. Keep your weight back and let the bike do the work. If you're not comfortable with technical descents, walk the sketchy bits. No shame in that.`,
    gettingThere: `The ride starts from Shimla's main market area (The Ridge). If you're staying elsewhere, I can arrange pickup or share the exact GPS coordinates for the trailhead.

**By Car:** Drive to Shimla, park near The Mall Road. The loop brings you back to the same spot.
**By Bus:** HRTC buses run frequently from Delhi/Chandigarh to Shimla ISBT. The trailhead is 2 km from the bus stand.`,
    whatToBring: [
      "MTB with good brakes (full suspension recommended)",
      "Helmet (non-negotiable)",
      "Gloves and knee pads",
      "3+ liters of water",
      "Energy bars / trail snacks",
      "Light rain jacket (weather changes fast)",
      "Basic repair kit + spare tube",
      "Sunscreen and sunglasses",
    ],
    notes: [
      {
        title: "Start early.",
        text: "I usually hit the trail by 6 AM to avoid afternoon clouds and have the forest roads to myself.",
      },
      {
        title: "Carry extra water.",
        text: "There's no reliable water source after Mashobra until you're back in town. I carry 3 liters minimum.",
      },
      {
        title: "Tire pressure matters.",
        text: "Drop to around 22-24 PSI for the technical sections. You'll thank me on the descent.",
      },
    ],

    // === MEDIA ===
    audio: {
      title: "Trail Notes",
      duration: "12 min",
      src: "", // Add real audio URL when available
    },
    video: {
      thumbnail: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
      title: "Kuppar Peak Full Ride",
      youtubeId: "", // Add YouTube ID when available
    },
    stravaActivityId: "", // Add Strava activity ID when available
  },
  // Coming Soon
  {
    slug: "shali-tibba",
    title: "Shali Tibba Summit",
    category: "Trail Running",
    categoryValue: "trail",
    location: "Solan District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    distance: "18 km",
    elevation: "900m",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "3-4 hrs",
    hasContent: false,
  },
  {
    slug: "hatu-peak",
    title: "Hatu Peak Trail",
    category: "Hiking",
    categoryValue: "hiking",
    location: "Narkanda, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80",
    distance: "12 km",
    elevation: "600m",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "4-5 hrs",
    hasContent: false,
  },
  {
    slug: "churdhar",
    title: "Churdhar Trek",
    category: "Trekking",
    categoryValue: "hiking",
    location: "Sirmour District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    distance: "24 km",
    elevation: "1800m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "2 days",
    hasContent: false,
  },
  {
    slug: "jakhu-temple",
    title: "Jakhu Temple Walk",
    category: "Nature Walk",
    categoryValue: "nature",
    location: "Shimla, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=400&q=80",
    distance: "4 km",
    elevation: "200m",
    difficulty: "Easy",
    difficultyLevel: 1,
    duration: "1-2 hrs",
    hasContent: false,
  },
  {
    slug: "shimla-fagu",
    title: "Shimla to Fagu",
    category: "Road Cycling",
    categoryValue: "road",
    location: "Shimla District, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80",
    distance: "22 km",
    elevation: "800m",
    difficulty: "Moderate",
    difficultyLevel: 3,
    duration: "2-3 hrs",
    hasContent: false,
  },
  {
    slug: "kufri-road",
    title: "Kufri Road Climb",
    category: "Road Cycling",
    categoryValue: "road",
    location: "Kufri, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=800&q=80",
    distance: "45 km",
    elevation: "1500m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "3-4 hrs",
    hasContent: false,
  },
  {
    slug: "glen-forest",
    title: "Glen Forest Walk",
    category: "Nature Walk",
    categoryValue: "nature",
    location: "Shimla, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    distance: "5 km",
    elevation: "150m",
    difficulty: "Easy",
    difficultyLevel: 1,
    duration: "2 hrs",
    hasContent: false,
  },
  {
    slug: "mashobra-fkt",
    title: "Mashobra FKT",
    category: "FKT",
    categoryValue: "fkt",
    location: "Mashobra, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&q=80",
    distance: "28 km",
    elevation: "800m",
    difficulty: "Hard",
    difficultyLevel: 4,
    duration: "3 hrs",
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
  // Start with experience photos
  const experiencePhotos: GalleryPhoto[] = experiences.map((exp) => ({
    src: exp.image.replace("w=800", "w=400"),
    alt: exp.title,
    label: exp.title,
    href: exp.hasContent ? `/experience/${exp.slug}` : undefined,
    slug: exp.slug,
  }));

  // Add additional scenic photos (these don't link to experiences)
  const scenicPhotos: GalleryPhoto[] = [
    { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80", alt: "Mountain View", label: "Himalayan Vista", slug: "" },
    { src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80", alt: "Snow Peak", label: "Snow Peak Ride", slug: "" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80", alt: "Night Trail", label: "Starlight Trail", slug: "" },
    { src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80", alt: "Summit", label: "Summit Push", slug: "" },
    { src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&q=80", alt: "Forest Trail", label: "Forest Loop", slug: "" },
    { src: "https://images.unsplash.com/photo-1486218119243-13883505764c?w=400&q=80", alt: "Valley", label: "Valley Descent", slug: "" },
  ];

  return [...experiencePhotos, ...scenicPhotos];
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
  { label: "Road Cycling", value: "road" },
  { label: "Trail Running", value: "trail" },
  { label: "Hiking", value: "hiking" },
  { label: "Nature Walk", value: "nature" },
  { label: "FKT", value: "fkt" },
];

export const homepageCategories = [
  { title: "Mountain Biking", image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&q=80", href: "/experiences?category=mtb" },
  { title: "Road Cycling", image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80", href: "/experiences?category=road" },
  { title: "Trail Running", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80", href: "/experiences?category=trail" },
  { title: "Hiking & Treks", image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&q=80", href: "/experiences?category=hiking" },
  { title: "Nature Walks", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80", href: "/experiences?category=nature" },
  { title: "Gravel Cycling", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&q=80", href: "/experiences?category=gravel" },
];
