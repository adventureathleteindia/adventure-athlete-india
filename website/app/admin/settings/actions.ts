"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(settings: Record<string, string>) {
  const supabase = await createClient();

  for (const [key, value] of Object.entries(settings)) {
    const { error } = await supabase
      .from("settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) {
      return { error: `Failed to update ${key}: ${error.message}` };
    }
  }

  revalidatePath("/admin/settings");
  return { success: true };
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
