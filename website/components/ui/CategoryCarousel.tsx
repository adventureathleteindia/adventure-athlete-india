"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  title: string;
  image: string;
  href: string;
}

interface CategoryCarouselProps {
  categories: Category[];
}

// Arrow icons
const ChevronLeft = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative">
      {/* Previous Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous categories"
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <ChevronLeft />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="flex-none w-[calc(33.333%-16px)] group"
            >
              {/* From prototype: route-card-image with style="aspect-ratio: 1;" and margin-bottom: 20px */}
              <div className="relative aspect-square overflow-hidden mb-5">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              {/* From prototype: route-card-title with font-size: 18px and font-family: var(--font-heading) */}
              <h3 className="font-[family-name:var(--font-heading)] text-[18px] text-[var(--color-dark)]">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next categories"
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPage
                ? "bg-[var(--color-forest)]"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
