"use client";

import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Loader,
  Loader2,
  LoaderIcon,
  Music2,
} from "lucide-react";
import { type NowPlaying } from "@/utilities/lastfm";
import "./NowListening.scss";

const POLL_INTERVAL_MS = 25_000;

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setIsLoading(true);
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
          setNowPlaying(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      controllerRef.current?.abort();
    };
  }, [setIsLoading]);

  if (nowPlaying === null) {
    return isLoading ? (
      <div className="animate-pulse">
        <Loader2 className="animate-spin fade-in-0" />
      </div>
    ) : null;
  }

  return (
    <div className="w-full rounded-xl bg-card border border-border-muted shadow-lg p-3 animate-in fade-in-0">
      <p className="text-xs m-0 mb-2">
        {nowPlaying.playing
          ? "Lee is currently listening to"
          : "Lee was last listening to"}
      </p>
      <div className="flex items-center gap-3">
        {nowPlaying.albumArt ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={nowPlaying.albumArt}
            alt={`${nowPlaying.album} cover`}
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
              {nowPlaying.playing ? (
                <EqIcon playing className="text-highlight/80 shrink-0" />
              ) : null}
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
      </div>
    </div>
  );
};
