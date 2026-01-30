import Link from "next/link";

// Social Icons as components
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="text-white py-10 px-6 md:py-[60px] md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #3a7a52 0%, #2D5A3D 40%, #1e3d29 100%)' }}>
      {/* Mountain Wave SVG */}
      <div className="absolute -top-[79px] left-0 right-0 z-[1]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-20 block"
        >
          <path
            fill="#2D5A3D"
            d="M0,120 L0,80 Q60,60 120,70 L200,50 L280,75 L320,45 L400,65 L480,35 L560,55 L640,25 L720,50 L800,20 L880,45 L960,15 L1040,40 L1120,10 L1200,35 L1280,5 L1360,30 L1440,0 L1440,120 Z"
          />
        </svg>
      </div>

      {/* Decorative dots pattern - hidden on mobile */}
      <div className="hidden md:block absolute top-[100px] right-10 opacity-[0.08]">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="120" height="120" fill="url(#dots)" />
        </svg>
      </div>

      {/* Decorative mountain icon - hidden on mobile, shown on desktop */}
      <div className="hidden md:block absolute bottom-20 left-10 opacity-[0.06]">
        <svg width="150" height="100" viewBox="0 0 150 100" fill="white">
          <path d="M75 10 L120 80 L100 80 L85 55 L70 80 L30 80 Z" />
          <path d="M40 30 L70 80 L10 80 Z" />
        </svg>
      </div>

      {/* Mountain silhouette art overlay - bottom layer 1 (::before equivalent) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] md:h-[300px] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%231A202C' fill-opacity='0.35' d='M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,181.3C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Mountain silhouette art overlay - bottom layer 2 (::after equivalent) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[80px] md:h-[200px] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%231A202C' fill-opacity='0.5' d='M0,288L60,272C120,256,240,224,360,213.3C480,203,600,213,720,229.3C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'%3E%3C/path%3E%3Cpath fill='%231A202C' fill-opacity='0.4' d='M0,256L80,261.3C160,267,320,277,480,272C640,267,800,245,960,234.7C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Content */}
      <div className="max-w-[var(--max-width-container)] mx-auto relative z-10">
        {/* Brand Column - full width on mobile, part of grid on desktop */}
        <div className="md:hidden mb-8 text-center">
          <div className="font-[family-name:var(--font-heading)] text-sm font-medium tracking-[var(--tracking-widest)] uppercase mb-3">
            Adventure Athlete India
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            Experience the raw Himalayas.
          </p>
          <p className="mt-4 text-sm opacity-80">
            Shimla, HP, India • +91-9459033240
          </p>
          {/* Social Icons */}
          <div className="flex gap-3 mt-4 justify-center">
            <a
              href="https://instagram.com/adventureathlete.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#E4405F]"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com/adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#1877F2]"
              title="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://youtube.com/@adventureathleteindia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FF0000]"
              title="YouTube"
            >
              <YouTubeIcon />
            </a>
            <a
              href="https://strava.com/athletes/atulchauhan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FC4C02]"
              title="Strava"
            >
              <StravaIcon />
            </a>
          </div>
        </div>

        {/* Link columns - 3 columns on mobile, 4 columns (with brand) on desktop */}
        <div className="grid grid-cols-3 gap-4 md:hidden text-center">
          {/* Explore Column */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[1px] uppercase opacity-50 mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/experiences" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/tours-programs" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Tours & Programs
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Equipment Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[1px] uppercase opacity-50 mb-3">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/why-aai" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[1px] uppercase opacity-50 mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-xs opacity-85 hover:opacity-100 transition-opacity">
                  Safety
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop layout - original 4 column grid */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-[60px]">
          {/* Brand Column */}
          <div>
            <div className="font-[family-name:var(--font-heading)] text-sm font-medium tracking-[var(--tracking-widest)] uppercase mb-4">
              Adventure Athlete India
            </div>
            <p className="text-sm opacity-80 mt-4 leading-relaxed">
              Experience the raw Himalayas.
            </p>
            <p className="mt-6 text-sm opacity-80">
              Shimla, HP, India
              <br />
              +91-9459033240
              <br />
              adventureathleteindia@gmail.com
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/adventureathlete.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#E4405F]"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com/adventureathleteindia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#1877F2]"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com/@adventureathleteindia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FF0000]"
                title="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://strava.com/athletes/atulchauhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white transition-colors hover:bg-[#FC4C02]"
                title="Strava"
              >
                <StravaIcon />
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase opacity-50 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/experiences" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/tours-programs" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Tours & Programs
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Equipment Rentals
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase opacity-50 mb-5">
              About
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/why-aai" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="text-xs font-semibold tracking-[2px] uppercase opacity-50 mb-5">
              Useful Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-sm opacity-85 hover:opacity-100 transition-opacity">
                  Cancellation
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - smaller margin on mobile */}
      <div className="max-w-[var(--max-width-container)] mx-auto mt-8 md:mt-[60px] pt-6 border-t border-white/15 flex flex-col md:flex-row justify-between items-center md:items-start gap-2 text-[13px] opacity-60 relative z-10 text-center md:text-left">
        {/* White mountain silhouette on border line - mobile only */}
        <div className="md:hidden absolute -top-[20px] left-[33%] -translate-x-1/2 opacity-30">
          <svg className="w-[50px] h-[35px]" viewBox="0 0 150 100" fill="white">
            <path d="M75 10 L120 80 L100 80 L85 55 L70 80 L30 80 Z" />
            <path d="M40 30 L70 80 L10 80 Z" />
          </svg>
        </div>
        <span>
          &copy; 2026 Adventure Athlete India <span className="text-[var(--color-amber)] mx-1.5">|</span> Atul Chauhan
        </span>
        <span>Licensed HP Tourism Guide (Reg: 080724 42383)</span>
      </div>
    </footer>
  );
}
