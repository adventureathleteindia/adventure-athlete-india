import { Navigation, Footer } from "@/components/layout";

export default function SafetyPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header - per prototype */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Safety</span>
          <h1 className="section-title">Safety Policy</h1>
          <p className="section-text">Your safety is my priority.</p>
        </div>
      </div>

      {/* Content - per prototype: container max-w-3xl */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          <div className="legal-content">
            <h2>Before the Tour</h2>

            <p><strong>Fitness Requirements</strong></p>
            <ul>
              <li>Adventure tours require reasonable fitness</li>
              <li>Not recommended for:
                <ul style={{ marginTop: '8px' }}>
                  <li>Travelers with serious back problems</li>
                  <li>Pregnant travelers</li>
                  <li>Those with serious medical conditions</li>
                </ul>
              </li>
              <li>Be honest about your fitness level - I&apos;ll match the right experience for you</li>
            </ul>

            <p><strong>Health Documentation</strong></p>
            <ul>
              <li>Fitness certificate recommended for adventure tours</li>
              <li>Inform me of any medical conditions, allergies, or medications</li>
              <li>For altitude sickness: consult a pharmacy or travel doctor for preventive medication</li>
            </ul>

            <p><strong>Preparation</strong></p>
            <ul>
              <li>Arrive 1-3 days before for rest and acclimatization (especially for high-altitude adventures)</li>
              <li>Check weather forecast before the tour</li>
              <li>Carry recommended gear (checklist provided)</li>
            </ul>

            <h2>During the Tour</h2>

            <p><strong>My Commitment</strong></p>
            <ul>
              <li>I carry a basic first-aid kit</li>
              <li>I know the terrain and nearby medical facilities</li>
              <li>In case of injury or illness, I will do my best to provide immediate assistance and help you reach appropriate medical care</li>
              <li>However, I am not a medical professional and cannot be held responsible for medical outcomes</li>
              <li>Your pace, your comfort - no pressure</li>
            </ul>

            <p><strong>Your Responsibility</strong></p>
            <ul>
              <li>Follow my instructions for safety</li>
              <li>Inform me immediately if you feel unwell</li>
              <li>Stay hydrated and fueled</li>
              <li>Don&apos;t take unnecessary risks</li>
            </ul>

            <h2>Insurance</h2>
            <ul>
              <li>Tours are conducted without insurance coverage</li>
              <li>I strongly recommend personal travel/adventure insurance</li>
              <li>Ensure your insurance covers the specific activities</li>
            </ul>

            <h2>Weather &amp; Conditions</h2>
            <ul>
              <li>I monitor weather before and during tours</li>
              <li>If conditions are unsafe, I will cancel or modify</li>
              <li>Your safety comes before completing a route</li>
            </ul>

            <h2>Emergency Contact</h2>
            <p>Emergency contact details will be shared after booking confirmation.</p>

            {/* Per prototype CTA box */}
            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-gray-100)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-slate-dark)', fontSize: '16px', marginBottom: 0 }}>
                Safety is non-negotiable. If you have any health concerns, please discuss them with me before booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
