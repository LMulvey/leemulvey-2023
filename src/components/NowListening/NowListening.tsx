"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, X } from "lucide-react";
import { type NowPlaying } from "@/utilities/lastfm";
import "./NowListening.scss";

const POLL_INTERVAL_MS = 25_000;
const COLLAPSE_STORAGE_KEY = "now-listening-collapsed";

const EqIcon = ({
  playing,
  className = "",
}: {
  playing: boolean;
  className?: string;
}) => (
  <div
    className={`now-listening-eq ${
      playing ? "now-listening-eq--playing" : ""
    } ${className}`}
  >
    <span className="now-listening-eq-bar" />
    <span className="now-listening-eq-bar" />
    <span className="now-listening-eq-bar" />
    <span className="now-listening-eq-bar" />
  </div>
);

const MarqueeText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const checkOverflow = () => {
      const container = containerRef.current;
      const measure = measureRef.current;

      if (!container || !measure || prefersReducedMotion) {
        return;
      }

      setIsOverflowing(measure.scrollWidth > container.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);

  return (
    <div ref={containerRef} className={`now-listening-marquee ${className}`}>
      <span ref={measureRef} className="now-listening-marquee-measure">
        {text}
      </span>
      {isOverflowing ? (
        <div className="now-listening-marquee-track">
          <span className="now-listening-marquee-text">{text}</span>
          <span className="now-listening-marquee-text" aria-hidden="true">
            {text}
          </span>
        </div>
      ) : (
        <span className="block truncate">{text}</span>
      )}
    </div>
  );
};

export const NowListening = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [open, setOpen] = useState(true);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(COLLAPSE_STORAGE_KEY);

    if (stored === "1") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const response = await fetch("/api/now-playing", {
          signal: controller.signal,
        });
        const data = (await response.json()) as NowPlaying;

        setNowPlaying(data);
      } catch {
        if (!controller.signal.aborted) {
          setNowPlaying({ playing: false });
        }
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      controllerRef.current?.abort();
    };
  }, []);

  if (nowPlaying === null || !nowPlaying.playing) {
    return null;
  }

  const isPlaying = nowPlaying.playing;

  const toggleOpen = () => {
    const next = !open;

    setOpen(next);
    window.sessionStorage.setItem(COLLAPSE_STORAGE_KEY, next ? "0" : "1");
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={toggleOpen}
        aria-label="Show now playing"
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-card border border-border-muted shadow-lg text-highlight/80 hover:text-foreground transition-colors"
      >
        <EqIcon playing={isPlaying} />
      </button>
    );
  }

  const albumArt = isPlaying ? nowPlaying.albumArt : null;

  return (
    <div className="fixed bottom-2 md:bottom-32 right-2 z-50 w-[min(324px,calc(100vw-2.5rem))] rounded-xl bg-card border border-border-muted shadow-lg p-3 animate-in fade-in-0">
      <p className="text-xs m-0 mb-2">Lee is currently listening to:</p>
      <div className="flex items-center gap-3">
        {albumArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={albumArt}
            alt={`${nowPlaying.playing ? nowPlaying.album : ""} cover`}
            className="w-12 h-12 rounded-lg object-cover border border-border-muted/60 shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg bg-card-elevated/70 border border-border-muted/60 shrink-0 flex items-center justify-center">
            <Music2 size={18} className="text-foreground-muted/50" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <a
            href="https://last.fm/user/leemulvey"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline"
          >
            <div className="flex items-center gap-1.5">
              <EqIcon playing className="text-highlight/80 shrink-0" />
              <MarqueeText
                text={nowPlaying.track}
                className="text-sm font-semibold text-foreground min-w-0"
              />
            </div>
            <MarqueeText
              text={`${nowPlaying.artist} — ${nowPlaying.album}`}
              className="text-xs text-foreground-muted mt-0.5"
            />
          </a>
        </div>

        <button
          type="button"
          onClick={toggleOpen}
          aria-label="Hide now playing"
          className="shrink-0 self-start p-1 rounded-md text-foreground-muted/60 hover:text-foreground transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
