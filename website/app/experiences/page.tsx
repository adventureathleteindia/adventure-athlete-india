"use client";

import { useState } from "react";
import { Navigation, Footer } from "@/components/layout";
import { RouteCard, FilterPills, PhotoPileHero, CTASection } from "@/components/ui";
import { getExperiencesRouteCards, getExperiencesHeroPhotos, experienceCategories } from "@/lib/experiences";

// Get data from centralized config
const { initial: allRoutes, additional: additionalRoutes, all: totalRoutes } = getExperiencesRouteCards();
const categories = experienceCategories;
const heroPhotos = getExperiencesHeroPhotos();

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Use centralized data - totalRoutes comes from config
  const displayRoutes = showAll ? totalRoutes : allRoutes;

  // Apply filters
  const filteredRoutes = displayRoutes.filter((route) => {
    // Category filter
    if (activeFilter !== "all" && route.categoryValue !== activeFilter) {
      return false;
    }

    // Difficulty filter
    if (difficultyFilter && route.difficulty.toLowerCase() !== difficultyFilter) {
      return false;
    }

    // Duration filter (simplified matching)
    if (durationFilter) {
      const duration = route.duration.toLowerCase();
      if (durationFilter === "half-day" && !duration.includes("hr") && !duration.includes("2")) {
        return false;
      }
      if (durationFilter === "full-day" && duration.includes("day") && !duration.includes("2 day")) {
        return false;
      }
      if (durationFilter === "multi-day" && !duration.includes("day")) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <Navigation variant="solid" />

      {/* Photo Pile Hero with overlay title - per prototype */}
      <PhotoPileHero
        title="Explore the Himalayas"
        subtitle="These trails changed me. Maybe they'll change you too."
        photos={heroPhotos}
      />

      {/* Filter & Routes Section */}
      <section className="py-12 md:py-[var(--spacing-section)]">
        <div className="container">
          {/* Filter Pills - per prototype: margin-bottom: 40px */}
          <div className="mb-10">
            <FilterPills
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {/* Additional Filters - Dropdown Selects (per prototype: style="width: auto; min-width: 150px;") */}
          <div className="flex gap-[16px] mt-[16px] flex-wrap">
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '150px' }}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
            <select
              className="form-select"
              style={{ width: 'auto', minWidth: '150px' }}
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
            >
              <option value="">Duration</option>
              <option value="half-day">Half Day (2-4 hrs)</option>
              <option value="full-day">Full Day (4-8 hrs)</option>
              <option value="multi-day">Multi-Day</option>
            </select>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.title} {...route} />
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--color-slate)]">No experiences found matching your filters.</p>
            </div>
          )}

          {/* Load More Button - per prototype */}
          {!showAll && filteredRoutes.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="btn-outline-dark px-10 py-3.5 text-sm font-semibold tracking-wide border-2 border-[var(--color-slate-light)] text-[var(--color-slate-dark)] bg-transparent rounded cursor-pointer transition-all hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
              >
                Load More Experiences
              </button>
              <p className="mt-3 text-[13px] text-[var(--color-slate)]">
                Showing {filteredRoutes.length} of {totalRoutes.length} experiences
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA - per prototype: different text than homepage */}
      <CTASection
        title="Can't find what you're looking for?"
        subtitle="I can design a custom adventure based on your fitness, interests, and time."
        buttonText="Plan Custom Adventure"
      />
      <Footer />
    </>
  );
}
