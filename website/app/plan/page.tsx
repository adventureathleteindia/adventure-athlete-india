"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

const activities = [
  { label: "Cycling / MTB", value: "cycling" },
  { label: "Running / Trail", value: "running" },
  { label: "Hiking / Trekking", value: "hiking" },
  { label: "Nature Walk", value: "nature" },
  { label: "Something else", value: "other" },
];

const difficulties = [
  { value: "very-easy", title: "Very Easy", desc: "2+ hrs, minimal climb" },
  { value: "easy", title: "Easy", desc: "Half day, gentle" },
  { value: "moderate", title: "Moderate", desc: "Full day, some challenge" },
  { value: "advanced", title: "Advanced", desc: "5+ hrs, high intensity" },
];

const referralSources = [
  { value: "", label: "Select one..." },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "strava", label: "Strava" },
  { value: "friend", label: "Friend / Word of mouth" },
  { value: "google", label: "Google search" },
  { value: "other", label: "Other" },
];

export default function PlanPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleActivity = (value: string) => {
    setSelectedActivities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div className="page-header compact text-center">
        <div className="container">
          <span className="section-label">Plan Your Adventure</span>
          <h1 className="section-title">Let&apos;s Create Something Special</h1>
          <p className="section-text mx-auto text-center">
            Not sure where to start? Share your vibe — I&apos;ll craft an experience just for you.
          </p>
        </div>
      </div>

      {/* Form - per prototype: padding-top: 40px, padding-bottom: 70px (default section padding), container centered with max-width 768px */}
      <section style={{ paddingTop: '40px', paddingBottom: '70px' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }} className="md:px-10">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>Inquiry Sent!</div>
              <p style={{ color: 'var(--color-slate)', marginBottom: '8px' }}>Thanks for reaching out.</p>
              <p style={{ color: 'var(--color-slate)', marginBottom: '24px' }}>I&apos;ll get back to you within 24-48 hours with ideas.</p>
              <button
                onClick={() => { setSubmitted(false); setSelectedActivities([]); setSelectedDifficulty(""); }}
                className="btn btn-primary"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
          <form onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            const form = e.currentTarget;
            const fd = new FormData(form);
            try {
              const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: fd.get("name"),
                  email: fd.get("email"),
                  phone: fd.get("phone"),
                  nationality: fd.get("nationality") as string,
                  source_form: "plan",
                  activities: selectedActivities,
                  difficulty: selectedDifficulty,
                  people: fd.get("people"),
                  dates: fd.get("dates"),
                  description: fd.get("description"),
                  referral: fd.get("referral"),
                }),
              });
              if (!res.ok) throw new Error("Failed");
              setSubmitted(true);
              form.reset();
            } catch {
              setError("Something went wrong. Please try again or contact via WhatsApp.");
            } finally {
              setLoading(false);
            }
          }}>
            {error && (
              <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px', marginBottom: '16px' }}>
                {error}
              </div>
            )}
            {/* About You Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                About You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input type="text" name="name" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Nationality <span className="text-red-600">*</span>
                  </label>
                  <input type="text" name="nationality" className="form-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input type="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    WhatsApp / Phone <span className="text-red-600">*</span>
                  </label>
                  <input type="tel" name="phone" className="form-input" required />
                </div>
              </div>
            </div>

            {/* Your Adventure Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                Your Adventure
              </h2>

              {/* Activities - per prototype: grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px */}
              <div className="form-group">
                <label className="form-label">
                  What interests you? <span className="text-red-600">*</span>
                </label>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                  {activities.map((activity) => (
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

              {/* Difficulty - per prototype: grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; selected state only changes text color */}
              <div className="form-group">
                <label className="form-label">
                  Preferred difficulty <span className="text-red-600">*</span>
                </label>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
                  {difficulties.map((diff) => (
                    <label
                      key={diff.value}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDifficulty === diff.value
                          ? "border-[var(--color-forest)] bg-[var(--color-gray-50)]"
                          : "border-[var(--color-gray-200)] hover:border-[var(--color-forest)]"
                      }`}
                      onClick={() => setSelectedDifficulty(diff.value)}
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff.value}
                        checked={selectedDifficulty === diff.value}
                        onChange={() => setSelectedDifficulty(diff.value)}
                        className="hidden"
                      />
                      {/* Per prototype: only text color changes on selection, no background change */}
                      <div className={selectedDifficulty === diff.value ? "text-[var(--color-forest)]" : ""}>
                        <div className="font-semibold mb-1">{diff.title}</div>
                        <div className="text-[13px] text-[var(--color-slate)] whitespace-nowrap">{diff.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* People & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">
                    Number of people <span className="text-red-600">*</span>
                  </label>
                  <input type="number" name="people" className="form-input" min="1" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred dates</label>
                  <input type="text" name="dates" className="form-input" placeholder="e.g., March 15-20, 2026" />
                </div>
              </div>
            </div>

            {/* Tell Me More Section */}
            <div className="mb-8 pb-8 border-b border-[var(--color-gray-200)]">
              <h2 className="font-[family-name:var(--font-heading)] text-xl mb-6 pb-3 border-b-2 border-[var(--color-amber)] inline-block">
                Tell Me More
              </h2>

              <div className="form-group">
                <label className="form-label">
                  What&apos;s your ideal adventure? <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows={5}
                  placeholder="Share your fitness level, what you're hoping for, any concerns..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">How did you hear about me?</label>
                <select name="referral" className="form-select">
                  {referralSources.map((source) => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consent */}
            <div className="form-group mb-8">
              <label className="form-check">
                <input type="checkbox" required />
                <span className="text-sm text-[var(--color-slate)]">
                  I agree to share my information with Adventure Athlete India for the purpose of planning my adventure.
                  View our{" "}
                  <Link href="/privacy" className="text-[var(--color-amber)] underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-[18px]" style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "Sending..." : "Send Inquiry"}
            </button>

            <p className="text-center text-[var(--color-slate)] text-sm mt-4">
              I&apos;ll get back to you within 24-48 hours.
            </p>
          </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
