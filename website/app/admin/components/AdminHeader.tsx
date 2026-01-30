"use client";

import { usePathname } from "next/navigation";
import { logout } from "../login/actions";

const pageTitle: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Lead Management",
  "/admin/marketing": "Marketing",
  "/admin/settings": "Settings",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitle[pathname] || "Admin";

  return (
    <header style={{
      height: "64px",
      borderBottom: "1px solid #E5E7EB",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 32px",
      background: "white",
    }}>
      <h1 style={{
        fontFamily: "var(--font-heading)",
        fontSize: "22px",
        fontWeight: 400,
        color: "#1A202C",
      }}>
        {title}
      </h1>

      <button
        onClick={() => logout()}
        style={{
          padding: "8px 16px",
          background: "transparent",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#64748b",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </header>
  );
}
