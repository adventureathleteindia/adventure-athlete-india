import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { RouteCard, WhyAAI, CTASection, CategoryCarousel } from "@/components/ui";
import { getHomePageRouteCards, homepageCategories } from "@/lib/experiences";

// Get data from centralized config
const latestRoutes = getHomePageRouteCards();
const categories = homepageCategories;

export default function Home() {
  return (
    <>
      <Navigation variant="transparent" />

      {/* Hero Section - per prototype: padding: 80px 40px (80px vertical, 40px horizontal) */}
      <section
        className="relative h-screen min-h-[600px] flex flex-col justify-end bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')`,
          padding: '80px 40px',
        }}
      >
        {/* Per prototype: .hero-content { position: relative; max-width: 700px; } */}
        <div className="relative max-w-[700px]">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider leading-tight mb-4 md:whitespace-nowrap">
            Experience the Raw Himalayas
          </h1>
          {/* Per prototype: .hero p { font-size: 20px, font-weight: 300, opacity: 0.95 }, letter-spacing: 1px */}
          <p
            className="md:whitespace-nowrap mb-8"
            style={{
              fontSize: '20px',
              fontWeight: 300,
              opacity: 0.95,
              letterSpacing: '1px'
            }}
          >
            <span className="block sm:inline">
              <span className="text-[var(--color-amber)] mr-2 sm:hidden">|</span>
              Unmapped trails
            </span>
            <span className="hidden sm:inline text-[var(--color-amber)] mx-3">|</span>
            <span className="block sm:inline">
              <span className="text-[var(--color-amber)] mr-2 sm:hidden">|</span>
              Local athlete
            </span>
            <span className="hidden sm:inline text-[var(--color-amber)] mx-3">|</span>
            <span className="block sm:inline">
              <span className="text-[var(--color-amber)] mr-2 sm:hidden">|</span>
              Personal adventures
            </span>
            <span className="hidden sm:inline text-[var(--color-amber)] mx-3">|</span>
            <span className="block sm:inline">
              <span className="text-[var(--color-amber)] mr-2 sm:hidden">|</span>
              <span className="silver-shimmer">Yes, this is India.</span>
            </span>
          </p>
          {/* From prototype: uses btn-gradient class */}
          <Link href="/experiences" className="btn-gradient">
            Explore Experiences
          </Link>
        </div>
      </section>

      {/* Latest Adventures Section - reduced padding on mobile */}
      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container">
          <span className="section-label">Latest Adventures</span>
          <h2 className="section-title mt-2">Recently Explored</h2>
          {/* From prototype: <p class="section-text mb-16"> - reduced on mobile */}
          <p className="section-text mb-10 md:mb-16">
            Every route is a story. These are the trails I&apos;ve been discovering lately.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestRoutes.map((route) => (
              <RouteCard key={route.title} {...route} />
            ))}
          </div>

          {/* From prototype: style="padding: 16px 40px; font-size: 16px;" */}
          <div className="text-center mt-12">
            <Link href="/experiences" className="btn-gradient" style={{ padding: '16px 40px', fontSize: '16px' }}>
              View All Experiences →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Adventure Athlete India */}
      <WhyAAI />

      {/* Categories Section - reduced padding on mobile */}
      <section className="py-12 md:py-[var(--spacing-section)] bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label">Explore</span>
            <h2 className="section-title mt-2 mx-auto max-w-[500px]">Find Your Adventure</h2>
          </div>

          <CategoryCarousel categories={categories} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </>
  );
}
