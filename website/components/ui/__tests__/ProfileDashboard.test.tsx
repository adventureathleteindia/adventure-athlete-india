import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfileDashboard from "../ProfileDashboard";

const mockData = {
  primaryStats: [
    { label: "ITRA Score", value: "555" },
    { label: "FTP Power", value: "290W" },
  ],
  secondaryStats: [
    { label: "Guide License", value: "HP Tourism", subtext: "Reg: 080724 42383" },
  ],
};

describe("ProfileDashboard", () => {
  it("renders primary stats", () => {
    render(<ProfileDashboard {...mockData} />);
    expect(screen.getByText("555")).toBeInTheDocument();
    expect(screen.getByText("ITRA Score")).toBeInTheDocument();
  });

  it("renders secondary stats", () => {
    render(<ProfileDashboard {...mockData} />);
    expect(screen.getByText("HP Tourism")).toBeInTheDocument();
  });
});
