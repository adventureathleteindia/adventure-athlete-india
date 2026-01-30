"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1E3D2A 0%, #2D5A3D 50%, #1E3D2A 100%)",
      fontFamily: "var(--font-body)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "28px",
            fontWeight: 400,
            color: "#2D5A3D",
            marginBottom: "8px",
          }}>
            Adventure Athlete India
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>Admin Panel</p>
        </div>

        <form action={handleSubmit}>
          {error && (
            <div style={{
              padding: "12px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              color: "#DC2626",
              fontSize: "14px",
              marginBottom: "20px",
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              marginBottom: "6px",
            }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              marginBottom: "6px",
            }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "#9CA3AF" : "#2D5A3D",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
