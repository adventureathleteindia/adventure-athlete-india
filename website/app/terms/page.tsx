import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";

export default function TermsPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header - per prototype */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1 className="section-title">Terms &amp; Conditions</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-slate)' }}>Last updated: January 2026</p>
        </div>
      </div>

      {/* Content - per prototype: container max-w-3xl */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          <div className="legal-content">
            {/* Per prototype: font-size: 18px; font-weight: 500; margin-bottom: 32px */}
            <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '32px' }}>
              By booking a tour, you agree to the following:
            </p>

            <h2>About the Service</h2>
            <ul>
              <li>Tours are conducted personally by Atul Chauhan</li>
              <li>This is a personal guiding service, not a tour company</li>
              <li>Licensed HP Tourism Guide (Reg: 080724 42383)</li>
            </ul>

            <h2>What&apos;s Included</h2>
            <ul>
              <li>Fees cover guiding service only</li>
              <li>Third-party costs (food, transport, rentals, permits) are extra</li>
              <li>Payment options for extras:
                <ul style={{ marginTop: '8px' }}>
                  <li>Pay directly to providers during the tour, OR</li>
                  <li>I maintain a record and you settle with me at the end</li>
                </ul>
              </li>
              <li>Equipment damage costs are the client&apos;s responsibility</li>
            </ul>

            <h2>Itinerary</h2>
            <ul>
              <li>Routes may change due to weather, road conditions, or safety concerns</li>
              <li>Flexibility and cooperation appreciated in such cases</li>
              <li>Alternative solutions will be offered</li>
            </ul>

            <h2>Booking &amp; Payment</h2>
            <ul>
              <li>Booking confirmed only after payment received</li>
              <li>50% advance to confirm, 50% before tour starts</li>
              <li>Payment via UPI, Bank Transfer, or Cash</li>
            </ul>

            <h2>Private Tours</h2>
            <ul>
              <li>All tours are private (your group only)</li>
              <li>Group tours only if you agree to share</li>
            </ul>

            <h2>Your Responsibilities</h2>
            <ul>
              <li>Provide accurate health and fitness information</li>
              <li>Follow safety instructions during the tour</li>
              <li>Carry valid ID proof</li>
              <li>Respect the environment - carry your trash</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <ul>
              <li>I am not liable for injuries, accidents, or losses</li>
              <li>In case of injury or illness, I will do my best to provide immediate assistance and help you reach appropriate medical care</li>
              <li>However, I am not a medical professional and cannot be held responsible for medical outcomes</li>
              <li>Personal insurance covering adventure activities is recommended</li>
            </ul>

            {/* Per prototype: margin-top: 48px; padding: 24px; background: var(--gray-100); border-radius: 8px; text-align: center */}
            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-gray-100)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-slate-dark)', fontSize: '16px', marginBottom: 0 }}>
                Questions about these terms?{" "}
                <Link href="/contact" style={{ color: 'var(--color-amber)' }}>Contact me</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
