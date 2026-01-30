"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Photo {
  src: string;
  alt: string;
  label: string;
  href?: string;
  style?: React.CSSProperties;
}

interface PhotoPileHeroProps {
  title: string;
  subtitle: string;
  photos: Photo[];
}

// Predefined positions for scattered photo effect - matches prototype exactly
const photoPositions = [
  { top: "5%", left: "5%", transform: "rotate(-8deg)", zIndex: 10, width: 180, height: 120 },
  { top: "8%", left: "20%", transform: "rotate(5deg)", zIndex: 12, width: 140, height: 100 },
  { top: "2%", left: "35%", transform: "rotate(-3deg)", zIndex: 8, width: 200, height: 140 },
  { top: "10%", left: "55%", transform: "rotate(7deg)", zIndex: 14, width: 150, height: 110 },
  { top: "5%", left: "72%", transform: "rotate(-6deg)", zIndex: 9, width: 170, height: 120 },
  { top: "3%", right: "5%", transform: "rotate(4deg)", zIndex: 11, width: 130, height: 90 },
  { top: "40%", left: "2%", transform: "rotate(6deg)", zIndex: 13, width: 160, height: 110 },
  { top: "45%", left: "18%", transform: "rotate(-4deg)", zIndex: 7, width: 190, height: 130 },
  { top: "50%", left: "40%", transform: "rotate(8deg)", zIndex: 15, width: 145, height: 100 },
  { top: "42%", left: "58%", transform: "rotate(-7deg)", zIndex: 10, width: 175, height: 120 },
  { top: "48%", left: "78%", transform: "rotate(5deg)", zIndex: 12, width: 155, height: 105 },
  { top: "70%", left: "8%", transform: "rotate(-5deg)", zIndex: 11, width: 140, height: 95 },
  { top: "72%", left: "25%", transform: "rotate(6deg)", zIndex: 9, width: 165, height: 115 },
  { top: "68%", left: "45%", transform: "rotate(-3deg)", zIndex: 14, width: 185, height: 125 },
  { top: "75%", left: "68%", transform: "rotate(4deg)", zIndex: 8, width: 150, height: 100 },
  { top: "65%", right: "3%", transform: "rotate(-8deg)", zIndex: 13, width: 135, height: 90 },
];

interface PhotoItemProps {
  photo: Photo;
  position: typeof photoPositions[0];
  onComingSoon?: () => void;
}

function PhotoItem({ photo, position, onComingSoon }: PhotoItemProps) {
  // Per prototype: box-shadow: 0 4px 15px rgba(0,0,0,0.2); hover: 0 10px 30px rgba(0,0,0,0.3)
  const className = "collage-photo absolute bg-white cursor-pointer transition-all duration-300 hover:scale-110 hover:!rotate-0 hover:!z-[100] group";
  const style = {
    top: position.top,
    left: position.left,
    right: position.right,
    transform: position.transform,
    zIndex: position.zIndex,
    width: position.width,
    padding: "6px", // Per prototype: padding: 6px
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)", // Per prototype exact value
  };

  const content = (
    <>
      <Image
        src={photo.src}
        alt={photo.alt}
        width={position.width}
        height={position.height}
        className="object-cover block"
        style={{ width: "100%", height: position.height }}
      />
      {/* Labels: always visible on mobile, hover-reveal on desktop */}
      <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-1.5 py-1 text-center opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
        {photo.label}
      </span>
    </>
  );

  if (photo.href) {
    return (
      <Link href={photo.href} className={className} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={className} style={style} onClick={onComingSoon}>
      {content}
    </div>
  );
}

export default function PhotoPileHero({ title, subtitle, photos }: PhotoPileHeroProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="collage-hero relative h-[450px] overflow-hidden bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      {/* Photo Pile Container */}
      <div className="absolute inset-0 flex flex-wrap justify-center items-center p-5">
        {photos.map((photo, index) => {
          const pos = photoPositions[index % photoPositions.length];
          return (
            <PhotoItem
              key={index}
              photo={photo}
              position={pos}
              onComingSoon={!photo.href ? () => setShowComingSoon(true) : undefined}
            />
          );
        })}
      </div>

      {/* Overlay with Title - INSIDE the collage per prototype */}
      <div className="collage-overlay absolute inset-0 bg-gradient-to-b from-black/10 to-black/50 flex flex-col justify-center items-center text-center text-white z-50 pointer-events-none">
        {/* Per prototype: letter-spacing: 2px; text-shadow: 0 2px 20px rgba(0,0,0,0.5) */}
        <h1
          className="font-[family-name:var(--font-heading)] text-[clamp(32px,5vw,56px)] uppercase mb-4"
          style={{
            letterSpacing: "2px",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </h1>
        {/* Per prototype: text-shadow: 0 1px 10px rgba(0,0,0,0.5) */}
        <p
          className="text-lg max-w-[500px] leading-relaxed"
          style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
        >
          {subtitle}
        </p>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-sm text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-amber)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--color-amber)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-charcoal)] mb-2">
              Coming Soon
            </h3>
            <p className="text-[var(--color-slate)] mb-6">
              I&apos;m still mapping this one.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="btn px-6 py-2 bg-[var(--color-forest)] text-white rounded-md hover:bg-[var(--color-forest-dark)] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
