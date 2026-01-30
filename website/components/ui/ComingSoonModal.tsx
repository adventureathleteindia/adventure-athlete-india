"use client";

import { useEffect } from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "experience" | "audio";
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  title = "Coming Soon",
  message = "This content is being prepared and will be available shortly.",
  type = "experience",
}: ComingSoonModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const icons = {
    experience: (
      <svg className="w-16 h-16 text-[var(--color-amber)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    audio: (
      <svg className="w-16 h-16 text-[var(--color-amber)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        style={{ animation: "modalSlideIn 0.3s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center">
            {icons[type]}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-[family-name:var(--font-heading)] text-2xl mb-3 text-[var(--color-charcoal)]"
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-[var(--color-slate-dark)] mb-6 leading-relaxed">
          {message}
        </p>

        {/* Action button */}
        <button
          onClick={onClose}
          style={{
            display: "inline-block",
            padding: "12px 32px",
            backgroundColor: "#D97706",
            color: "white",
            fontFamily: "var(--font-heading)",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Got It
        </button>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
