"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ComingSoonModal from "./ComingSoonModal";

// Icons for route metadata
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 opacity-70">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ElevationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 opacity-70">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
  </svg>
);

const DifficultyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 opacity-70">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const DurationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 opacity-70">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

interface RouteCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
  distance?: string;
  elevation?: string;
  difficulty?: string;
  duration?: string;
  compact?: boolean;
  hasContent?: boolean; // New prop - if false, shows Coming Soon modal
}

export default function RouteCard({
  title,
  category,
  image,
  href,
  distance,
  elevation,
  difficulty,
  duration,
  compact = false,
  hasContent = true, // Default to true for backward compatibility
}: RouteCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!hasContent) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const CardContent = (
    <>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Coming Soon badge overlay for experiences without content */}
        {!hasContent && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-[var(--color-amber)]">Coming Soon</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        {/* Category */}
        {category && (
          <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[var(--color-amber)] mb-2">
            {category}
          </div>
        )}

        {/* Title */}
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-dark)] mb-2">
          {title}
        </h3>

        {/* Metadata - hidden in compact mode */}
        {/* From prototype: .route-card-meta { font-size: 14px; color: var(--slate); } */}
        {!compact && (distance || elevation || difficulty || duration) && (
          <div className="flex flex-wrap items-center gap-4 text-[14px] text-[var(--color-slate)] mt-2">
            {distance && (
              <span className="flex items-center gap-1.5">
                <LocationIcon />
                {distance}
              </span>
            )}
            {elevation && (
              <span className="flex items-center gap-1.5">
                <ElevationIcon />
                {elevation}
              </span>
            )}
            {difficulty && (
              <span className="flex items-center gap-1.5">
                <DifficultyIcon />
                {difficulty}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1.5">
                <DurationIcon />
                {duration}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        className="block cursor-pointer transition-transform duration-300 hover:-translate-y-1 group"
      >
        {CardContent}
      </Link>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Coming Soon"
        message={`The "${title}" experience documentation is being prepared. Check back soon for the full route details, photos, and trail notes.`}
        type="experience"
      />
    </>
  );
}
