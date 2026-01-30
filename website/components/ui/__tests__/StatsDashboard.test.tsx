import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsDashboard from "../StatsDashboard";

const mockStats = {
  distance: "32 km",
  elevation: "1200m",
  duration: "4-5 hrs",
  difficulty: "Hard",
  difficultyLevel: 4,
  route: "Shimla → Kuppar Peak → Shimla (Loop)",
  bestSeason: "Mar-Jun, Sep-Nov",
  gear: "MTB · Full-sus recommended",
};

describe("StatsDashboard", () => {
  it("renders primary stats", () => {
    render(<StatsDashboard {...mockStats} />);
    expect(screen.getByText("32 km")).toBeInTheDocument();
    expect(screen.getByText("1200m")).toBeInTheDocument();
    expect(screen.getByText("4-5 hrs")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });

  it("renders secondary stats", () => {
    render(<StatsDashboard {...mockStats} />);
    expect(screen.getByText(/Shimla → Kuppar Peak/)).toBeInTheDocument();
    expect(screen.getByText("Mar-Jun, Sep-Nov")).toBeInTheDocument();
  });
});
