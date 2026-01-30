"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { HotelStatus } from "@/lib/types/admin";

export async function toggleTask(id: string, isCompleted: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("marketing_tasks")
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/marketing");
}

export async function addHotelPartner(formData: FormData) {
  const supabase = await createClient();

  const hotelName = formData.get("hotel_name") as string;
  const contactPerson = formData.get("contact_person") as string;
  const phoneEmail = formData.get("phone_email") as string;
  const notes = formData.get("notes") as string;

  const { error } = await supabase.from("hotel_partners").insert({
    hotel_name: hotelName,
    contact_person: contactPerson || null,
    phone_email: phoneEmail || null,
    notes: notes || "",
    status: "pitched" as HotelStatus,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/marketing");
}

export async function updateHotelStatus(id: string, status: HotelStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("hotel_partners")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/marketing");
}

export async function deleteHotelPartner(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("hotel_partners")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/marketing");
}
