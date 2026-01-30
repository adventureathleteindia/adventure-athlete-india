import { createClient } from "@/lib/supabase/server";
import StatCard from "./components/StatCard";
import LeadSourceChart from "./components/LeadSourceChart";
import { LEAD_STATUS_CONFIG } from "@/lib/types/admin";
import type { Lead } from "@/lib/types/admin";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: leads } = await supabase.from("leads").select("*");
  const allLeads = (leads || []) as Lead[];

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const newLeads = allLeads.filter(l => l.status === "new").length;
  const inDiscussion = allLeads.filter(l => l.status === "in_discussion").length;
  const bookedThisMonth = allLeads.filter(
    l => l.status === "booked" && new Date(l.created_at) >= thisMonthStart
  ).length;
  const overdueFollowups = allLeads.filter(
    l => l.follow_up_date && new Date(l.follow_up_date) < now && !["completed", "archived"].includes(l.status)
  ).length;

  // Lead sources for pie chart
  const sourceMap: Record<string, number> = {};
  allLeads
    .filter(l => new Date(l.created_at) >= thisMonthStart)
    .forEach(l => {
      sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
    });
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  // Recent activity (last 5 updated leads)
  const recentLeads = [...allLeads]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "32px",
      }}>
        <StatCard title="New Leads" value={newLeads} subtitle="This week" color="#3B82F6" />
        <StatCard title="In Discussion" value={inDiscussion} color="#F97316" />
        <StatCard title="Booked This Month" value={bookedThisMonth} color="#22C55E" />
        <StatCard
          title="Pending Follow-ups"
          value={overdueFollowups}
          alert={overdueFollowups > 0}
          subtitle={overdueFollowups > 0 ? "Overdue!" : "All clear"}
        />
      </div>

      {/* Chart + Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <LeadSourceChart data={sourceData} />

        {/* Recent Activity */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #E5E7EB",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "16px" }}>
            Recent Activity
          </p>
          {recentLeads.length === 0 ? (
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>No leads yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentLeads.map((lead) => (
                <div key={lead.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#F9FAFB",
                }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A202C" }}>{lead.name}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8" }}>{lead.source_form} form</p>
                  </div>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "white",
                    background: LEAD_STATUS_CONFIG[lead.status].color,
                  }}>
                    {LEAD_STATUS_CONFIG[lead.status].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
