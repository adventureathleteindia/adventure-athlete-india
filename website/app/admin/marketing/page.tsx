import { createClient } from "@/lib/supabase/server";
import type { MarketingTask, HotelPartner } from "@/lib/types/admin";
import MarketingClient from "./MarketingClient";

export default async function MarketingPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("marketing_tasks")
    .select("*")
    .order("sort_order", { ascending: true });

  const allTasks = (tasks || []) as MarketingTask[];
  const preLaunchTasks = allTasks.filter((t) => t.category === "pre_launch");
  const recurringTasks = allTasks.filter((t) => t.category === "recurring");

  const { data: hotels } = await supabase
    .from("hotel_partners")
    .select("*")
    .order("created_at", { ascending: false });

  const hotelPartners = (hotels || []) as HotelPartner[];

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1A202C", margin: 0 }}>
          Marketing
        </h1>
        <p style={{ fontSize: "14px", color: "#6B7280", marginTop: "4px" }}>
          Track launch tasks, recurring marketing activities, and hotel partnerships.
        </p>
      </div>
      <MarketingClient
        preLaunchTasks={preLaunchTasks}
        recurringTasks={recurringTasks}
        hotelPartners={hotelPartners}
      />
    </div>
  );
}
