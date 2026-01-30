import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PhotoPileHero from "../PhotoPileHero";

const mockPhotos = [
  { src: "/photo1.jpg", alt: "Photo 1", label: "Route 1" },
  { src: "/photo2.jpg", alt: "Photo 2", label: "Route 2" },
];

describe("PhotoPileHero", () => {
  it("renders the title and subtitle", () => {
    render(<PhotoPileHero title="Experiences" subtitle="Discover adventures" photos={mockPhotos} />);
    expect(screen.getByText("Experiences")).toBeInTheDocument();
    expect(screen.getByText("Discover adventures")).toBeInTheDocument();
  });

  it("renders all photos", () => {
    render(<PhotoPileHero title="Experiences" subtitle="Discover adventures" photos={mockPhotos} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});
