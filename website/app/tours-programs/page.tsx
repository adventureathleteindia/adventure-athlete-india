/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

// Program card data
const programs = [
  {
    title: "Shimla to Dharamshala Bike Tour",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80",
    duration: "4 Days",
    type: "Bike Tour",
    description:
      "Ride through the heart of Himachal \u2014 from colonial Shimla to the Tibetan town of Dharamshala. Mountain passes, pine forests, and valley descents on this epic multi-day cycling journey.",
    difficulty: "Moderate\u2013Hard",
    days: "4 Days",
    season: "Mar\u2013Jun, Oct\u2013Nov",
  },
  {
    title: "Manali to Leh High Altitude Ride",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&q=80",
    duration: "8\u201310 Days",
    type: "High Altitude",
    description:
      "The ultimate high-pass cycling adventure. Cross Baralacha La (4,890m), Lachalung La (5,059m), and Tanglang La (5,328m) \u2014 riding through landscapes that don\u2019t feel real. For those who want the real thing.",
    difficulty: "Hard",
    days: "8\u201310 Days",
    season: "Jun\u2013Sep",
  },
  {
    title: "Village Base Camp",
    image: "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?w=800&q=80",
    duration: "3\u20137 Days",
    type: "Village Experience",
    description:
      "Stay in a traditional Himalayan village. Walk through apple orchards, run local trails, explore the slow life. This is the Himalayas most people never see \u2014 authentic, quiet, and real.",
    difficulty: "Easy\u2013Moderate",
    days: "3\u20137 Days",
    season: "Year Round",
  },
  {
    title: "Wellness Retreat",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    duration: "Varies",
    type: "Wellness",
    description:
      "Yoga, meditation, and mountain wellness \u2014 facilitated through trusted local partners. Combine with trail runs or nature walks for a balanced mountain experience.",
    difficulty: "Easy",
    days: "Flexible",
    season: "Year Round",
  },
  {
    title: "Train with a Pro",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    duration: "Custom",
    type: "MTB · Trail Running · Skiing",
    description:
      "Learn from professional athletes in three disciplines. Whether you want to master mountain biking trails, improve your trail running technique, or carve through Himalayan snow \u2014 our partnered pros will coach you based on your level and goals.",
    difficulty: "All Levels",
    days: "Custom (3\u201314 days)",
    season: "Year Round",
    sports: ["Mountain Biking", "Trail Running", "Skiing"],
  },
];

// Steps data
const steps = [
  {
    number: 1,
    title: "Pick a Program",
    text: "Browse the programs above or tell me what kind of adventure you\u2019re looking for.",
  },
  {
    number: 2,
    title: "Share Your Details",
    text: "Fill the inquiry form with your dates, fitness level, and group size. I\u2019ll get back within 48 hours.",
  },
  {
    number: 3,
    title: "Adventure Begins",
    text: "I\u2019ll design a custom itinerary around you. Once confirmed, just show up \u2014 I handle the rest.",
  },
];

// SVG icons for meta items
const DifficultyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: '16px', height: '16px', opacity: 0.7 }}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const DurationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: '16px', height: '16px', opacity: 0.7 }}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const SeasonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: '16px', height: '16px', opacity: 0.7 }}
  >
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function ToursProgramsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={{ overflowX: 'hidden', width: '100%' }}>
      <Navigation variant="solid" />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px 40px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
          }}
        />
        {/* Hero content */}
        <div style={{ position: 'relative', maxWidth: '700px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              lineHeight: 1.1,
              marginBottom: '16px',
              color: 'white',
              marginTop: 0,
            }}
          >
            Tours &amp; Programs
          </h1>
          <div
            style={{
              fontSize: 'clamp(14px, 3vw, 20px)',
              fontWeight: 300,
              opacity: 0.95,
              maxWidth: '600px',
              color: 'white',
              margin: 0,
              fontFamily: 'var(--font-body)',
              lineHeight: 1.8,
            }}
          >
            <div>
              Multi-day adventures
              <span style={{ color: '#F59E0B', margin: '0 8px', fontWeight: 300 }}>|</span>
              Village experiences
            </div>
            <div>
              Wellness retreats
              <span style={{ color: '#F59E0B', margin: '0 8px', fontWeight: 300 }}>|</span>
              <span className="silver-shimmer">Designed around you.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">Choose Your Adventure</h2>
            <p className="section-text" style={{ textAlign: 'center', margin: '0 auto' }}>
              Multi-day programs designed around your pace, your interests, and your sense of
              adventure.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
            }}
          >
            {programs.map((program, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow:
                    hoveredCard === index
                      ? '0 8px 30px rgba(0,0,0,0.12)'
                      : '0 2px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/10',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s',
                      transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  {/* Duration badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {program.duration}
                  </span>
                  {/* Type tag */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {program.type}
                  </span>
                </div>

                {/* Card content */}
                <div style={{ padding: '24px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      fontWeight: 400,
                      marginBottom: '12px',
                      color: 'var(--color-dark)',
                      marginTop: 0,
                    }}
                  >
                    {program.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      color: 'var(--color-slate-dark)',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                      marginTop: 0,
                    }}
                  >
                    {program.description}
                  </p>

                  {/* Meta row */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      marginBottom: '20px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid var(--color-gray-100)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: 'var(--color-slate)',
                      }}
                    >
                      <DifficultyIcon />
                      {program.difficulty}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: 'var(--color-slate)',
                      }}
                    >
                      <DurationIcon />
                      {program.days}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13px',
                        color: 'var(--color-slate)',
                      }}
                    >
                      <SeasonIcon />
                      {program.season}
                    </span>
                  </div>

                  {/* CTA button */}
                  <Link
                    href="/plan-tour"
                    style={{
                      display: 'inline-block',
                      padding: '12px 28px',
                      background: 'linear-gradient(90deg, #F59E0B 0%, #B45309 100%)',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Three Simple Steps</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
            className="steps-grid-responsive"
          >
            {steps.map((step) => (
              <div key={step.number} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--color-forest)',
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  {step.number}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    marginBottom: '8px',
                    marginTop: 0,
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-slate)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          padding: '70px 40px',
          textAlign: 'center',
        }}
      >
        <h2 className="section-title" style={{ marginBottom: '16px' }}>
          Not sure which program suits you?
        </h2>
        <p
          className="section-text"
          style={{ textAlign: 'center', margin: '0 auto 40px' }}
        >
          Tell me about yourself {"\u2014"} your fitness, interests, and dates. I{"\u2019"}ll
          recommend the perfect program.
        </p>
        <Link
          href="/plan-tour"
          style={{
            background: 'linear-gradient(90deg, #F59E0B 0%, #B45309 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
          }}
        >
          Let{"\u2019"}s Talk
        </Link>
      </section>

      {/* Responsive styles for steps grid */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .steps-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
