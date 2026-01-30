interface StravaEmbedProps {
  activityId?: string;
  title?: string;
}

export default function StravaEmbed({
  activityId,
  title = "Route Map & Elevation",
}: StravaEmbedProps) {
  return (
    <div className="strava-embed my-8">
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium mb-5 text-[var(--color-charcoal)]">
        {title}
      </h2>

      {/* Per prototype: .strava-embed has background: var(--gray-50); border-radius: 12px; padding: 24px */}
      <div className="bg-[var(--color-gray-50)] rounded-xl p-6">
        {activityId ? (
          <div className="relative w-full rounded-lg overflow-hidden border border-[var(--color-gray-200)]">
            <iframe
              title="Strava Activity"
              src={`https://www.strava.com/activities/${activityId}/embed/${activityId}`}
              width="100%"
              height="405"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        ) : (
          /* Placeholder - per prototype: background: white; border-radius: 8px; border: 2px dashed var(--gray-200) */
          <div className="strava-placeholder relative w-full h-[400px] bg-white rounded-lg flex flex-col items-center justify-center text-[var(--color-slate)]" style={{ border: '2px dashed var(--color-gray-200)' }}>
            {/* Per prototype: svg width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5 */}
            <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>

            <span>Strava Activity Embed</span>
            <span className="text-[13px] mt-1 text-[var(--color-slate-light)]">Map + Elevation Profile</span>
          </div>
        )}
      </div>
    </div>
  );
}
