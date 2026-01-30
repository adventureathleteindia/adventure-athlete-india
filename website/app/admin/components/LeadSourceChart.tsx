"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#2D5A3D", "#D97706", "#3B82F6", "#22C55E", "#EAB308", "#F97316", "#8B5CF6", "#9CA3AF"];

interface LeadSourceChartProps {
  data: { name: string; value: number }[];
}

export default function LeadSourceChart({ data }: LeadSourceChartProps) {
  if (data.length === 0) {
    return (
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid #E5E7EB",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "14px",
      }}>
        <p style={{ marginBottom: "8px", fontWeight: 500, color: "#374151" }}>Lead Sources</p>
        <p>No leads yet. They&apos;ll show up here once forms start coming in.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "24px",
      border: "1px solid #E5E7EB",
    }}>
      <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "16px" }}>
        Lead Sources This Month
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
