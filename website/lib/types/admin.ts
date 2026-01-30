// Adventure Athlete India - Admin Panel Types

export type LeadStatus = "new" | "contacted" | "in_discussion" | "booked" | "completed" | "archived";
export type SourceForm = "contact" | "plan" | "plan_tour" | "gpx_download" | "rental";
export type HotelStatus = "pitched" | "interested" | "active" | "declined";
export type MarketingCategory = "pre_launch" | "recurring";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  source: string;
  source_form: SourceForm;
  status: LeadStatus;
  notes: string;
  follow_up_date: string | null;
  form_data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface MarketingTask {
  id: string;
  title: string;
  category: MarketingCategory;
  platform: string | null;
  frequency: string | null;
  is_completed: boolean;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
}

export interface HotelPartner {
  id: string;
  hotel_name: string;
  contact_person: string | null;
  phone_email: string | null;
  status: HotelStatus;
  last_contacted: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  key: string;
  value: string;
  updated_at: string;
}

export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string }> = {
  new: { label: "New", color: "#3B82F6" },
  contacted: { label: "Contacted", color: "#EAB308" },
  in_discussion: { label: "In Discussion", color: "#F97316" },
  booked: { label: "Booked", color: "#22C55E" },
  completed: { label: "Completed", color: "#9CA3AF" },
  archived: { label: "Archived", color: "#D1D5DB" },
};

export const HOTEL_STATUS_CONFIG: Record<HotelStatus, { label: string; color: string }> = {
  pitched: { label: "Pitched", color: "#3B82F6" },
  interested: { label: "Interested", color: "#EAB308" },
  active: { label: "Active Partner", color: "#22C55E" },
  declined: { label: "Declined", color: "#9CA3AF" },
};
