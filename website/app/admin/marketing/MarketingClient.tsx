"use client";

import { useState, useTransition } from "react";
import type { MarketingTask, HotelPartner, HotelStatus } from "@/lib/types/admin";
import { HOTEL_STATUS_CONFIG } from "@/lib/types/admin";
import { toggleTask, addHotelPartner, updateHotelStatus, deleteHotelPartner } from "./actions";

interface MarketingClientProps {
  preLaunchTasks: MarketingTask[];
  recurringTasks: MarketingTask[];
  hotelPartners: HotelPartner[];
}

function TaskRow({ task }: { task: MarketingTask }) {
  const [isPending, startTransition] = useTransition();

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        background: task.is_completed ? "#F9FAFB" : "white",
        cursor: isPending ? "wait" : "pointer",
        opacity: isPending ? 0.6 : 1,
        transition: "background 0.15s",
      }}
    >
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={(e) => {
          startTransition(() => {
            toggleTask(task.id, e.target.checked);
          });
        }}
        disabled={isPending}
        style={{
          width: "18px",
          height: "18px",
          accentColor: "#2D5A3D",
          cursor: "inherit",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          flex: 1,
          fontSize: "14px",
          color: task.is_completed ? "#9CA3AF" : "#1A202C",
          textDecoration: task.is_completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>
      {task.platform && (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#2D5A3D",
            background: "#D1FAE5",
            whiteSpace: "nowrap",
          }}
        >
          {task.platform}
        </span>
      )}
      {task.frequency && (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#D97706",
            background: "#FEF3C7",
            whiteSpace: "nowrap",
          }}
        >
          {task.frequency}
        </span>
      )}
    </label>
  );
}

export default function MarketingClient({
  preLaunchTasks,
  recurringTasks,
  hotelPartners,
}: MarketingClientProps) {
  const [activeTab, setActiveTab] = useState<"checklists" | "hotels">("checklists");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const preLaunchDone = preLaunchTasks.filter((t) => t.is_completed).length;
  const recurringDone = recurringTasks.filter((t) => t.is_completed).length;
  const preLaunchProgress = preLaunchTasks.length > 0 ? (preLaunchDone / preLaunchTasks.length) * 100 : 0;

  const hotelStatuses = Object.entries(HOTEL_STATUS_CONFIG) as [HotelStatus, { label: string; color: string }][];

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          onClick={() => setActiveTab("checklists")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            background: activeTab === "checklists" ? "#2D5A3D" : "#E5E7EB",
            color: activeTab === "checklists" ? "white" : "#6B7280",
            transition: "all 0.15s",
          }}
        >
          Checklists
        </button>
        <button
          onClick={() => setActiveTab("hotels")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            background: activeTab === "hotels" ? "#2D5A3D" : "#E5E7EB",
            color: activeTab === "hotels" ? "white" : "#6B7280",
            transition: "all 0.15s",
          }}
        >
          Hotel Partners
        </button>
      </div>

      {/* Checklists Tab */}
      {activeTab === "checklists" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Pre-Launch Checklist */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#1A202C", margin: 0 }}>
                Pre-Launch Checklist
              </p>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                {preLaunchDone}/{preLaunchTasks.length} done
              </span>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "4px",
                background: "#E5E7EB",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${preLaunchProgress}%`,
                  height: "100%",
                  borderRadius: "4px",
                  background: "#2D5A3D",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {preLaunchTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
              {preLaunchTasks.length === 0 && (
                <p style={{ color: "#9CA3AF", fontSize: "14px", padding: "12px" }}>
                  No pre-launch tasks found.
                </p>
              )}
            </div>
          </div>

          {/* Recurring Tasks */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#1A202C", margin: 0 }}>
                Recurring Tasks
              </p>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                {recurringDone}/{recurringTasks.length} done
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {recurringTasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
              {recurringTasks.length === 0 && (
                <p style={{ color: "#9CA3AF", fontSize: "14px", padding: "12px" }}>
                  No recurring tasks found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hotel Partners Tab */}
      {activeTab === "hotels" && (
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #E5E7EB",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1A202C", margin: 0 }}>
              Hotel Partners
            </p>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: "#2D5A3D",
                color: "white",
              }}
            >
              + Add Hotel
            </button>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <form
              action={(formData) => {
                startTransition(async () => {
                  await addHotelPartner(formData);
                  setShowAddForm(false);
                });
              }}
              style={{
                padding: "20px",
                borderRadius: "8px",
                background: "#F9FAFB",
                marginBottom: "20px",
                border: "1px solid #E5E7EB",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Hotel Name *
                  </label>
                  <input
                    name="hotel_name"
                    required
                    placeholder="e.g. Hotel Mountain View"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #D1D5DB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Contact Person
                  </label>
                  <input
                    name="contact_person"
                    placeholder="e.g. Rajesh Sharma"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #D1D5DB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Phone / Email
                  </label>
                  <input
                    name="phone_email"
                    placeholder="e.g. +91 98765 43210"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #D1D5DB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Notes
                  </label>
                  <input
                    name="notes"
                    placeholder="Any notes..."
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #D1D5DB",
                      fontSize: "14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "1px solid #D1D5DB",
                    background: "white",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#6B7280",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#2D5A3D",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "white",
                    cursor: isPending ? "wait" : "pointer",
                    opacity: isPending ? 0.7 : 1,
                  }}
                >
                  {isPending ? "Adding..." : "Add Partner"}
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          {hotelPartners.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#9CA3AF",
                fontSize: "14px",
              }}
            >
              No hotel partners yet. Click &quot;+ Add Hotel&quot; to get started.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid #E5E7EB",
                      textAlign: "left",
                    }}
                  >
                    <th style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Hotel
                    </th>
                    <th style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Contact
                    </th>
                    <th style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Status
                    </th>
                    <th style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Notes
                    </th>
                    <th style={{ padding: "10px 12px", fontWeight: 600, color: "#374151", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", width: "60px" }}>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hotelPartners.map((hotel) => (
                    <HotelRow
                      key={hotel.id}
                      hotel={hotel}
                      hotelStatuses={hotelStatuses}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HotelRow({
  hotel,
  hotelStatuses,
}: {
  hotel: HotelPartner;
  hotelStatuses: [HotelStatus, { label: string; color: string }][];
}) {
  const [isPending, startTransition] = useTransition();

  const statusConfig = HOTEL_STATUS_CONFIG[hotel.status];

  return (
    <tr
      style={{
        borderBottom: "1px solid #F3F4F6",
        opacity: isPending ? 0.5 : 1,
        transition: "opacity 0.15s",
      }}
    >
      <td style={{ padding: "12px", fontWeight: 500, color: "#1A202C" }}>
        {hotel.hotel_name}
      </td>
      <td style={{ padding: "12px" }}>
        <div>
          <span style={{ color: "#1A202C" }}>{hotel.contact_person || "-"}</span>
          {hotel.phone_email && (
            <div style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "2px" }}>
              {hotel.phone_email}
            </div>
          )}
        </div>
      </td>
      <td style={{ padding: "12px" }}>
        <select
          value={hotel.status}
          onChange={(e) => {
            startTransition(() => {
              updateHotelStatus(hotel.id, e.target.value as HotelStatus);
            });
          }}
          disabled={isPending}
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid transparent",
            fontSize: "12px",
            fontWeight: 600,
            color: "white",
            background: statusConfig.color,
            cursor: isPending ? "wait" : "pointer",
            outline: "none",
            appearance: "auto",
          }}
        >
          {hotelStatuses.map(([value, config]) => (
            <option key={value} value={value}>
              {config.label}
            </option>
          ))}
        </select>
      </td>
      <td
        style={{
          padding: "12px",
          color: "#6B7280",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {hotel.notes || "-"}
      </td>
      <td style={{ padding: "12px" }}>
        <button
          onClick={() => {
            if (confirm("Delete this hotel partner?")) {
              startTransition(() => {
                deleteHotelPartner(hotel.id);
              });
            }
          }}
          disabled={isPending}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            background: "transparent",
            color: "#EF4444",
            fontSize: "13px",
            cursor: isPending ? "wait" : "pointer",
            fontWeight: 500,
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
