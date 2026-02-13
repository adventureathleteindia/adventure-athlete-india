"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { ProfileDashboard, RaceResults } from "@/components/ui";
import { getAboutGalleryPhotos } from "@/lib/experiences";

// Social Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const RunnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
  </svg>
);

const socialLinks = [
  { href: "https://instagram.com/adventureathlete.in", icon: InstagramIcon, hoverBg: "#E4405F" },
  { href: "https://youtube.com/@adventureathleteindia", icon: YouTubeIcon, hoverBg: "#FF0000" },
  { href: "https://strava.com/athletes/atulchauhan", icon: StravaIcon, hoverBg: "#FC4C02" },
  { href: "https://facebook.com/adventureathleteindia", icon: FacebookIcon, hoverBg: "#1877F2" },
  { href: "https://itra.run/RunnerSpace/Atul.Chauhan", icon: RunnerIcon, hoverBg: "var(--color-forest)" },
];

const journey = [
  { year: "The Dream", text: "Wanted to race motorsports. Couldn't afford it. Found bikes instead." },
  { year: "2015 - The Accident", text: "4 months bed rest. Doctor said I'd never run again. I had other plans." },
  { year: "2016 - The Comeback", text: "Started cycling against family's wishes. Dad gifted my first bike anyway. One month later — 22nd overall at Hero MTB Himalaya." },
  { year: "2017-2021", text: "5 National Championships. Multiple podiums. First MTB summits no one had done before." },
  { year: "Now", text: "Less racing, more exploring. Meeting riders from around the world. Showing them my Himalayas." },
];

const summits = [
  { name: "Chandernahan Lake", altitude: "4,000m", desc: "First MTB to the sacred lake, 2019", image: "/images/about-chandernahan.jpg" },
  { name: "Nochi Top", altitude: "3,500m", desc: "First MTB ascent, Winter 2020", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80" },
  { name: "Kuppar Peak", altitude: "3,350m", desc: "First MTB summit from Shimla side", image: "/images/experiences/kuppar-peak.jpg" },
];

// Per prototype: exact dashboard content
const profileStats = {
  primaryStats: [
    { label: "ITRA Score", value: "555" },
    { label: "FTP Power", value: "290W" },
    { label: "VK PR", value: "54 min" },
    { label: "National Championships", value: "5x" },
  ],
  secondaryStats: [
    { label: "Guide License", value: "HP Tourism", subtext: "Reg: 080724 42383" },
    { label: "Strava Stats", value: "Cycling 30,000+ kms\nRunning 3,000+ kms" },
    { label: "Education", value: "MBA - HPU\nB.Tech Honors - LPU" },
    { label: "Career", value: "Business Analyst", subtext: "Tech funds the adventures" },
  ],
};

// Result format per prototype: 🥇 1st, 🥈 2nd, 🥉 3rd, or plain text for non-podium
const raceResults = [
  { year: "2024", event: "MTB National Championship", type: "Mountain Biking", result: "🥇 1st", certificateImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80" },
  { year: "2023", event: "Hero MTB Himalaya", type: "Mountain Biking", result: "🥈 2nd", certificateImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80" },
  { year: "2023", event: "Shimla Trail Half Marathon", type: "Trail Running", result: "🥇 1st", certificateImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80" },
  { year: "2022", event: "MTB National Championship", type: "Mountain Biking", result: "🥇 1st" },
  { year: "2022", event: "Manali-Leh MTB Challenge", type: "Mountain Biking", result: "🥉 3rd" },
  { year: "2021", event: "MTB National Championship", type: "Mountain Biking", result: "🥇 1st" },
  { year: "2021", event: "India Ultra Trail 100K", type: "Trail Running", result: "8th" },
  { year: "2020", event: "MTB National Championship", type: "Mountain Biking", result: "🥇 1st" },
  { year: "2019", event: "Hero MTB Himalaya", type: "Mountain Biking", result: "22nd" },
  { year: "2019", event: "MTB National Championship", type: "Mountain Biking", result: "🥇 1st" },
  { year: "2018", event: "Raid de Himalaya MTB", type: "Mountain Biking", result: "5th" },
  { year: "2017", event: "Hero MTB Himalaya", type: "Mountain Biking", result: "🥇 1st" },
];

// Gallery photos - from centralized config with positions
const galleryPhotos = getAboutGalleryPhotos();

export default function AboutPage() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <>
      <Navigation variant="solid" />

      {/* Hero Section */}
      <section className="pt-[120px] pb-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <Image
                src="/images/atul-hero.jpg"
                alt="Atul Chauhan"
                width={500}
                height={600}
                className="w-full rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -right-5 w-[80%] h-[80%] border-[3px] border-[var(--color-amber)] rounded-xl -z-10" />
            </div>

            {/* Intro */}
            <div>
              <span className="section-label">About</span>
              <h1 className="font-[family-name:var(--font-heading)] text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-6">
                I&apos;m Atul.<br />I ride, I run, I explore.
              </h1>
              <p className="text-xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-8">
                Based in Shimla, I&apos;ve spent a decade discovering trails that most maps don&apos;t show. These mountains are my home, my training ground, and my passion.
              </p>
              <p className="text-xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-8">
                Adventure Athlete India isn&apos;t a tour company - it&apos;s me sharing the Himalayas I know and love.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center transition-all hover:scale-110"
                    style={{ color: 'rgb(100, 116, 139)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.hoverBg;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.color = "rgb(100, 116, 139)";
                    }}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Dashboard */}
          <ProfileDashboard {...profileStats} />
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Journey Timeline */}
            <div className="max-w-[700px]">
              <span className="section-label">The Journey</span>
              <h2 className="section-title mt-2">How I Got Here</h2>

              <div className="mt-10">
                {journey.map((item, index) => (
                  <div key={index} className="mb-10 pl-6 border-l-2 border-[var(--color-gray-200)] relative">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 bg-[var(--color-amber)] rounded-full" />
                    <div className="text-[13px] font-semibold text-[var(--color-amber)] uppercase tracking-wider mb-2">
                      {item.year}
                    </div>
                    <p className="text-[17px] leading-relaxed text-[var(--color-slate-dark)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* First Ascents */}
            <div>
              <span className="section-label">First Ascents</span>
              <h2 className="section-title mt-2">Peaks No One Had Biked</h2>
              <p className="section-text mb-8">Summits I&apos;ve taken a mountain bike to that no one else had before.</p>

              <div className="space-y-5">
                {summits.map((summit) => (
                  <div key={summit.name} className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-[180px]">
                      <Image
                        src={summit.image}
                        alt={summit.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 right-3 font-[family-name:var(--font-heading)] text-2xl text-white bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
                        {summit.altitude}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-[family-name:var(--font-heading)] text-lg mb-1">{summit.name}</h4>
                      <p className="text-sm text-[var(--color-slate)]">{summit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Race Results - per prototype: editorial-section alt = gray-50 bg, centered container max-w-4xl */}
      <section className="py-20 bg-[var(--color-gray-50)]">
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 24px' }}>
          <span className="section-label">Race Results</span>
          <h2 className="section-title mt-2 mb-8">On the Podium</h2>
          <RaceResults results={raceResults} />
        </div>
      </section>

      {/* Photo Pile Gallery - per prototype: padding: 60px 0 0 */}
      <section style={{ padding: '60px 0 0' }}>
        <div className="container text-center">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Moments from the Trail</h2>
        </div>
        {/* Per prototype: height: 420px; overflow: hidden; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); margin-top: 40px */}
        <div style={{ position: 'relative', height: '420px', overflow: 'hidden', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', marginTop: '40px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {galleryPhotos.map((photo, index) => {
              const photoContent = (
                <>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.style.width}
                    height={photo.style.height}
                    style={{ display: 'block', objectFit: 'cover', width: '100%', height: photo.style.height }}
                  />
                  {/* Labels: always visible on mobile, hover-to-show on desktop */}
                  <span
                    className="opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      fontSize: '10px',
                      padding: '4px 6px',
                      textAlign: 'center',
                    }}
                  >
                    {photo.label}
                  </span>
                </>
              );

              const baseStyle = {
                position: 'absolute' as const,
                background: 'white',
                padding: '6px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'transform 0.3s, z-index 0.3s, box-shadow 0.3s',
                width: photo.style.width,
                top: photo.style.top,
                left: photo.style.left,
                right: photo.style.right,
                transform: photo.style.transform,
                zIndex: photo.style.zIndex,
              };

              const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(0deg)';
                e.currentTarget.style.zIndex = '100';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
              };

              const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.transform = photo.style.transform;
                e.currentTarget.style.zIndex = String(photo.style.zIndex);
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              };

              // If has href (content ready), render as Link; otherwise show Coming Soon
              if (photo.href) {
                return (
                  <Link
                    key={index}
                    href={photo.href}
                    className="group"
                    style={baseStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {photoContent}
                  </Link>
                );
              }

              return (
                <div
                  key={index}
                  onClick={() => setShowComingSoon(true)}
                  className="group"
                  style={baseStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {photoContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Quote - per prototype: editorial-section alt = gray-50 bg */}
      <section className="py-20 bg-[var(--color-gray-50)]">
        <div className="container">
          <div className="max-w-[800px] mx-auto p-[60px] bg-[var(--color-gray-100)] rounded-2xl text-center">
            <blockquote className="text-2xl font-light leading-relaxed text-[var(--color-slate-dark)] mb-6">
              &quot;When you ride or run with me, you&apos;re not getting a tour guide. You&apos;re getting a training partner who happens to know every trail, every chai stop, and every shortcut in these hills.&quot;
            </blockquote>
            <cite className="text-sm text-[var(--color-slate)]">- Atul</cite>
          </div>
        </div>
      </section>

      {/* No CTA section on About page per prototype - goes directly to Footer */}
      <Footer />
    </>
  );
}
