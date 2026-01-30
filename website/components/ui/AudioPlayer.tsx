"use client";

import { useState, useRef, useEffect } from "react";
import ComingSoonModal from "./ComingSoonModal";

interface AudioPlayerProps {
  title?: string;
  duration?: string;
  description?: string;
  audioSrc?: string;
}

export default function AudioPlayer({
  title = "Audio Story",
  duration = "12 min",
  description = "Route insights, tips & personal commentary",
  audioSrc,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    // If no audio source, show Coming Soon modal
    if (!audioSrc) {
      setShowModal(true);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Generate bar heights matching prototype pattern (20 bars)
  const barHeights = [20, 45, 70, 50, 85, 60, 40, 75, 55, 30, 65, 45, 80, 35, 55, 70, 40, 60, 25, 50];
  const animationDelays = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85];

  return (
    <>
      {/* Per prototype: background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 40px 0; */}
      <div
        className="audio-player rounded-[16px] p-6 my-10 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
      >
        {/* Audio header with badge - per prototype: .audio-header */}
        <div className="flex items-center gap-2 mb-4">
          {/* Audio badge - per prototype: background: rgba(245, 158, 11, 0.15); color: var(--amber); padding: 6px 12px; font-size: 11px */}
          <span
            className="audio-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] text-[11px] font-semibold uppercase tracking-wider"
            style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--color-amber)" }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
            </svg>
            {title}
          </span>
        </div>

        {/* Audio content - play button + waveform - per prototype: gap: 20px */}
        <div className="flex items-center gap-5">
          {/* Play button - per prototype: width: 60px; height: 60px; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4) */}
          <button
            onClick={togglePlay}
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all hover:scale-105 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
              boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)"
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-[26px] h-[26px] text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              // Per prototype: svg has margin-left: 3px
              <svg className="w-[26px] h-[26px] text-white ml-[3px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Waveform visualization - per prototype: gap: 3px; height: 50px */}
          <div className="waveform flex-1 flex items-center gap-[3px] h-[50px] overflow-hidden">
            {barHeights.map((height, index) => (
              // Per prototype: width: 4px; background: linear-gradient(to top, rgba(245,158,11,0.3), rgba(245,158,11,0.8)); border-radius: 2px
              // Animation plays when audio is playing
              <div
                key={index}
                className={`waveform-bar w-[4px] rounded-[2px] ${isPlaying ? "animate-audio-wave" : ""}`}
                style={{
                  height: `${height}%`,
                  background: "linear-gradient(to top, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.8))",
                  animationDelay: isPlaying ? `${animationDelays[index]}s` : "0s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Audio info - per prototype: margin-top: 16px */}
        <div className="mt-4">
          {/* Audio title - per prototype: font-family: var(--font-heading); font-size: 18px; margin-bottom: 4px */}
          <div className="font-[family-name:var(--font-heading)] text-lg mb-1">Trail Notes</div>
          {/* Audio meta - per prototype: font-size: 13px; color: rgba(255,255,255,0.5); gap: 16px */}
          <div className="flex items-center gap-4 text-[13px] text-white/50">
            <span>{audioSrc && isPlaying ? currentTime : duration}</span>
            <span>•</span>
            <span>{description}</span>
          </div>
        </div>

        {/* Hidden audio element */}
        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            className="hidden"
            preload="metadata"
          />
        )}
      </div>

      {/* Coming Soon Modal for when no audio */}
      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Trail Notes Coming Soon"
        message="I'm currently recording the audio story for this route. Check back soon to hear about the trail insights, tips, and personal commentary."
        type="audio"
      />
    </>
  );
}
