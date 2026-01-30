import { createClient } from "@/lib/supabase/server";
import type { Setting } from "@/lib/types/admin";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data } = await supabase.from("settings").select("*");
  const settings = (data || []) as Setting[];

  return (
    <div>
      <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#1A202C", marginBottom: "24px" }}>
        Settings
      </h1>
      <SettingsClient settings={settings} />
    </div>
  );
}
