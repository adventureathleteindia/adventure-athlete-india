import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

export default function PrivacyPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header - per prototype */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Last updated: January 2026</p>
        </div>
      </div>

      {/* Content - per prototype: container max-w-3xl */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          <div className="legal-content">
            <h2>What I Collect</h2>
            <ul>
              <li>Name, email, phone number</li>
              <li>Nationality, emergency contact</li>
              <li>ID proof (for permits and safety)</li>
              <li>Health information (allergies, conditions)</li>
              <li>Payment confirmation</li>
            </ul>

            <h2>Why I Collect It</h2>
            <ul>
              <li>To communicate about your booking</li>
              <li>For safety and emergency purposes</li>
              <li>For permit requirements (where applicable)</li>
              <li>To improve my services</li>
            </ul>

            <h2>How It&apos;s Stored</h2>
            <ul>
              <li>Data stored securely in Google Sheets/Drive</li>
              <li>Access limited to me (Atul Chauhan) only</li>
              <li>Not shared with any third parties</li>
            </ul>

            <h2>Data Retention</h2>
            <ul>
              <li>Data can be deleted upon request after tour completion</li>
              <li>I may retain basic records for my reference</li>
            </ul>

            <h2>Your Rights</h2>
            <ul>
              <li>Request to see your data</li>
              <li>Request correction of incorrect data</li>
              <li>Request deletion of your data</li>
            </ul>

            <h2>Photos &amp; Videos</h2>
            <ul>
              <li>I may take photos/videos during tours</li>
              <li>Used only with your permission</li>
              <li>You can opt out at any time</li>
            </ul>

            <h2>Contact</h2>
            <p>For any privacy concerns:</p>
            <ul>
              <li>Email: adventureathleteindia@gmail.com</li>
              <li>WhatsApp: +91-9459033240</li>
            </ul>

            {/* Per prototype CTA box */}
            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-gray-100)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-slate-dark)', fontSize: '16px', marginBottom: 0 }}>
                Your privacy matters. If you have any concerns, please{" "}
                <Link href="/contact" style={{ color: 'var(--color-amber)' }}>reach out</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
