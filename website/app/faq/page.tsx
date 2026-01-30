"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

// FAQ data organized by categories - per prototype
const faqCategories = [
  {
    title: "Booking",
    faqs: [
      { question: "How do I book a tour?", answer: "Fill the \"Plan Your Adventure\" form. I'll reach out within 24-48 hours to discuss and customize your experience." },
      { question: "How far in advance should I book?", answer: "At least 3-5 days for day trips. 1-2 weeks for multi-day adventures." },
      { question: "Is this a private tour?", answer: "Yes, all tours are private - just you/your group and me. No strangers." },
    ],
  },
  {
    title: "Payment",
    faqs: [
      { question: "What payment methods do you accept?", answer: "UPI, Bank Transfer, or Cash. 50% advance to confirm, 50% before tour." },
      { question: "What's included in the price?", answer: "Guide fee only. Extras (transport, bike rental, food) depend on your choices. You can pay providers directly, or I maintain a record and you settle with me at the end." },
    ],
  },
  {
    title: "Cancellation",
    faqs: [
      { question: "What's the cancellation policy?", answer: "Inform me in advance = full refund. Flexible for genuine cases. Just don't ghost!" },
      { question: "What if weather is bad?", answer: "If I cancel due to weather, you get full refund or reschedule option." },
    ],
  },
  {
    title: "Safety",
    faqs: [
      { question: "Do you provide insurance?", answer: "No. I recommend carrying personal insurance that covers adventure activities." },
      { question: "What if I get injured?", answer: "I will provide immediate assistance and help you reach appropriate medical care." },
      { question: "Do I need to be very fit?", answer: "Depends on the activity. I'll recommend appropriate difficulty based on your fitness." },
    ],
  },
  {
    title: "Gear",
    faqs: [
      { question: "Do I need my own bike/gear?", answer: "Your choice: bring your own or rent locally. I'll send a gear checklist and can sort out rentals for you if needed." },
      { question: "What should I bring?", answer: "Varies by tour. I'll send a checklist after booking." },
    ],
  },
  {
    title: "Experience",
    faqs: [
      { question: "Can beginners join?", answer: "Yes! I have easy nature walks to expert MTB trails. We'll match your level." },
      { question: "Can family members come as support?", answer: "Yes, with prior arrangement and minimal/no extra fee." },
    ],
  },
  {
    title: "Logistics",
    faqs: [
      { question: "Where do tours start?", answer: "Usually Shimla area, sometimes nearby towns. Exact GPS location shared before tour. Pickup can be arranged." },
      { question: "Should I arrive early?", answer: "Recommended 1-3 days before for rest and acclimatization, especially for high-altitude adventures." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header - per prototype */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">FAQ</span>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-text">Everything you need to know before your adventure.</p>
        </div>
      </div>

      {/* FAQ Content - per prototype: container max-w-3xl */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Per prototype: faq-category-title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'var(--color-amber)',
                  marginBottom: '16px',
                  marginTop: categoryIndex === 0 ? 0 : '48px',
                }}
              >
                {category.title}
              </h3>

              {/* FAQ Accordion */}
              <div style={{ borderRadius: '8px', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={faqIndex}
                      style={{ borderBottom: faqIndex < category.faqs.length - 1 ? '1px solid var(--color-gray-200)' : 'none' }}
                    >
                      {/* Per prototype: faq-accordion-header */}
                      <div
                        onClick={() => toggleItem(categoryIndex, faqIndex)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px 24px',
                          background: 'white',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-gray-50)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                      >
                        <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-charcoal)', margin: 0 }}>
                          {faq.question}
                        </span>
                        <span
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-slate)',
                            transition: 'transform 0.3s',
                            flexShrink: 0,
                            marginLeft: '16px',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </div>

                      {/* Per prototype: faq-accordion-content */}
                      <div
                        style={{
                          maxHeight: isOpen ? '500px' : '0',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease-out',
                        }}
                      >
                        <p
                          style={{
                            padding: '0 24px 20px',
                            fontSize: '15px',
                            lineHeight: 1.7,
                            color: 'var(--color-slate-dark)',
                            margin: 0,
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions? - per prototype exact styles */}
          <div
            style={{
              marginTop: '60px',
              padding: '40px',
              background: 'var(--color-gray-100)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                marginBottom: '16px',
                marginTop: 0,
              }}
            >
              Still have questions?
            </h3>
            <p
              style={{
                color: 'var(--color-slate-dark)',
                marginBottom: '24px',
                marginTop: 0,
              }}
            >
              I'm happy to chat and answer anything else.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#D97706',
                color: 'white',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
