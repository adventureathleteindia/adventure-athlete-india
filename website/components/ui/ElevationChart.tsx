"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { elevationProfiles } from "@/lib/elevation-data";

interface ElevationChartProps {
  slug: string;
  title?: string;
}

export default function ElevationChart({
  slug,
  title = "Elevation Profile",
}: ElevationChartProps) {
  const profile = elevationProfiles[slug];

  if (!profile) return null;

  return (
    <div style={{ margin: '32px 0' }}>
      <h2
        className="font-[family-name:var(--font-heading)]"
        style={{ fontSize: '24px', fontWeight: 500, marginBottom: '20px', color: 'var(--color-charcoal)' }}
      >
        {title}
      </h2>

      <div style={{ background: 'var(--color-gray-50)', borderRadius: '12px', overflow: 'hidden' }}>
        {/* Chart */}
        <div style={{ padding: '24px 16px 8px 0' }}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={profile.data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="elevationFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D5A3D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2D5A3D" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="distance"
                tickFormatter={(v) => `${Number(v).toFixed(1)}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                interval="preserveStartEnd"
                tickCount={8}
                label={{ value: 'Distance (km)', position: 'insideBottom', offset: -2, fontSize: 12, fill: '#64748b' }}
              />
              <YAxis
                domain={['dataMin - 50', 'dataMax + 50']}
                tickFormatter={(v) => `${v}m`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={55}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{
                      background: '#1A202C',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}>
                      <div>Distance: {d.distance.toFixed(2)} km</div>
                      <div>Elevation: {d.elevation.toFixed(0)}m</div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="elevation"
                stroke="#2D5A3D"
                strokeWidth={2}
                fill="url(#elevationFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '16px',
          borderTop: '1px solid var(--color-gray-200)',
          background: 'white',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div className="font-[family-name:var(--font-heading)]" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-forest)' }}>
              {profile.stats.min}m
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--color-slate)' }}>
              Min Elevation
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-[family-name:var(--font-heading)]" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-forest)' }}>
              {profile.stats.max}m
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--color-slate)' }}>
              Max Elevation
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-[family-name:var(--font-heading)]" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-forest)' }}>
              {profile.stats.gain}m
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--color-slate)' }}>
              Total Gain
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="font-[family-name:var(--font-heading)]" style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-forest)' }}>
              {profile.stats.totalDistance} km
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' as const, color: 'var(--color-slate)' }}>
              Distance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
