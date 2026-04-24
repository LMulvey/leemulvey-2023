import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Lee Mulvey - Full-stack Engineer";
export const size = {
  height: 630,
  width: 1200,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const profileBuffer = await readFile(
    path.join(process.cwd(), "public", "lee.png"),
  );
  const profileSrc = `data:image/png;base64,${profileBuffer.toString(
    "base64",
  )}`;
  const wordmarkBuffer = await readFile(
    path.join(process.cwd(), "public", "logo-leemulvey.svg"),
  );
  const wordmarkSrc = `data:image/svg+xml;base64,${wordmarkBuffer.toString(
    "base64",
  )}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(140deg, rgba(18, 18, 18, 1) 0%, rgba(30, 41, 44, 1) 55%, rgba(15, 23, 25, 1) 100%)",
          color: "#e6f4f5",
          display: "flex",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
          height: "100%",
          padding: "48px 54px",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(40, 40, 40, 0.85), rgba(24, 24, 24, 0.75))",
            border: "1px solid rgba(149, 174, 176, 0.3)",
            borderRadius: 28,
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            overflow: "hidden",
            padding: "34px 36px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "68%",
            }}
          >
            <div style={{ alignItems: "center", display: "flex" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wordmarkSrc}
                alt="Lee Mulvey wordmark"
                style={{
                  display: "flex",
                  height: 88,
                  width: 224,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 6,
              }}
            >
              <div
                style={{
                  color: "#b9d8da",
                  display: "flex",
                  fontSize: 36,
                  fontWeight: 500,
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                  maxWidth: 640,
                }}
              >
                Full-stack engineer building thoughtful products and polished
                web experiences.
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                color: "#9bc4c7",
                display: "flex",
                fontSize: 17,
                fontWeight: 700,
                gap: 10,
                letterSpacing: 0.5,
                marginTop: 22,
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  background: "#7dd3d9",
                  borderRadius: 999,
                  height: 9,
                  width: 9,
                }}
              />
              Calgary, Alberta
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 20,
              }}
            >
              {["TypeScript", "React", "Next.js", "Node.js", "Web3"].map(
                (label) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(63, 63, 63, 0.7)",
                      border: "1px solid rgba(149, 174, 176, 0.36)",
                      borderRadius: 999,
                      color: "#d8eef0",
                      display: "flex",
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: 0.2,
                      padding: "8px 14px",
                    }}
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              width: "30%",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(160deg, rgba(99, 136, 137, 0.28), rgba(24, 24, 24, 0.45))",
                border: "1px solid rgba(149, 174, 176, 0.34)",
                borderRadius: 24,
                display: "flex",
                padding: 12,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileSrc}
                alt="Lee Mulvey"
                width={260}
                height={320}
                style={{
                  border: "1px solid rgba(149, 174, 176, 0.34)",
                  borderRadius: 16,
                  display: "flex",
                  height: 320,
                  objectFit: "cover",
                  objectPosition: "center",
                  width: 260,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
