import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types/admin";
import LeadsTable from "./LeadsTable";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return <LeadsTable leads={(leads || []) as Lead[]} />;
}
