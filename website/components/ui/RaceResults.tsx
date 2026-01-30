"use client";

import { useState } from "react";
import Image from "next/image";

interface RaceResult {
  year: string;
  event: string;
  type: string;  // Activity type: Mountain Biking, Road Cycling, Trail Running, Road Running
  result: string;
  certificateImage?: string;
}

interface RaceResultsProps {
  results: RaceResult[];
  itraLink?: string;
  initialVisible?: number;
}

export default function RaceResults({
  results,
  itraLink = "https://itra.run/RunnerSpace/Atul.Chauhan",
  initialVisible = 5,
}: RaceResultsProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const visibleResults = showAll ? results : results.slice(0, initialVisible);
  const hasMore = results.length > initialVisible;

  return (
    <div className="race-results">
      {/* Race Table */}
      <div className="race-table overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--color-gray-100)]">
              <th className="text-left p-4 font-semibold text-[var(--color-charcoal)] text-sm uppercase tracking-wider">Year</th>
              <th className="text-left p-4 font-semibold text-[var(--color-charcoal)] text-sm uppercase tracking-wider">Event</th>
              <th className="text-left p-4 font-semibold text-[var(--color-charcoal)] text-sm uppercase tracking-wider hidden md:table-cell">Type</th>
              <th className="text-left p-4 font-semibold text-[var(--color-charcoal)] text-sm uppercase tracking-wider">Result</th>
              <th className="text-center p-4 font-semibold text-[var(--color-charcoal)] text-sm uppercase tracking-wider hidden sm:table-cell">Cert</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((race, index) => (
              <tr
                key={index}
                className="border-b border-[var(--color-gray-200)] hover:bg-[var(--color-gray-50)] transition-colors"
              >
                <td className="p-4 text-[var(--color-slate-dark)] font-medium">{race.year}</td>
                <td className="p-4 text-[var(--color-slate-dark)]">{race.event}</td>
                <td className="p-4 text-[var(--color-slate)] hidden md:table-cell">{race.type}</td>
                {/* Result - per prototype: .race-result with font-heading, gold=#D97706, silver=#6B7280, bronze=#B45309 */}
                <td className="p-4">
                  <span className={`font-[family-name:var(--font-heading)] ${
                    race.result.includes("🥇") ? "text-[#D97706]"
                      : race.result.includes("🥈") ? "text-[#6B7280]"
                      : race.result.includes("🥉") ? "text-[#B45309]"
                      : ""
                  }`}>
                    {race.result}
                  </span>
                </td>
                <td className="p-4 text-center hidden sm:table-cell">
                  {race.certificateImage ? (
                    <button
                      onClick={() => setSelectedCert(race.certificateImage || null)}
                      className="cert-thumb inline-block w-10 h-10 rounded overflow-hidden border-2 border-[var(--color-gray-200)] hover:border-[var(--color-amber)] transition-colors cursor-pointer"
                    >
                      <Image
                        src={race.certificateImage}
                        alt={`${race.event} certificate`}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ) : (
                    <span className="text-[var(--color-slate-light)] text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View More / Show Less Button - per prototype: bg forest, white text, no border */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="view-more-btn inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-forest)] text-white border-none rounded-md text-[14px] font-medium cursor-pointer transition-colors hover:bg-[var(--color-forest-dark)]"
          >
            {showAll ? "Show Less" : "View More Races"}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {!showAll && (
            <p className="mt-2 text-sm text-[var(--color-slate)]">
              Showing {visibleResults.length} of {results.length} races
            </p>
          )}
        </div>
      )}

      {/* ITRA Link - per prototype: amber color, font-weight 500, arrow only */}
      <p className="mt-6 text-center">
        <a
          href={itraLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-amber)', fontWeight: 500 }}
          className="hover:opacity-80 transition-opacity"
        >
          View full race history on ITRA →
        </a>
      </p>

      {/* Certificate Lightbox */}
      {selectedCert && (
        <div
          className="lightbox fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedCert(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[var(--color-amber)] transition-colors"
            onClick={() => setSelectedCert(null)}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedCert}
              alt="Race certificate"
              width={800}
              height={600}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
