import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: "default" | "gray";
}

export default function CTASection({
  // Per prototype: exact text from 01-home.html CTA section
  title = "Not sure where to start?",
  subtitle = "Share your vibe — fitness level, interests, dates. I'll craft an experience just for you.",
  buttonText = "Let's Plan Together",
  buttonHref = "/plan",
  variant = "gray",
}: CTASectionProps) {
  return (
    <section
      className={`cta-section py-12 px-6 md:py-[70px] md:px-10 text-center ${
        variant === "gray" ? "bg-[var(--color-gray-50)]" : ""
      }`}
    >
      <h2 className="section-title mb-4">{title}</h2>
      <p className="section-text mx-auto text-center mb-10">{subtitle}</p>
      <Link href={buttonHref} className="btn-gradient">
        {buttonText}
      </Link>
    </section>
  );
}
