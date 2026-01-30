import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export const metadata = {
  title: "Admin | Adventure Athlete India",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Don't apply admin layout to login page
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB" }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: "240px" }}>
        <AdminHeader />
        <main style={{ padding: "32px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
