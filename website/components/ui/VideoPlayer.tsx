"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  thumbnailSrc: string;
  videoSrc?: string;
  youtubeId?: string;
  title?: string;
}

export default function VideoPlayer({
  thumbnailSrc,
  videoSrc,
  youtubeId,
  title = "Watch the journey",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`
    : videoSrc;

  const handlePlay = () => {
    if (embedUrl) {
      setIsPlaying(true);
    }
  };

  if (isPlaying && embedUrl) {
    return (
      <div>
        <div className="video-container relative w-full aspect-video rounded-xl overflow-hidden my-8">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {youtubeId && (
          <div className="text-center mt-2 mb-8">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-slate)', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch on YouTube &middot; More videos on our channel
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="video-container relative w-full aspect-video rounded-xl overflow-hidden my-8 group cursor-pointer" onClick={handlePlay}>
        {/* Thumbnail */}
        <Image
          src={thumbnailSrc}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

        {/* Play button - YouTube style */}
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[56px] bg-[#FF0000] rounded-[12px] flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#cc0000] shadow-lg z-10"
          aria-label="Play video"
        >
          <svg
            className="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        {/* Video title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white font-medium text-lg">{title}</p>
        </div>
      </div>
      {youtubeId && (
        <div className="text-center mt-2 mb-4">
          <a
            href={`https://www.youtube.com/watch?v=${youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-slate)', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Watch on YouTube &middot; More videos on our channel
          </a>
        </div>
      )}
    </div>
  );
}
