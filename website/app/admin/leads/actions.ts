"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/types/admin";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateLeadNotes(id: string, notes: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateLeadFollowUp(id: string, follow_up_date: string | null) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .update({ follow_up_date, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteLead(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("leads")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { success: true };
}
