import { Navigation, Footer } from "@/components/layout";

export default function CancellationPage() {
  return (
    <>
      <Navigation variant="solid" />

      {/* Page Header - per prototype */}
      <div className="page-header">
        <div className="container">
          <span className="section-label">Policy</span>
          <h1 className="section-title">Cancellation Policy</h1>
          <p className="section-text">This is a passion project. I&apos;m flexible and understanding.</p>
        </div>
      </div>

      {/* Content - per prototype: container max-w-3xl */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px' }}>
          <div className="legal-content">
            <h2>If You Need to Cancel</h2>

            <p><strong>Informed in Advance</strong></p>
            <ul>
              <li>Full refund, no questions asked</li>
              <li>Or reschedule to another date</li>
            </ul>

            <p><strong>Last-Minute Emergency</strong></p>
            <ul>
              <li>Let&apos;s talk - we&apos;ll figure it out</li>
              <li>Life happens, I understand</li>
            </ul>

            <p><strong>My Only Request</strong></p>
            <ul>
              <li>Please don&apos;t cancel without informing</li>
              <li>I block my calendar and may turn down other bookings</li>
              <li>A simple message is all I ask</li>
            </ul>

            <h2>If I Need to Cancel</h2>

            <p><strong>Weather/Safety Issues</strong></p>
            <ul>
              <li>Full refund OR reschedule - your choice</li>
              <li>I&apos;ll inform you as early as possible</li>
            </ul>

            <p><strong>Personal Emergency</strong></p>
            <ul>
              <li>Full refund</li>
              <li>I&apos;ll help reschedule if you wish</li>
            </ul>

            <h2>Rescheduling</h2>
            <ul>
              <li>Happy to move your booking to another date</li>
              <li>Subject to my availability</li>
              <li>No extra charges for rescheduling</li>
            </ul>

            <h2>Refund Process</h2>
            <ul>
              <li>Refunds processed within 3-5 days</li>
              <li>Refunded to original payment method</li>
              <li>For cash payments, refund via UPI/Bank transfer</li>
            </ul>

            <h2>Contact for Cancellations</h2>
            <ul>
              <li>WhatsApp: +91-9459033240</li>
              <li>Email: adventureathleteindia@gmail.com</li>
            </ul>

            {/* Per prototype CTA box */}
            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-gray-100)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-slate-dark)', fontSize: '16px', marginBottom: 0 }}>
                I believe in fair dealings. If you have genuine reasons, I&apos;ll always work with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
