interface StatsDashboardProps {
  distance: string;
  elevation: string;
  duration: string;
  difficulty: string;
  difficultyLevel: number; // 1-5
  route?: string;       // Optional secondary stat
  bestSeason?: string;  // Optional secondary stat
  gear?: string;        // Optional secondary stat
}

// SVG Icons
const DistanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ElevationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
  </svg>
);

const DurationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const DifficultyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 11 8 12 1-1 8-6.6 8-12a8 8 0 0 0-8-8z"/>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h3"/>
  </svg>
);

export default function StatsDashboard({
  distance,
  elevation,
  duration,
  difficulty,
  difficultyLevel,
  route,
  bestSeason,
  gear,
}: StatsDashboardProps) {
  const isHard = difficultyLevel >= 4;

  return (
    <div className="bg-white rounded-2xl shadow-lg -mt-20 relative z-10 max-w-[900px] mx-auto overflow-hidden">
      {/* Primary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--color-gray-100)]">
        <div className="p-5 md:p-7 text-center border-r border-b md:border-b-0 border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DistanceIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{distance}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase" style={{ letterSpacing: '1px' }}>Distance</div>
        </div>

        <div className="p-5 md:p-7 text-center border-b md:border-b-0 md:border-r border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <ElevationIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{elevation}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase" style={{ letterSpacing: '1px' }}>Elevation Gain</div>
        </div>

        <div className="p-5 md:p-7 text-center border-r border-[var(--color-gray-100)]">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DurationIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{duration}</div>
          <div className="text-xs text-[var(--color-slate)] uppercase" style={{ letterSpacing: '1px' }}>Duration</div>
        </div>

        <div className="p-5 md:p-7 text-center">
          <div className="w-12 h-12 rounded-xl bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center mx-auto mb-3 transition-colors hover:bg-[rgba(45,90,61,0.15)]">
            <DifficultyIcon />
          </div>
          <div className="font-[family-name:var(--font-heading)] text-[28px] font-medium text-[var(--color-charcoal)] mb-1">{difficulty}</div>
          <div className="mt-2">
            <div className="flex gap-[3px] justify-center mb-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-4 h-1.5 rounded-sm ${
                    level <= difficultyLevel
                      ? isHard ? "bg-red-600" : "bg-[var(--color-amber)]"
                      : "bg-[var(--color-gray-200)]"
                  }`}
                />
              ))}
            </div>
            <div className="text-[11px] text-[var(--color-slate)]">{difficultyLevel} out of 5</div>
          </div>
        </div>
      </div>

      {/* Secondary Stats - only show if at least one is provided */}
      {(route || bestSeason || gear) && (
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4 bg-[var(--color-gray-50)]">
          {route && (
            <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                <RouteIcon />
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-[0.5px] mb-0.5">Route</div>
                <div className="text-sm font-medium text-[var(--color-charcoal)]">{route}</div>
              </div>
            </div>
          )}

          {bestSeason && (
            <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                <CalendarIcon />
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-[0.5px] mb-0.5">Best Season</div>
                <div className="text-sm font-medium text-[var(--color-charcoal)]">{bestSeason}</div>
              </div>
            </div>
          )}

          {gear && (
            <div className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-[rgba(45,90,61,0.05)]">
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(45,90,61,0.08)] text-[var(--color-forest)] flex items-center justify-center flex-shrink-0">
                <GearIcon />
              </div>
              <div>
                <div className="text-[11px] text-[var(--color-slate)] uppercase tracking-[0.5px] mb-0.5">Gear</div>
                <div className="text-sm font-medium text-[var(--color-charcoal)]">{gear}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
