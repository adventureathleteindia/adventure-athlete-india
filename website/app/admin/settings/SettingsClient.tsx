"use client";

import { useState, useCallback } from "react";
import type { Setting } from "@/lib/types/admin";
import { updateSettings, changePassword } from "./actions";

interface SettingsClientProps {
  settings: Setting[];
}

export default function SettingsClient({ settings }: SettingsClientProps) {
  const getValue = useCallback(
    (key: string) => settings.find((s) => s.key === key)?.value || "",
    [settings]
  );

  // Contact state
  const [contact, setContact] = useState({
    phone: getValue("phone"),
    email: getValue("email"),
    address: getValue("address"),
  });

  // Social state
  const [social, setSocial] = useState({
    instagram_url: getValue("instagram_url"),
    youtube_url: getValue("youtube_url"),
    strava_url: getValue("strava_url"),
    facebook_url: getValue("facebook_url"),
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    notify_new_leads: getValue("notify_new_leads") === "true",
    notify_overdue_followups: getValue("notify_overdue_followups") === "true",
  });

  // Password state
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // UI state
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveContact = async () => {
    setSaving("contact");
    const result = await updateSettings(contact);
    setSaving(null);
    if ("error" in result && result.error) {
      showMessage(result.error, "error");
    } else {
      showMessage("Contact information saved.", "success");
    }
  };

  const handleSaveSocial = async () => {
    setSaving("social");
    const result = await updateSettings(social);
    setSaving(null);
    if ("error" in result && result.error) {
      showMessage(result.error, "error");
    } else {
      showMessage("Social links saved.", "success");
    }
  };

  const handleToggleNotification = async (key: "notify_new_leads" | "notify_overdue_followups") => {
    const newValue = !notifications[key];
    setNotifications((prev) => ({ ...prev, [key]: newValue }));
    setSaving("notifications");
    const result = await updateSettings({ [key]: String(newValue) });
    setSaving(null);
    if ("error" in result && result.error) {
      setNotifications((prev) => ({ ...prev, [key]: !newValue }));
      showMessage(result.error, "error");
    } else {
      showMessage("Notification preference updated.", "success");
    }
  };

  const handleChangePassword = async () => {
    if (password.new !== password.confirm) {
      showMessage("New passwords do not match.", "error");
      return;
    }
    if (password.new.length < 8) {
      showMessage("Password must be at least 8 characters.", "error");
      return;
    }
    setSaving("password");
    const result = await changePassword(password.current, password.new);
    setSaving(null);
    if ("error" in result && result.error) {
      showMessage(result.error, "error");
    } else {
      setPassword({ current: "", new: "", confirm: "" });
      showMessage("Password updated successfully.", "success");
    }
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: "12px",
    padding: "28px",
    border: "1px solid #E5E7EB",
    marginBottom: "24px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1A202C",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "1px solid #F3F4F6",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#4B5563",
    marginBottom: "6px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    color: "#1A202C",
    outline: "none",
    boxSizing: "border-box",
    background: "#FAFAFA",
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: "16px",
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    background: isActive ? "#9CA3AF" : "#2D5A3D",
    color: "white",
    fontSize: "14px",
    fontWeight: 500,
    cursor: isActive ? "not-allowed" : "pointer",
    opacity: isActive ? 0.7 : 1,
  });

  return (
    <div style={{ maxWidth: "700px" }}>
      {/* Message Banner */}
      {message && (
        <div
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
            fontWeight: 500,
            color: "white",
            background: message.type === "success" ? "#22C55E" : "#EF4444",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Contact Information */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>Contact Information</h2>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="hello@adventureathlete.in"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            value={contact.address}
            onChange={(e) => setContact((prev) => ({ ...prev, address: e.target.value }))}
            placeholder="Shimla, Himachal Pradesh"
            style={inputStyle}
          />
        </div>
        <button
          onClick={handleSaveContact}
          disabled={saving === "contact"}
          style={buttonStyle(saving === "contact")}
        >
          {saving === "contact" ? "Saving..." : "Save Contact Info"}
        </button>
      </div>

      {/* Social Links */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>Social Links</h2>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Instagram URL</label>
          <input
            type="url"
            value={social.instagram_url}
            onChange={(e) => setSocial((prev) => ({ ...prev, instagram_url: e.target.value }))}
            placeholder="https://instagram.com/adventureathlete.in"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>YouTube URL</label>
          <input
            type="url"
            value={social.youtube_url}
            onChange={(e) => setSocial((prev) => ({ ...prev, youtube_url: e.target.value }))}
            placeholder="https://youtube.com/@adventureathleindia"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Strava URL</label>
          <input
            type="url"
            value={social.strava_url}
            onChange={(e) => setSocial((prev) => ({ ...prev, strava_url: e.target.value }))}
            placeholder="https://strava.com/athletes/atulchauhan"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Facebook URL</label>
          <input
            type="url"
            value={social.facebook_url}
            onChange={(e) => setSocial((prev) => ({ ...prev, facebook_url: e.target.value }))}
            placeholder="https://facebook.com/AdventureAthleteIndia"
            style={inputStyle}
          />
        </div>
        <button
          onClick={handleSaveSocial}
          disabled={saving === "social"}
          style={buttonStyle(saving === "social")}
        >
          {saving === "social" ? "Saving..." : "Save Social Links"}
        </button>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>Notifications</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A202C", margin: 0 }}>
              New lead notifications
            </p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0 0" }}>
              Email me when a new lead comes in
            </p>
          </div>
          <button
            onClick={() => handleToggleNotification("notify_new_leads")}
            disabled={saving === "notifications"}
            style={{
              width: "44px",
              height: "24px",
              borderRadius: "12px",
              border: "none",
              cursor: saving === "notifications" ? "not-allowed" : "pointer",
              background: notifications.notify_new_leads ? "#2D5A3D" : "#D1D5DB",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                display: "block",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: "3px",
                left: notifications.notify_new_leads ? "23px" : "3px",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <div>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A202C", margin: 0 }}>
              Overdue follow-up alerts
            </p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: "4px 0 0 0" }}>
              Notify me about overdue follow-ups
            </p>
          </div>
          <button
            onClick={() => handleToggleNotification("notify_overdue_followups")}
            disabled={saving === "notifications"}
            style={{
              width: "44px",
              height: "24px",
              borderRadius: "12px",
              border: "none",
              cursor: saving === "notifications" ? "not-allowed" : "pointer",
              background: notifications.notify_overdue_followups ? "#2D5A3D" : "#D1D5DB",
              position: "relative",
              transition: "background 0.2s",
            }}
          >
            <span
              style={{
                display: "block",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: "3px",
                left: notifications.notify_overdue_followups ? "23px" : "3px",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            />
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div style={cardStyle}>
        <h2 style={headingStyle}>Change Password</h2>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Current Password</label>
          <input
            type="password"
            value={password.current}
            onChange={(e) => setPassword((prev) => ({ ...prev, current: e.target.value }))}
            placeholder="Enter current password"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>New Password</label>
          <input
            type="password"
            value={password.new}
            onChange={(e) => setPassword((prev) => ({ ...prev, new: e.target.value }))}
            placeholder="Minimum 8 characters"
            style={inputStyle}
          />
        </div>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Confirm New Password</label>
          <input
            type="password"
            value={password.confirm}
            onChange={(e) => setPassword((prev) => ({ ...prev, confirm: e.target.value }))}
            placeholder="Re-enter new password"
            style={inputStyle}
          />
        </div>
        <button
          onClick={handleChangePassword}
          disabled={saving === "password"}
          style={buttonStyle(saving === "password")}
        >
          {saving === "password" ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
