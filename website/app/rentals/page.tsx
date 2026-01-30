/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

// SVG Icon components
const MountainIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
  </svg>
);

const CircleIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const CheckCircleIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const ChatIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PlusIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const ClockIcon = ({ size = 16, strokeWidth = 2 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const SearchIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--color-forest)" }}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// Equipment data
const equipmentItems = [
  {
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&q=80",
    alt: "Mountain Bikes",
    category: "Cycling",
    title: "Mountain Bikes",
    availability: "available" as const,
    availabilityLabel: "Available",
    specs: [
      { icon: "mountain", text: "Hardtail or full-suspension \u2014 based on your ride" },
      { icon: "circle", text: "Trail, cross-country & mountain terrain" },
      { icon: "check", text: "Helmet & basic tools included" },
      { icon: "chat", text: "Tell me your plan \u2014 I\u2019ll arrange the right bike" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    alt: "Ski Equipment",
    category: "Winter Sports",
    title: "Ski Set",
    availability: "limited" as const,
    availabilityLabel: "Seasonal",
    specs: [
      { icon: "mountain", text: "All-mountain skis" },
      { icon: "plus", text: "Boots, poles & bindings included" },
      { icon: "clock", text: "Available Dec\u2013Feb" },
      { icon: "check", text: "Suitable for intermediate skiers" },
    ],
  },
];

const rentalTerms = [
  "Valid government ID (Aadhaar/Passport) required at pickup",
  "Advance payment required to confirm booking",
  "Equipment must be returned in same condition",
  "Renter is responsible for any damage during rental period",
  "Helmet must be worn at all times (provided)",
  "Late returns may incur additional charges",
  "Cancellation: Full refund if cancelled 24hrs before rental date",
];

const steps = [
  {
    icon: "search",
    title: "Browse",
    text: "Check out the gear above. Pick what suits your adventure.",
  },
  {
    icon: "chat",
    title: "Contact Me",
    text: "Drop a message with your dates and what you need. I\u2019ll confirm availability.",
  },
  {
    icon: "check",
    title: "I Arrange It",
    text: "Show up and ride. I handle setup, sizing, and handover.",
  },
];

function SpecIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "mountain":
      return <MountainIcon size={16} strokeWidth={2} />;
    case "circle":
      return <CircleIcon size={16} strokeWidth={2} />;
    case "check":
      return <CheckCircleIcon size={16} strokeWidth={2} />;
    case "chat":
      return <ChatIcon size={16} strokeWidth={2} />;
    case "plus":
      return <PlusIcon size={16} strokeWidth={2} />;
    case "clock":
      return <ClockIcon size={16} strokeWidth={2} />;
    default:
      return null;
  }
}

function StepIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "search":
      return <SearchIcon size={28} />;
    case "chat":
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--color-forest)" }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "check":
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--color-forest)" }}>
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    default:
      return null;
  }
}

export default function RentalsPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div
        style={{
          padding: "120px 40px 60px",
          background: "var(--color-gray-50)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            className="section-label"
            style={{ display: "block", marginBottom: "12px" }}
          >
            Gear Up
          </span>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginBottom: "16px" }}
          >
            Equipment Rentals
          </h1>
          <p
            className="section-text"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            Quality gear for every terrain.
          </p>
        </div>
      </div>

      {/* Equipment Catalog */}
      <section>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {equipmentItems.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
                  const img = e.currentTarget.querySelector("img");
                  if (img) img.style.transform = "scale(1)";
                }}
              >
                {/* Card Image */}
                <div
                  style={{
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "var(--color-gray-100)",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s",
                    }}
                  />
                </div>

                {/* Card Content */}
                <div style={{ padding: "24px" }}>
                  {/* Category */}
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "var(--color-amber)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "22px",
                      fontWeight: 400,
                      marginBottom: "12px",
                      color: "var(--color-dark)",
                      marginTop: 0,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Availability Badge */}
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      background:
                        item.availability === "available"
                          ? "rgba(45, 90, 61, 0.1)"
                          : "rgba(217, 119, 6, 0.1)",
                      color:
                        item.availability === "available"
                          ? "var(--color-forest)"
                          : "var(--color-amber)",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background:
                          item.availability === "available"
                            ? "var(--color-forest)"
                            : "var(--color-amber)",
                      }}
                    />
                    {item.availabilityLabel}
                  </span>

                  {/* Specs List */}
                  <ul style={{ listStyle: "none", marginBottom: "16px", padding: 0, marginTop: "12px" }}>
                    {item.specs.map((spec, specIdx) => (
                      <li
                        key={specIdx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                          color: "var(--color-slate-dark)",
                          padding: "6px 0",
                          borderBottom:
                            specIdx < item.specs.length - 1
                              ? "1px solid var(--color-gray-100)"
                              : "none",
                        }}
                      >
                        <span style={{ width: "16px", height: "16px", color: "var(--color-forest)", flexShrink: 0 }}>
                          <SpecIcon icon={spec.icon} />
                        </span>
                        {spec.text}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "16px",
                      borderTop: "1px solid var(--color-gray-100)",
                      marginTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "20px",
                        color: "var(--color-dark)",
                      }}
                    >
                      Enquire{" "}
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "var(--color-slate)",
                          fontWeight: 400,
                        }}
                      >
                        for rates
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-block",
                        padding: "10px 24px",
                        background: "linear-gradient(90deg, #F59E0B 0%, #B45309 100%)",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        borderRadius: "4px",
                        transition: "transform 0.2s, box-shadow 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(217, 119, 6, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      Book This
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Terms Section */}
      <section style={{ background: "var(--color-gray-50)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-label">Rental Terms</span>
            <h2 className="section-title">Before You Ride</h2>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {rentalTerms.map((term, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontSize: "15px",
                  color: "var(--color-slate-dark)",
                  lineHeight: 1.7,
                  padding: "10px 0",
                  borderBottom:
                    idx < rentalTerms.length - 1
                      ? "1px solid var(--color-gray-200)"
                      : "none",
                }}
              >
                <span style={{ width: "20px", height: "20px", color: "var(--color-forest)", flexShrink: 0, marginTop: "3px" }}>
                  <CheckCircleIcon size={20} strokeWidth={2} />
                </span>
                <span>{term}</span>
              </li>
            ))}
          </ul>

          {/* Note Box */}
          <div
            style={{
              maxWidth: "700px",
              margin: "32px auto 0",
              padding: "20px 24px",
              background: "white",
              borderRadius: "8px",
              borderLeft: "3px solid var(--color-amber)",
              fontSize: "14px",
              color: "var(--color-slate-dark)",
              lineHeight: 1.7,
            }}
          >
            <p style={{ margin: 0 }}>
              A rental agreement form will be provided at the time of equipment pickup.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: "var(--color-gray-50)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "48px" }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Rent in Three Steps</h2>
          </div>
          <div
            className="rentals-steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={step.title}
                style={{
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:block"
                    style={{
                      position: "absolute",
                      top: "32px",
                      right: "-20px",
                      width: "40px",
                      height: "2px",
                      background: "var(--color-gray-200)",
                    }}
                  />
                )}

                {/* Icon Circle */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(45, 90, 61, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <StepIcon icon={step.icon} />
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "18px",
                    marginBottom: "8px",
                    marginTop: 0,
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-slate)",
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
        style={{
          textAlign: "center",
          padding: "70px 40px",
        }}
      >
        <h2
          className="section-title"
          style={{ marginBottom: "16px" }}
        >
          Need help choosing the right gear?
        </h2>
        <p
          className="section-text"
          style={{ margin: "0 auto 40px", textAlign: "center" }}
        >
          Tell me about your adventure and I{"'"}ll recommend the best equipment for the terrain.
        </p>
        <Link href="/contact" className="btn-gradient" style={{ color: "white" }}>
          Get in Touch
        </Link>
      </section>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .rentals-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}
