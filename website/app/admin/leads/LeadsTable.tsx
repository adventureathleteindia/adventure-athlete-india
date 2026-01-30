"use client";

import { useState, useMemo } from "react";
import type { Lead, LeadStatus } from "@/lib/types/admin";
import { LEAD_STATUS_CONFIG } from "@/lib/types/admin";
import { updateLeadStatus, updateLeadNotes, updateLeadFollowUp, deleteLead } from "./actions";

type SortKey = "name" | "email" | "source_form" | "created_at" | "status";
type SortDir = "asc" | "desc";

// ---------------------------------------------------------------------------
// Lead Detail Panel (inline component)
// ---------------------------------------------------------------------------

function LeadDetailPanel({
  lead,
  onClose,
  onDeleted,
}: {
  lead: Lead;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes || "");
  const [followUp, setFollowUp] = useState(lead.follow_up_date || "");
  const [saving, setSaving] = useState<string | null>(null);

  async function handleStatusChange(newStatus: LeadStatus) {
    setStatus(newStatus);
    setSaving("status");
    await updateLeadStatus(lead.id, newStatus);
    setSaving(null);
  }

  async function handleSaveNotes() {
    setSaving("notes");
    await updateLeadNotes(lead.id, notes);
    setSaving(null);
  }

  async function handleFollowUpBlur() {
    setSaving("followup");
    await updateLeadFollowUp(lead.id, followUp || null);
    setSaving(null);
  }

  async function handleDelete() {
    if (!confirm(`Delete lead "${lead.name}"? This cannot be undone.`)) return;
    setSaving("delete");
    await deleteLead(lead.id);
    setSaving(null);
    onDeleted();
  }

  const formData = lead.form_data && typeof lead.form_data === "object"
    ? Object.entries(lead.form_data as Record<string, unknown>)
    : [];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "420px",
      height: "100vh",
      background: "white",
      borderLeft: "1px solid #E5E7EB",
      boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 24px",
        borderBottom: "1px solid #E5E7EB",
        flexShrink: 0,
      }}>
        <h2 style={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#1A202C",
          margin: 0,
        }}>
          Lead Details
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#64748b",
            fontSize: "20px",
            lineHeight: 1,
          }}
          aria-label="Close panel"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1A202C", margin: "0 0 4px 0" }}>
            {lead.name}
          </h3>
          <a
            href={`mailto:${lead.email}`}
            style={{ fontSize: "14px", color: "#2D5A3D", textDecoration: "none" }}
          >
            {lead.email}
          </a>
          {lead.phone && (
            <div style={{ marginTop: "8px" }}>
              <a
                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  color: "#25D366",
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .611.611l4.458-1.495A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.64-6.381-1.753l-.446-.271-2.644.886.886-2.644-.271-.446A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                {lead.phone}
              </a>
            </div>
          )}
          {lead.nationality && (
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>
              Nationality: {lead.nationality}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#64748b", marginBottom: "6px" }}>
            Status {saving === "status" && <span style={{ color: "#D97706", fontSize: "12px" }}>(saving...)</span>}
          </label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1A202C",
              background: "white",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {Object.entries(LEAD_STATUS_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>{cfg.label}</option>
            ))}
          </select>
        </div>

        {/* Follow-up Date */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#64748b", marginBottom: "6px" }}>
            Follow-up Date {saving === "followup" && <span style={{ color: "#D97706", fontSize: "12px" }}>(saving...)</span>}
          </label>
          <input
            type="date"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            onBlur={handleFollowUpBlur}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1A202C",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Notes */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#64748b", marginBottom: "6px" }}>
            Notes {saving === "notes" && <span style={{ color: "#D97706", fontSize: "12px" }}>(saving...)</span>}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1A202C",
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
            placeholder="Add notes about this lead..."
          />
          <button
            onClick={handleSaveNotes}
            disabled={saving === "notes"}
            style={{
              marginTop: "8px",
              padding: "8px 16px",
              background: "#2D5A3D",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: saving === "notes" ? "not-allowed" : "pointer",
              opacity: saving === "notes" ? 0.7 : 1,
            }}
          >
            {saving === "notes" ? "Saving..." : "Save Notes"}
          </button>
        </div>

        {/* Form Submission Data */}
        {formData.length > 0 && (
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#64748b", marginBottom: "8px" }}>
              Form Submission Data
            </label>
            <div style={{
              background: "#F9FAFB",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #E5E7EB",
            }}>
              {formData.map(([key, value]) => (
                <div key={key} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid #E5E7EB",
                  fontSize: "13px",
                }}>
                  <span style={{ color: "#64748b", fontWeight: 500 }}>
                    {key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                  </span>
                  <span style={{ color: "#1A202C", maxWidth: "200px", textAlign: "right", wordBreak: "break-word" }}>
                    {String(value ?? "-")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#64748b", marginBottom: "8px" }}>
            Meta
          </label>
          <div style={{
            background: "#F9FAFB",
            borderRadius: "8px",
            padding: "12px",
            border: "1px solid #E5E7EB",
            fontSize: "13px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Source</span>
              <span style={{ color: "#1A202C" }}>{lead.source}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Source Form</span>
              <span style={{ color: "#1A202C" }}>{lead.source_form}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Created</span>
              <span style={{ color: "#1A202C" }}>
                {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Updated</span>
              <span style={{ color: "#1A202C" }}>
                {new Date(lead.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Delete */}
        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "20px" }}>
          <button
            onClick={handleDelete}
            disabled={saving === "delete"}
            style={{
              width: "100%",
              padding: "10px",
              background: "transparent",
              color: "#DC2626",
              border: "1px solid #FECACA",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: saving === "delete" ? "not-allowed" : "pointer",
              opacity: saving === "delete" ? 0.7 : 1,
            }}
          >
            {saving === "delete" ? "Deleting..." : "Delete Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Leads Table (main export)
// ---------------------------------------------------------------------------

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Unique source forms from data
  const uniqueSources = useMemo(() => {
    const set = new Set(leads.map((l) => l.source_form));
    return Array.from(set).sort();
  }, [leads]);

  // Filter
  const filtered = useMemo(() => {
    let result = leads;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    if (sourceFilter !== "all") {
      result = result.filter((l) => l.source_form === sourceFilter);
    }

    return result;
  }, [leads, search, statusFilter, sourceFilter]);

  // Sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let aVal: string = "";
      let bVal: string = "";

      switch (sortKey) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "email":
          aVal = a.email.toLowerCase();
          bVal = b.email.toLowerCase();
          break;
        case "source_form":
          aVal = a.source_form;
          bVal = b.source_form;
          break;
        case "created_at":
          aVal = a.created_at;
          bVal = b.created_at;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
      }

      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u2191" : " \u2193";
  }

  const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #E5E7EB",
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    background: "#F9FAFB",
  };

  const tdStyle: React.CSSProperties = {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#1A202C",
    borderBottom: "1px solid #F1F5F9",
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#1A202C",
    outline: "none",
    background: "white",
  };

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}>
        {/* Search */}
        <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "320px" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...inputStyle,
              width: "100%",
              paddingLeft: "36px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer", minWidth: "140px" }}
        >
          <option value="all">All Statuses</option>
          {Object.entries(LEAD_STATUS_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer", minWidth: "140px" }}
        >
          <option value="all">All Sources</option>
          {uniqueSources.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </option>
          ))}
        </select>

        {/* Count */}
        <span style={{ fontSize: "13px", color: "#64748b", marginLeft: "auto" }}>
          {sorted.length} lead{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
      }}>
        {sorted.length === 0 ? (
          <div style={{
            padding: "60px 20px",
            textAlign: "center",
          }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="1.5"
              style={{ marginBottom: "16px" }}
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p style={{ fontSize: "15px", color: "#64748b", margin: "0 0 4px 0" }}>
              {leads.length === 0 ? "No leads yet" : "No leads match your filters"}
            </p>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              {leads.length === 0
                ? "Leads will appear here when people submit forms on the website."
                : "Try adjusting your search or filters."}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle} onClick={() => handleSort("name")}>
                    Name{sortIndicator("name")}
                  </th>
                  <th style={thStyle} onClick={() => handleSort("email")}>
                    Email{sortIndicator("email")}
                  </th>
                  <th style={thStyle} onClick={() => handleSort("source_form")}>
                    Source{sortIndicator("source_form")}
                  </th>
                  <th style={thStyle} onClick={() => handleSort("created_at")}>
                    Date{sortIndicator("created_at")}
                  </th>
                  <th style={thStyle} onClick={() => handleSort("status")}>
                    Status{sortIndicator("status")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((lead) => {
                  const statusCfg = LEAD_STATUS_CONFIG[lead.status];
                  const isSelected = selectedLead?.id === lead.id;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      style={{
                        cursor: "pointer",
                        background: isSelected ? "#F0FDF4" : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) (e.currentTarget.style.background = "#F9FAFB");
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) (e.currentTarget.style.background = "transparent");
                      }}
                    >
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 500 }}>{lead.name}</div>
                        {lead.phone && (
                          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                            {lead.phone}
                          </div>
                        )}
                      </td>
                      <td style={{ ...tdStyle, color: "#64748b" }}>
                        {lead.email}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          background: "#F1F5F9",
                          color: "#475569",
                        }}>
                          {lead.source_form.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>
                      <td style={{ ...tdStyle, color: "#64748b", whiteSpace: "nowrap" }}>
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td style={tdStyle}>
                        <span style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "white",
                          background: statusCfg.color,
                        }}>
                          {statusCfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel Overlay */}
      {selectedLead && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedLead(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.2)",
              zIndex: 99,
            }}
          />
          <LeadDetailPanel
            key={selectedLead.id}
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onDeleted={() => setSelectedLead(null)}
          />
        </>
      )}
    </div>
  );
}
