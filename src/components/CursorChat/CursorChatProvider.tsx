"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePartySocket } from "partysocket/react";

const ROOM_ID = "site";

export type CursorChatMessage = {
  text: string;
  x: number;
  y: number;
  expiresAt: number;
};

export type CursorChatRejectionReason =
  | "slow-down"
  | "invalid-length"
  | "blocked-content";

type CursorChatContextValue = {
  visitorCount: number | null;
  messages: Record<string, CursorChatMessage>;
  sendMessage: (text: string, x: number, y: number) => void;
  lastRejection: CursorChatRejectionReason | null;
};

const CursorChatContext = createContext<CursorChatContextValue | null>(null);

export const useCursorChat = () => {
  const context = useContext(CursorChatContext);

  if (!context) {
    throw new Error("useCursorChat must be used within a CursorChatProvider");
  }

  return context;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export const CursorChatProvider = ({ children }: { children: ReactNode }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [messages, setMessages] = useState<
    Record<string, CursorChatMessage>
  >({});
  const [lastRejection, setLastRejection] =
    useState<CursorChatRejectionReason | null>(null);
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? "127.0.0.1:1999",
    onMessage(event) {
      let data: unknown;

      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (!isRecord(data)) {
        return;
      }

      if (data.type === "presence" && typeof data.count === "number") {
        setVisitorCount(data.count);
        return;
      }

      if (
        data.type === "message" &&
        typeof data.connectionId === "string" &&
        typeof data.text === "string" &&
        typeof data.x === "number" &&
        typeof data.y === "number" &&
        typeof data.expiresAt === "number"
      ) {
        const { connectionId, text, x, y, expiresAt } = data as {
          connectionId: string;
          text: string;
          x: number;
          y: number;
          expiresAt: number;
        };

        setMessages((prev) => ({
          ...prev,
          [connectionId]: { expiresAt, text, x, y },
        }));

        const existingTimer = timersRef.current[connectionId];

        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        timersRef.current[connectionId] = setTimeout(() => {
          setMessages((prev) => {
            const next = { ...prev };

            delete next[connectionId];

            return next;
          });
          delete timersRef.current[connectionId];
        }, Math.max(0, expiresAt - Date.now()));

        return;
      }

      if (data.type === "rejected" && typeof data.reason === "string") {
        setLastRejection(data.reason as CursorChatRejectionReason);
        setTimeout(() => setLastRejection(null), 3_000);
      }
    },
    room: ROOM_ID,
  });

  useEffect(() => {
    const timers = timersRef.current;

    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const sendMessage = (text: string, x: number, y: number) => {
    socket.send(JSON.stringify({ text, type: "chat", x, y }));
  };

  return (
    <CursorChatContext.Provider
      value={{ lastRejection, messages, sendMessage, visitorCount }}
    >
      {children}
    </CursorChatContext.Provider>
  );
};
