import Link from "next/link";
import Image from "next/image";

// Icons for value propositions
const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[22px] h-[22px]">
    <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-.553-.894L15 4m0 13V4m0 0L9 7"/>
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[22px] h-[22px]">
    <path d="M12 15l-2 5-1.5-3-3 1 1.5-3.5L4 13l3-1.5L5 8l3.5 1L10 5.5 12 9l2-3.5 1.5 3.5 3.5-1-2 3.5 3 1.5-3 1.5 1.5 3.5-3-1-1.5 3-2-5z"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[22px] h-[22px]">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[22px] h-[22px]">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const valueProps = [
  {
    icon: MapIcon,
    title: "Local Knowledge",
    description: "Trails that aren't on any map. I grew up here and spent years discovering them.",
  },
  {
    icon: StarIcon,
    title: "Athlete-Level Guidance",
    description: "5x Nationals competitor. I understand pacing, nutrition, altitude — not just directions.",
  },
  {
    icon: UsersIcon,
    title: "Personal Attention",
    description: "Just you and me. No groups, no strangers. Your pace, your adventure.",
  },
  {
    icon: ShieldIcon,
    title: "Licensed & Legit",
    description: "Official HP Tourism Guide. Proper permits, proper safety.",
  },
];

export default function WhyAAI() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-[#f0f4f0]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-[60px] items-center">
          {/* Image */}
          <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <Image
              src="https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&q=80"
              alt="Atul Chauhan in action"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="section-label">Why Adventure Athlete India</span>
            <h2 className="section-title mt-2">
              Not a tour company.<br />An athlete who guides.
            </h2>

            {/* Value propositions */}
            <div className="mt-8 space-y-5">
              {valueProps.map((prop) => (
                <div key={prop.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-forest)] to-[#1e3d29] flex items-center justify-center flex-shrink-0 shadow-md text-white">
                    <prop.icon />
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-heading)] text-base mb-1 text-[var(--color-charcoal)]">
                      {prop.title}
                    </h4>
                    <p className="text-sm text-[var(--color-slate)] leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/plan" className="btn-gradient mt-8">
              Let&apos;s Plan Together
            </Link>

            {/* Testimonials placeholder */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="italic text-sm text-[var(--color-slate)]">
                Client testimonials coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
