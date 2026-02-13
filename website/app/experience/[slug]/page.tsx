"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navigation, Footer } from "@/components/layout";
import { StatsDashboard, AudioPlayer, VideoPlayer, ElevationChart } from "@/components/ui";
import { getExperienceBySlug, defaultAuthor } from "@/lib/experiences";

// Grid Icon for View All button
const GridIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const experience = getExperienceBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Show "not found" if experience doesn't exist or doesn't have content
  if (!experience || !experience.hasContent) {
    return (
      <>
        <Navigation variant="solid" />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="section-title">
              {experience ? "Coming Soon" : "Experience not found"}
            </h1>
            {experience && (
              <p className="text-[var(--color-slate)] mb-4">
                Content for {experience.title} is being prepared.
              </p>
            )}
            <Link href="/experiences" className="btn-gradient mt-4">
              Back to Experiences
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get author (use default if not specified)
  const author = experience.author || defaultAuthor;

  // Get hero image (fall back to card image)
  const heroImage = experience.heroImage || experience.image;

  // Get photos (fall back to single image array)
  const photos = experience.photos || [experience.image];

  // Show View All if more than 4 photos
  const hasMorePhotos = photos.length > 4;
  const remainingCount = photos.length - 3;

  return (
    <>
      <Navigation variant="solid" />

      {/* Hero Image */}
      <div
        className="relative w-full h-[70vh] min-h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-full max-w-[900px] px-6 z-10 text-white">
          <span className="inline-block bg-[var(--color-amber)] text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase mb-4" style={{ letterSpacing: '1px' }}>
            {experience.category}
          </span>
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,6vw,4rem)] font-medium mb-2" style={{ lineHeight: 1.1 }}>
            {experience.title}
          </h1>
          <p className="text-lg opacity-90">{experience.location}</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="px-6">
        <StatsDashboard
          distance={experience.distance}
          elevation={experience.elevation}
          duration={experience.duration}
          difficulty={experience.difficulty}
          difficultyLevel={experience.difficultyLevel}
          route={experience.route}
          bestSeason={experience.bestSeason}
          gear={experience.gear}
        />
      </div>

      {/* Photo Gallery - Responsive: Mobile (2 cols) / Desktop (3 cols) */}
      <div className="max-w-[900px] mx-auto my-12 px-6">
        <div className="photo-gallery-grid">
          {/* First image spans 2 rows on both mobile and desktop */}
          <Image
            src={photos[0]}
            alt="Trail view"
            width={600}
            height={400}
            onClick={() => setLightboxIndex(0)}
            className="photo-main"
          />

          {/* First small image - always visible */}
          {photos[1] && (
            <Image
              src={photos[1]}
              alt="Photo 2"
              width={300}
              height={200}
              onClick={() => setLightboxIndex(1)}
              className="photo-small"
            />
          )}

          {/* Second small image - desktop only (hidden on mobile) */}
          {photos[2] && (
            <Image
              src={photos[2]}
              alt="Photo 3"
              width={300}
              height={200}
              onClick={() => setLightboxIndex(2)}
              className="photo-small photo-desktop-only"
            />
          )}

          {/* View All Overlay */}
          {hasMorePhotos ? (
            <div className="view-all-overlay" onClick={() => setLightboxIndex(3)}>
              <Image
                src={photos[3]}
                alt="More photos"
                width={300}
                height={200}
              />
              <div className="overlay-content">
                <GridIcon />
                <span className="font-[family-name:var(--font-heading)] text-sm md:text-base font-medium mt-1 md:mt-2">View All</span>
                <span className="text-[11px] md:text-[13px] opacity-80 mt-0.5">+{remainingCount} photos</span>
              </div>
            </div>
          ) : (
            /* If 4 or fewer photos, show the last one normally */
            photos[3] && (
              <Image
                src={photos[3]}
                alt="Photo 4"
                width={300}
                height={200}
                onClick={() => setLightboxIndex(3)}
                className="photo-small"
              />
            )
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          title={experience.title}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Content - per prototype order */}
      <div className="max-w-[720px] mx-auto px-6 pb-[60px]">
        {/* 1. Intro paragraph - per prototype: font-size: 20px; font-weight: 400; color: var(--charcoal) */}
        {experience.intro && (
          <p className="mb-5" style={{ fontSize: '20px', fontWeight: 400, color: 'var(--color-charcoal)' }}>
            {experience.intro}
          </p>
        )}

        {/* 2. Opening paragraph - per prototype: font-size: 18px; line-height: 1.8 */}
        {experience.openingParagraph && (
          <p className="mb-5" style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--color-slate-dark)' }}>
            {experience.openingParagraph}
          </p>
        )}

        {/* 3. Audio Player - per prototype (only show if audio has src) */}
        {experience.audio && experience.audio.src && (
          <AudioPlayer
            title={experience.audio.title}
            duration={experience.audio.duration}
            audioSrc={experience.audio.src}
          />
        )}

        {/* 4. "The Route" heading - per prototype (only show if content exists) */}
        {experience.content && (
          <>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
              The Route
            </h2>

            {/* 5. Rest of content paragraphs - per prototype: font-size: 18px; line-height: 1.8 */}
            {experience.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-5" style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--color-slate-dark)' }}>
                {paragraph}
              </p>
            ))}
          </>
        )}

        {/* 6. Elevation Profile - replaces broken Strava embed */}
        <ElevationChart slug={slug} />

        {/* 7. Video Section - per prototype (only show if video thumbnail exists) */}
        {experience.video && experience.video.thumbnail && (
          <>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
              Video
            </h2>
            <VideoPlayer
              thumbnailSrc={experience.video.thumbnail}
              title={experience.video.title}
              youtubeId={experience.video.youtubeId}
            />
          </>
        )}

        {/* 8. My Notes Callout - per prototype comes after video */}
        {experience.notes && experience.notes.length > 0 && (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-7 my-8 border-l-4 border-[var(--color-amber)]">
            <h3 className="font-[family-name:var(--font-heading)] text-lg mb-3 text-[var(--color-charcoal)]">My Notes</h3>
            {experience.notes.map((note, index) => (
              <p key={index} className="text-base text-[var(--color-charcoal)] mb-3 last:mb-0">
                <strong>{note.title}</strong> {note.text}
              </p>
            ))}
          </div>
        )}

        {/* Getting There */}
        {experience.gettingThere && (
          <>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
              Getting There
            </h2>
            {experience.gettingThere.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-5" style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--color-slate-dark)' }}>
                {paragraph.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}
              </p>
            ))}
          </>
        )}

        {/* What to Bring */}
        {experience.whatToBring && experience.whatToBring.length > 0 && (
          <>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mt-12 mb-5 text-[var(--color-charcoal)]">
              What to Bring
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {experience.whatToBring.map((item, index) => (
                <li key={index} className="text-[17px] text-[var(--color-slate-dark)]" style={{ lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Author & CTA Section */}
      <div className="max-w-[720px] mx-auto px-6 py-12 border-t border-[var(--color-gray-200)] text-center">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[1.5px] text-[var(--color-forest)] font-semibold block mb-1">
            Author
          </span>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Image
              src={author.image}
              alt={author.name}
              width={28}
              height={28}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-charcoal)]">
              {author.name}
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-slate)] mb-3">
            {author.credentials.split(' | ').map((cred, i, arr) => (
              <span key={i}>
                {cred}
                {i < arr.length - 1 && <span className="text-[var(--color-amber)] mx-1">|</span>}
              </span>
            ))}
          </p>
          {/* Author Social Links */}
          {author.socials && (
            <div className="flex gap-3 justify-center">
              {author.socials.instagram && (
                <a
                  href={author.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[var(--color-gray-100)] text-[var(--color-slate-dark)] flex items-center justify-center transition-all hover:bg-[#E4405F] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {author.socials.youtube && (
                <a
                  href={author.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[var(--color-gray-100)] text-[var(--color-slate-dark)] flex items-center justify-center transition-all hover:bg-[#FF0000] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {author.socials.strava && (
                <a
                  href={author.socials.strava}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Strava"
                  className="w-9 h-9 rounded-full bg-[var(--color-gray-100)] text-[var(--color-slate-dark)] flex items-center justify-center transition-all hover:bg-[#FC4C02] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/></svg>
                </a>
              )}
              {author.socials.facebook && (
                <a
                  href={author.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[var(--color-gray-100)] text-[var(--color-slate-dark)] flex items-center justify-center transition-all hover:bg-[#1877F2] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-gray-50)] rounded-xl p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-[22px] mb-2 text-[var(--color-charcoal)]">
            Interested in this route?
          </h3>
          <p className="text-[15px] text-[var(--color-slate)] mb-5 max-w-[400px] mx-auto">
            Share your dates and fitness level — I&apos;ll help you plan the perfect adventure.
          </p>
          <Link href="/plan" className="btn-flag">
            Let&apos;s Plan Together
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

// ============================================================
// Lightbox Component - Full-screen photo viewer with navigation
// ============================================================
function Lightbox({
  photos,
  title,
  initialIndex,
  onClose,
}: {
  photos: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Gallery`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '44px',
          height: '44px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '14px',
        zIndex: 10,
      }}>
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous photo"
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next photo"
        style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Photo - natural aspect ratio */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={photos[currentIndex]}
          alt={`${title} photo ${currentIndex + 1}`}
          width={1200}
          height={900}
          style={{
            maxWidth: '90vw',
            maxHeight: '80vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '4px',
          }}
        />
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          maxWidth: '90vw',
          overflowX: 'auto',
          padding: '8px',
        }}
      >
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`View photo ${index + 1}`}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '4px',
              overflow: 'hidden',
              border: index === currentIndex ? '2px solid white' : '2px solid transparent',
              opacity: index === currentIndex ? 1 : 0.5,
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
              background: 'none',
            }}
          >
            <Image
              src={photo}
              alt={`Thumbnail ${index + 1}`}
              width={48}
              height={48}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
