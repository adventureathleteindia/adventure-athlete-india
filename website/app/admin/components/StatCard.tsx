interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  alert?: boolean;
}

export default function StatCard({ title, value, subtitle, color = "#2D5A3D", alert = false }: StatCardProps) {
  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      border: alert ? "1px solid #FECACA" : "1px solid #E5E7EB",
    }}>
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>{title}</p>
      <p style={{
        fontSize: "36px",
        fontFamily: "var(--font-heading)",
        fontWeight: 400,
        color: alert ? "#DC2626" : color,
        lineHeight: 1,
      }}>
        {value}
      </p>
      {subtitle && (
        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>{subtitle}</p>
      )}
    </div>
  );
}
