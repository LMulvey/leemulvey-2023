"use client";

import { useEffect, useRef, useState } from "react";
import { useCursorChat } from "./CursorChatProvider";

const MAX_MESSAGE_LENGTH = 140;
const NUDGE_DELAY_MS = 6_000;
const NUDGE_STORAGE_KEY = "cursor-chat-nudge-shown";

const REJECTION_COPY: Record<string, string> = {
  "blocked-content": "That message got blocked.",
  "invalid-length": "Message too long (or empty).",
  "slow-down": "Slow down a little.",
};

type ComposeState = {
  x: number;
  y: number;
  value: string;
};

function clampPercent(value: number) {
  return Math.min(92, Math.max(8, value));
}

function isEditableElement(element: Element | null) {
  if (!element) {
    return false;
  }

  const tag = element.tagName.toLowerCase();

  return (
    tag === "input" ||
    tag === "textarea" ||
    element.getAttribute("contenteditable") === "true"
  );
}

export const CursorChatOverlay = () => {
  const { messages, sendMessage, lastRejection, visitorCount } =
    useCursorChat();
  const [compose, setCompose] = useState<ComposeState | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const pointerRef = useRef({ x: 50, y: 50 });
  const composeRef = useRef(compose);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitorCountRef = useRef(visitorCount);

  visitorCountRef.current = visitorCount;
  composeRef.current = compose;

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      pointerRef.current = { x, y };

      if (composeRef.current) {
        const clampedX = clampPercent(x);
        const clampedY = clampPercent(y);

        setCompose((prev) =>
          prev ? { ...prev, x: clampedX, y: clampedY } : prev,
        );
      }
    };

    window.addEventListener("pointermove", onPointerMove);

    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      if (isEditableElement(document.activeElement)) {
        return;
      }

      if (compose) {
        return;
      }

      event.preventDefault();
      setShowNudge(false);
      setCompose({
        value: "",
        x: clampPercent(pointerRef.current.x),
        y: clampPercent(pointerRef.current.y),
      });
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [compose]);

  useEffect(() => {
    if (compose) {
      inputRef.current?.focus();
    }
  }, [compose]);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!hasFinePointer) {
      return;
    }

    if (window.sessionStorage.getItem(NUDGE_STORAGE_KEY) === "1") {
      return;
    }

    const timer = setTimeout(() => {
      if ((visitorCountRef.current ?? 0) > 1) {
        setShowNudge(true);
        window.sessionStorage.setItem(NUDGE_STORAGE_KEY, "1");
        setTimeout(() => setShowNudge(false), 6_000);
      }
    }, NUDGE_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const closeCompose = () => setCompose(null);

  const submitCompose = () => {
    if (!compose) {
      return;
    }

    const text = compose.value.trim();

    if (text) {
      sendMessage(text, compose.x, compose.y);
    }

    closeCompose();
  };

  return (
    <>
      {Object.entries(messages).map(([connectionId, message]) => (
        <div
          key={connectionId}
          className="fixed z-[60] pointer-events-none -translate-x-1/2 -translate-y-full rounded-xl bg-card border border-border-muted shadow-lg px-3 py-1.5 text-sm text-foreground max-w-[240px] animate-in fade-in-0"
          style={{ left: `${message.x}%`, top: `${message.y}%` }}
        >
          {message.text}
        </div>
      ))}

      {compose ? (
        <div
          className="fixed z-[60] -translate-x-1/2 -translate-y-full"
          style={{ left: `${compose.x}%`, top: `${compose.y}%` }}
        >
          <input
            ref={inputRef}
            type="text"
            value={compose.value}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="Say something…"
            onChange={(event) =>
              setCompose((prev) =>
                prev ? { ...prev, value: event.target.value } : prev,
              )
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitCompose();
              }

              if (event.key === "Escape") {
                closeCompose();
              }
            }}
            onBlur={closeCompose}
            className="rounded-xl bg-card border border-border-muted shadow-lg px-3 py-1.5 text-sm text-foreground outline-none w-56"
          />
        </div>
      ) : null}

      {showNudge ? (
        <div className="fixed bottom-5 left-5 z-50 rounded-xl bg-card border border-border-muted shadow-lg px-4 py-3 text-sm text-foreground-muted max-w-[240px] animate-in fade-in-0">
          Psst — press <span className="font-semibold text-foreground">/</span>{" "}
          to chat with whoever else is here.
        </div>
      ) : null}

      {lastRejection ? (
        <div className="fixed bottom-5 left-5 z-50 rounded-xl bg-card border border-border-muted shadow-lg px-4 py-3 text-sm text-foreground-muted animate-in fade-in-0">
          {REJECTION_COPY[lastRejection] ?? "Message not sent."}
        </div>
      ) : null}
    </>
  );
};
