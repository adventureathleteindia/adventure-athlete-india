import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FilterPills from "../FilterPills";

const mockCategories = [
  { label: "All", value: "all" },
  { label: "Mountain Biking", value: "mtb" },
  { label: "Road Cycling", value: "road" },
];

describe("FilterPills", () => {
  it("renders all category pills", () => {
    render(<FilterPills categories={mockCategories} activeFilter="all" onFilterChange={() => {}} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Mountain Biking")).toBeInTheDocument();
    expect(screen.getByText("Road Cycling")).toBeInTheDocument();
  });

  it("highlights the active filter", () => {
    render(<FilterPills categories={mockCategories} activeFilter="mtb" onFilterChange={() => {}} />);
    const mtbButton = screen.getByText("Mountain Biking");
    expect(mtbButton).toHaveClass("bg-[var(--color-forest)]");
  });
});
