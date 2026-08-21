import {
  Server,
  routePartykitRequest,
  type Connection,
  type WSMessage,
} from "partyserver";

const RATE_LIMIT_MS = 3_000;
const MAX_MESSAGE_LENGTH = 140;
const MESSAGE_TTL_MS = 120_000;

const BADWORDS_LIST_URL =
  "https://cdn.jsdelivr.net/npm/badwords-list@2.0.1-4/dist/array.min.js";
const FALLBACK_BLOCKED_WORDS = ["fuck", "shit", "bitch"];

const URL_PATTERN = /(https?:\/\/|www\.)\S+/i;

type ConnectionState = {
  lastMessageAt: number;
};

interface Env {
  Main: DurableObjectNamespace<CursorChatServer>;
}

function buildBlockedWordsPattern(words: string[]) {
  const escaped = words
    .filter((word) => word.length > 0)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  return new RegExp(`\\b(?:${escaped.join("|")})\\b`, "i");
}

const FALLBACK_PATTERN = buildBlockedWordsPattern(FALLBACK_BLOCKED_WORDS);
let blockedWordsPatternPromise: Promise<RegExp> | null = null;

function loadBlockedWordsPattern(): Promise<RegExp> {
  if (!blockedWordsPatternPromise) {
    blockedWordsPatternPromise = fetch(BADWORDS_LIST_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unexpected status ${response.status}`);
        }

        return response.text();
      })
      .then((source) => {
        const match = source.match(/=(\[[\s\S]*\]);/);

        if (!match) {
          throw new Error("Could not find word array in badwords-list bundle");
        }

        const words = JSON.parse(match[1]);

        if (!Array.isArray(words)) {
          throw new Error("Parsed badwords-list content was not an array");
        }

        return buildBlockedWordsPattern(
          words.filter((word): word is string => typeof word === "string"),
        );
      })
      .catch(() => FALLBACK_PATTERN);
  }

  return blockedWordsPatternPromise;
}

function containsBlockedContent(text: string, blockedWordsPattern: RegExp) {
  return URL_PATTERN.test(text) || blockedWordsPattern.test(text);
}

function clampCoordinate(value: unknown) {
  const num = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(num)) {
    return 0;
  }

  return Math.min(100, Math.max(0, num));
}

function broadcastPresence(server: CursorChatServer) {
  const count = Array.from(server.getConnections()).length;

  server.broadcast(JSON.stringify({ count, type: "presence" }));
}

export class CursorChatServer extends Server<Env> {
  onStart() {
    void loadBlockedWordsPattern();
  }

  onConnect(connection: Connection) {
    connection.setState({ lastMessageAt: 0 } satisfies ConnectionState);
    broadcastPresence(this);
  }

  onClose() {
    broadcastPresence(this);
  }

  onError() {
    broadcastPresence(this);
  }

  async onMessage(sender: Connection, message: WSMessage) {
    if (typeof message !== "string") {
      return;
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(message);
    } catch {
      return;
    }

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      (parsed as { type?: unknown }).type !== "chat"
    ) {
      return;
    }

    const payload = parsed as { text?: unknown; x?: unknown; y?: unknown };
    const text = typeof payload.text === "string" ? payload.text.trim() : "";
    const blockedWordsPattern = await loadBlockedWordsPattern();

    const state = (sender.state as ConnectionState | null) ?? {
      lastMessageAt: 0,
    };
    const now = Date.now();

    if (now - state.lastMessageAt < RATE_LIMIT_MS) {
      sender.send(JSON.stringify({ reason: "slow-down", type: "rejected" }));
      return;
    }

    if (!text || text.length > MAX_MESSAGE_LENGTH) {
      sender.send(
        JSON.stringify({ reason: "invalid-length", type: "rejected" }),
      );
      return;
    }

    if (containsBlockedContent(text, blockedWordsPattern)) {
      sender.send(
        JSON.stringify({ reason: "blocked-content", type: "rejected" }),
      );
      return;
    }

    sender.setState({ lastMessageAt: now } satisfies ConnectionState);

    this.broadcast(
      JSON.stringify({
        connectionId: sender.id,
        expiresAt: now + MESSAGE_TTL_MS,
        text,
        type: "message",
        x: clampCoordinate(payload.x),
        y: clampCoordinate(payload.y),
      }),
    );
  }
}

const worker = {
  async fetch(request: Request, env: Env) {
    return (
      (await routePartykitRequest(request, env)) ??
      new Response("Not found", { status: 404 })
    );
  },
};

export default worker;
