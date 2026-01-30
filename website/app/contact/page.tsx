"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

// Social icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169"/>
  </svg>
);

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/adventureathlete.in", icon: InstagramIcon, hoverBg: "#E4405F" },
  { name: "Facebook", href: "https://facebook.com/adventureathleteindia", icon: FacebookIcon, hoverBg: "#1877F2" },
  { name: "YouTube", href: "https://youtube.com/@adventureathleteindia", icon: YouTubeIcon, hoverBg: "#FF0000" },
  { name: "Strava", href: "https://strava.com/athletes/atulchauhan", icon: StravaIcon, hoverBg: "#FC4C02" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          source_form: "contact",
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please try WhatsApp or email instead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Contact</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-text">Have questions? Want to discuss a custom adventure? I&apos;d love to hear from you.</p>
        </div>
      </div>

      {/* Contact Content - per prototype: container max-w-4xl */}
      <section>
        <div style={{ maxWidth: '896px', margin: '0 auto', padding: '0 24px' }}>
          {/* Two column layout - per prototype: gap: 60px; align-items: start */}
          <div className="two-col" style={{ gap: '60px', alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <div className="contact-info">
                <div>
                  <div className="contact-item-label">WhatsApp</div>
                  <div className="contact-item-value">
                    <a href="https://wa.me/919459033240">+91-9459033240</a>
                  </div>
                </div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value" style={{ fontSize: '16px' }}>
                    <a href="mailto:adventureathleteindia@gmail.com">adventureathleteindia@gmail.com</a>
                  </div>
                </div>
                <div>
                  <div className="contact-item-label">Based In</div>
                  <div style={{ fontSize: '18px' }}>Shimla, Himachal Pradesh, India</div>
                </div>
              </div>

              {/* Follow Along - per prototype: margin-top: 48px; padding-top: 32px */}
              <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--color-gray-200)' }}>
                <div className="contact-item-label" style={{ marginBottom: '16px' }}>Follow Along</div>
                {/* Per prototype: .follow-social-grid { display: flex; gap: 24px; } */}
                <div style={{ display: 'flex', gap: '24px' }}>
                  {socialLinks.map((social) => (
                    <div key={social.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--color-slate)' }}>{social.name}</span>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-all hover:scale-110"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'var(--color-gray-100)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-slate)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = social.hoverBg;
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-gray-100)';
                          e.currentTarget.style.color = 'var(--color-slate)';
                        }}
                      >
                        <social.icon />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Form - per prototype: background: var(--gray-50); padding: 32px; border-radius: 12px */}
            <div style={{ background: 'var(--color-gray-50)', padding: '32px', borderRadius: '12px' }}>
              {/* Per prototype: font-size: 20px; margin-bottom: 24px */}
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '24px' }}>Quick Message</h2>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>Sent!</div>
                  <p style={{ color: 'var(--color-slate)', marginBottom: '16px' }}>I&apos;ll get back to you within 24-48 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn"
                    style={{ background: 'var(--color-forest)', color: 'white' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px', marginBottom: '16px' }}>
                    {error}
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-textarea" rows={4} required></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn"
                  style={{ width: '100%', background: loading ? '#9CA3AF' : 'linear-gradient(90deg, #F59E0B 0%, #B45309 100%)', color: 'white', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
              )}
              {/* Per prototype: font-size: 13px; color: var(--slate); margin-top: 16px; text-align: center; white-space: nowrap */}
              <p style={{ fontSize: '13px', color: 'var(--color-slate)', marginTop: '16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                For detailed tour inquiries, use the{" "}
                <Link href="/plan" style={{ color: 'var(--color-amber)', textDecoration: 'underline' }}>
                  Plan Your Adventure
                </Link>{" "}
                form.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
