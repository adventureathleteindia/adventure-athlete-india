"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  thumbnailSrc: string;
  videoSrc?: string;
  title?: string;
}

export default function VideoPlayer({
  thumbnailSrc,
  videoSrc,
  title = "Watch the journey",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoSrc) {
      setIsPlaying(true);
    }
  };

  if (isPlaying && videoSrc) {
    return (
      <div className="video-container relative w-full aspect-video rounded-xl overflow-hidden my-8">
        <iframe
          src={videoSrc}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
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

      {/* Play button - YouTube style - per prototype: width: 80px; height: 56px; background: #FF0000; border-radius: 12px; hover: #cc0000 */}
      <button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[56px] bg-[#FF0000] rounded-[12px] flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#cc0000] shadow-lg z-10"
        aria-label="Play video"
      >
        {/* Per prototype: svg width: 32px; height: 32px; margin-left: 4px */}
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
  );
}
