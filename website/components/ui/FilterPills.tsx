"use client";

interface Category {
  label: string;
  value: string;
}

interface FilterPillsProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterPills({ categories, activeFilter, onFilterChange }: FilterPillsProps) {
  // Per prototype styles.css:
  // .filter-pills { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; }
  // .filter-pill { padding: 8px 16px; font-size: 14px; border-radius: 999px; }
  return (
    <div className="flex flex-wrap gap-[12px]">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onFilterChange(category.value)}
          className={`px-[16px] py-[8px] rounded-full text-[14px] transition-all cursor-pointer border-none ${
            activeFilter === category.value
              ? "bg-[var(--color-forest)] text-white"
              : "bg-[var(--color-gray-100)] text-[var(--color-slate)] hover:bg-[var(--color-gray-200)]"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
