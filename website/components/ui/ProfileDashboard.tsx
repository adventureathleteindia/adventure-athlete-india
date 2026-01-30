interface PrimaryStat {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SecondaryStat {
  label: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
}

interface ProfileDashboardProps {
  primaryStats: PrimaryStat[];
  secondaryStats: SecondaryStat[];
}

// Default icons
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const defaultPrimaryIcons = [ShieldIcon, BoltIcon, ArrowUpIcon, ListIcon];
const defaultSecondaryIcons = [CalendarIcon, CalendarIcon, CalendarIcon, CalendarIcon];

export default function ProfileDashboard({ primaryStats, secondaryStats }: ProfileDashboardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-[1000px] mx-auto overflow-hidden mt-[60px]">
      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--color-gray-100)]">
        {primaryStats.map((stat, index) => {
          const Icon = defaultPrimaryIcons[index % defaultPrimaryIcons.length];
          return (
            <div
              key={stat.label}
              className={`p-5 md:p-7 text-center transition-colors hover:bg-[var(--color-gray-50)] ${
                index < primaryStats.length - 1 ? "border-r border-[var(--color-gray-100)]" : ""
              } ${index < 2 ? "border-b md:border-b-0 border-[var(--color-gray-100)]" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors group-hover:bg-[rgba(45,90,61,0.15)]">
                {stat.icon || <Icon />}
              </div>
              <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-slate)] uppercase" style={{ letterSpacing: '1px' }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-5 gap-4 bg-[var(--color-gray-50)]">
        {secondaryStats.map((stat, index) => {
          const Icon = defaultSecondaryIcons[index % defaultSecondaryIcons.length];
          return (
            <div
              key={stat.label}
              className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                {stat.icon || <Icon />}
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-slate)] uppercase mb-0.5" style={{ letterSpacing: '0.5px' }}>
                  {stat.label}
                </div>
                <div className="text-sm font-medium text-[var(--color-charcoal)] leading-snug">
                  {stat.value.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                  {stat.subtext && (
                    <small className="block font-normal text-[var(--color-slate)] text-xs">
                      {stat.subtext}
                    </small>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
