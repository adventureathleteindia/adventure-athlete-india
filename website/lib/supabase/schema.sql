-- Adventure Athlete India - Admin Panel Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- TABLES
-- ============================================

-- Leads table: captures all inquiries from website forms
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  source TEXT DEFAULT 'website',
  source_form TEXT DEFAULT 'contact',
  status TEXT DEFAULT 'new',
  notes TEXT DEFAULT '',
  follow_up_date DATE,
  form_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT leads_status_check CHECK (status IN ('new', 'contacted', 'in_discussion', 'booked', 'completed', 'archived')),
  CONSTRAINT leads_source_form_check CHECK (source_form IN ('contact', 'plan', 'plan_tour', 'gpx_download', 'rental'))
);

-- Marketing tasks table: pre-launch and recurring marketing checklist
CREATE TABLE marketing_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'pre_launch',
  platform TEXT,
  frequency TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT marketing_tasks_category_check CHECK (category IN ('pre_launch', 'recurring'))
);

-- Hotel partners table: track hotel partnership outreach
CREATE TABLE hotel_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_name TEXT NOT NULL,
  contact_person TEXT,
  phone_email TEXT,
  status TEXT DEFAULT 'pitched',
  last_contacted DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT hotel_partners_status_check CHECK (status IN ('pitched', 'interested', 'active', 'declined'))
);

-- Settings table: key-value store for admin configuration
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotel_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Authenticated users: full CRUD on all tables
CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert leads"
  ON leads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete leads"
  ON leads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read marketing_tasks"
  ON marketing_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert marketing_tasks"
  ON marketing_tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update marketing_tasks"
  ON marketing_tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete marketing_tasks"
  ON marketing_tasks FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read hotel_partners"
  ON hotel_partners FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hotel_partners"
  ON hotel_partners FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update hotel_partners"
  ON hotel_partners FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete hotel_partners"
  ON hotel_partners FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read settings"
  ON settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert settings"
  ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete settings"
  ON settings FOR DELETE TO authenticated USING (true);

-- Anonymous users: INSERT only on leads (public form submissions)
CREATE POLICY "Anonymous users can submit leads"
  ON leads FOR INSERT TO anon WITH CHECK (true);

-- ============================================
-- TRIGGERS: auto-update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_hotel_partners_updated_at
  BEFORE UPDATE ON hotel_partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA
-- ============================================

-- Settings
INSERT INTO settings (key, value) VALUES
  ('contact_phone', '+91-9459033240'),
  ('contact_email', 'adventureathleteindia@gmail.com'),
  ('contact_address', 'Shimla, HP, India'),
  ('social_instagram', 'https://www.instagram.com/adventureathlete.in'),
  ('social_youtube', 'https://www.youtube.com/@adventureathleindia'),
  ('social_strava', 'https://www.strava.com/athletes/atulchauhan'),
  ('social_facebook', 'https://www.facebook.com/AdventureAthleteIndia'),
  ('notify_new_leads', 'true'),
  ('notify_overdue_followups', 'true');

-- Pre-launch marketing tasks
INSERT INTO marketing_tasks (title, category, platform, sort_order) VALUES
  ('Set up Google Business Profile', 'pre_launch', 'Google', 1),
  ('Create Instagram Business account', 'pre_launch', 'Instagram', 2),
  ('Create Facebook Page', 'pre_launch', 'Facebook', 3),
  ('Set up YouTube channel', 'pre_launch', 'YouTube', 4),
  ('Set up Google Analytics', 'pre_launch', 'Google', 5),
  ('Set up WhatsApp Business', 'pre_launch', 'WhatsApp', 6),
  ('Design and print business cards', 'pre_launch', NULL, 7),
  ('Add business to Google Maps listing', 'pre_launch', 'Google', 8),
  ('Create TripAdvisor listing', 'pre_launch', 'TripAdvisor', 9),
  ('Finalize domain and SSL setup', 'pre_launch', NULL, 10);

-- Recurring marketing tasks
INSERT INTO marketing_tasks (title, category, platform, frequency, sort_order) VALUES
  ('Post on Instagram', 'recurring', 'Instagram', '3x/week', 1),
  ('Share Instagram story', 'recurring', 'Instagram', 'Daily', 2),
  ('Post YouTube video', 'recurring', 'YouTube', '1x/month', 3),
  ('Respond to inquiries', 'recurring', NULL, 'Ongoing', 4),
  ('Ask for reviews', 'recurring', NULL, 'After each tour', 5),
  ('Share on Strava', 'recurring', 'Strava', 'After each ride/run', 6),
  ('Update website content', 'recurring', NULL, 'After each adventure', 7);
