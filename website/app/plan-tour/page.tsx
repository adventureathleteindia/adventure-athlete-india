"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

const programs = [
  { value: "", label: "Select a program..." },
  { value: "shimla-dharamshala", label: "Shimla to Dharamshala Bike Tour" },
  { value: "manali-leh", label: "Manali to Leh High Altitude Ride" },
  { value: "village-base-camp", label: "Village Base Camp" },
  { value: "wellness-retreat", label: "Wellness Retreat" },
  { value: "train-with-pro", label: "Train with a Pro" },
  { value: "custom", label: "Custom / Not Sure" },
];

const activityOptions = [
  { value: "cycling", label: "Cycling / MTB" },
  { value: "trail-running", label: "Trail Running" },
  { value: "hiking", label: "Hiking" },
  { value: "yoga-wellness", label: "Yoga / Wellness" },
  { value: "mix", label: "Mix of Activities" },
];

const experienceLevels = [
  { value: "beginner", title: "Beginner", desc: "New to this, excited to learn" },
  { value: "intermediate", title: "Intermediate", desc: "Some experience, ready for more" },
  { value: "advanced", title: "Advanced", desc: "Experienced and fit" },
  { value: "pro", title: "Pro", desc: "Competitive athlete level" },
];

const flexibilityOptions = [
  { value: "fixed", label: "Fixed dates" },
  { value: "flexible-week", label: "Flexible within a week" },
  { value: "completely-flexible", label: "Completely flexible" },
];

const durationOptions = [
  { value: "", label: "Select duration..." },
  { value: "3-days", label: "3 days" },
  { value: "4-5-days", label: "4-5 days" },
  { value: "1-week", label: "1 week" },
  { value: "2-weeks", label: "2 weeks" },
  { value: "custom", label: "Custom" },
];

const budgetOptions = [
  { value: "", label: "Select budget..." },
  { value: "budget", label: "Budget-friendly" },
  { value: "mid-range", label: "Mid-range" },
  { value: "premium", label: "Premium" },
  { value: "not-sure", label: "Not sure yet" },
];

const accommodationOptions = [
  { value: "budget", title: "Budget", desc: "Hostels, homestays, camping" },
  { value: "comfortable", title: "Comfortable", desc: "Hotels, guesthouses" },
  { value: "premium", title: "Premium", desc: "Best available, private rooms" },
];

const pickupOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure yet" },
];

const referralSources = [
  { value: "", label: "Select one..." },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "google", label: "Google Search" },
  { value: "friend", label: "Friend / Referral" },
  { value: "hotel", label: "Hotel" },
  { value: "tripadvisor", label: "TripAdvisor" },
  { value: "other", label: "Other" },
];

export default function PlanTourPage() {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedFlexibility, setSelectedFlexibility] = useState("");
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [selectedPickup, setSelectedPickup] = useState("");

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div className="page-header compact" style={{ textAlign: 'center' }}>
        <div className="container">
          <span className="section-label">Tours &amp; Programs</span>
          <h1 className="section-title">Plan Your Tour</h1>
          <p className="section-text mx-auto text-center">
            Tell me about your dream adventure — I&apos;ll design it around you.
          </p>
        </div>
      </div>

      {/* Form */}
      <section style={{ paddingTop: '40px' }}>
        <div className="container" style={{ maxWidth: '768px' }}>
          <form>

            {/* Section 1: About You */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--color-amber)', display: 'inline-block' }}>
                About You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input type="text" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Email <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input type="email" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">
                    Phone / WhatsApp <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input type="tel" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Nationality <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input type="text" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Current City</label>
                  <input type="text" className="form-input" placeholder="Where are you based?" />
                </div>
              </div>
            </div>

            {/* Section 2: Program Interest */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--color-amber)', display: 'inline-block' }}>
                Program Interest
              </h2>

              {/* Program of Interest */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">
                  Program of Interest <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <select className="form-select" required>
                  {programs.map((program) => (
                    <option key={program.value} value={program.value}>
                      {program.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Activity Focus */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">
                  Activity Focus <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                  {activityOptions.map((activity) => (
                    <label key={activity.value} className="form-check">
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity.value)}
                        onChange={() => toggleActivity(activity.value)}
                      />
                      <span>{activity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="form-group">
                <label className="form-label">
                  Experience Level <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {experienceLevels.map((level) => (
                    <label
                      key={level.value}
                      style={{
                        padding: '16px',
                        border: `1px solid ${selectedLevel === level.value ? 'var(--color-forest)' : 'var(--color-gray-200)'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: selectedLevel === level.value ? 'var(--color-gray-50)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedLevel !== level.value) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedLevel !== level.value) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gray-200)';
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="experience-level"
                        value={level.value}
                        checked={selectedLevel === level.value}
                        onChange={() => setSelectedLevel(level.value)}
                        style={{ display: 'none' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{level.title}</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>{level.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Trip Details */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--color-amber)', display: 'inline-block' }}>
                Trip Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Preferred Travel Dates</label>
                  <input type="text" className="form-input" placeholder="e.g., March 15-22, 2026" />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Group Size <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input type="number" className="form-input" min={1} required placeholder="Number of people" />
                </div>
              </div>

              {/* Flexibility */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Flexibility</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  {flexibilityOptions.map((option) => (
                    <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="flexibility"
                        value={option.value}
                        checked={selectedFlexibility === option.value}
                        onChange={() => setSelectedFlexibility(option.value)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest)' }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <select className="form-select">
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select className="form-select">
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Logistics */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--color-gray-200)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--color-amber)', display: 'inline-block' }}>
                Logistics
              </h2>

              {/* Accommodation Preference */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Accommodation Preference</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {accommodationOptions.map((option) => (
                    <label
                      key={option.value}
                      style={{
                        padding: '16px',
                        border: `1px solid ${selectedAccommodation === option.value ? 'var(--color-forest)' : 'var(--color-gray-200)'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: selectedAccommodation === option.value ? 'var(--color-gray-50)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedAccommodation !== option.value) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-forest)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedAccommodation !== option.value) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gray-200)';
                        }
                      }}
                    >
                      <input
                        type="radio"
                        name="accommodation"
                        value={option.value}
                        checked={selectedAccommodation === option.value}
                        onChange={() => setSelectedAccommodation(option.value)}
                        style={{ display: 'none' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{option.title}</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-slate)' }}>{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pickup */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Need Airport/Station Pickup?</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  {pickupOptions.map((option) => (
                    <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="pickup"
                        value={option.value}
                        checked={selectedPickup === option.value}
                        onChange={() => setSelectedPickup(option.value)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-forest)' }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dietary Requirements */}
              <div className="form-group">
                <label className="form-label">Dietary Requirements</label>
                <input type="text" className="form-input" placeholder="e.g., Vegetarian, Vegan, Gluten-free..." />
              </div>

              {/* Special Requirements */}
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">Special Requirements / Medical Conditions</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Anything I should know — allergies, injuries, medical conditions..."
                ></textarea>
              </div>
            </div>

            {/* Section 5: Tell Me More */}
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: 'none' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--color-amber)', display: 'inline-block' }}>
                Tell Me More
              </h2>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">
                  What excites you most about this trip? <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  placeholder="Share your expectations, what you're hoping to experience, any specific interests..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">How did you hear about us?</label>
                <select className="form-select">
                  {referralSources.map((source) => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consent */}
            <div className="form-group" style={{ marginBottom: '32px' }}>
              <label className="form-check">
                <input type="checkbox" required />
                <span style={{ fontSize: '14px', color: 'var(--color-slate)' }}>
                  I agree to the{" "}
                  <Link href="/privacy" style={{ color: 'var(--color-amber)', textDecoration: 'underline' }}>
                    privacy policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" style={{ color: 'var(--color-amber)', textDecoration: 'underline' }}>
                    terms
                  </Link>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(90deg, #F59E0B 0%, #B45309 100%)',
                color: 'white',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Send Tour Inquiry
            </button>

            <p style={{ textAlign: 'center', color: 'var(--color-slate)', fontSize: '14px', marginTop: '16px' }}>
              I&apos;ll get back to you within 48 hours with a custom itinerary proposal.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
