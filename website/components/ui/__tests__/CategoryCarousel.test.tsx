import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryCarousel from "../CategoryCarousel";

const mockCategories = [
  {
    title: "Mountain Biking",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&q=80",
    href: "/experiences?category=mtb",
  },
  {
    title: "Road Cycling",
    image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=400&q=80",
    href: "/experiences?category=road",
  },
  {
    title: "Trail Running",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    href: "/experiences?category=trail",
  },
];

describe("CategoryCarousel", () => {
  it("renders all category cards", () => {
    render(<CategoryCarousel categories={mockCategories} />);

    expect(screen.getByText("Mountain Biking")).toBeInTheDocument();
    expect(screen.getByText("Road Cycling")).toBeInTheDocument();
    expect(screen.getByText("Trail Running")).toBeInTheDocument();
  });

  it("renders navigation arrows", () => {
    render(<CategoryCarousel categories={mockCategories} />);

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("renders dot indicators", () => {
    render(<CategoryCarousel categories={mockCategories} />);

    const dots = screen.getAllByRole("button", { name: /go to page/i });
    expect(dots.length).toBeGreaterThan(0);
  });

  it("renders category images", () => {
    render(<CategoryCarousel categories={mockCategories} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
  });

  it("renders category links with correct hrefs", () => {
    render(<CategoryCarousel categories={mockCategories} />);

    const mtbLink = screen.getByRole("link", { name: /mountain biking/i });
    expect(mtbLink).toHaveAttribute("href", "/experiences?category=mtb");
  });
});
