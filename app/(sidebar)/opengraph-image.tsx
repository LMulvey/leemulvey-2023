import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lee Mulvey - Full-stack Engineer";
export const size = {
  height: 630,
  width: 1200,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  const wordmarkSrc = "https://leemulvey.com/logo-leemulvey.svg";
  const profileSrc = "https://leemulvey.com/lee.webp";

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(circle at 12% 18%, #213b3d 0%, #121b1d 48%, #090d0f 100%)",
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
              "linear-gradient(140deg, rgba(31, 56, 58, 0.6), rgba(15, 20, 22, 0.72))",
            border: "1px solid rgba(148, 209, 212, 0.24)",
            borderRadius: 30,
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            padding: "36px 38px",
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
            <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
              <img
                src={wordmarkSrc}
                alt="Lee Mulvey wordmark"
                style={{ display: "flex", height: 72, width: 184 }}
              />
              <div
                style={{
                  background: "rgba(149, 174, 176, 0.2)",
                  border: "1px solid rgba(149, 174, 176, 0.35)",
                  borderRadius: 999,
                  color: "#b9d8da",
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: 0.8,
                  padding: "8px 14px",
                  textTransform: "uppercase",
                }}
              >
                leemulvey.com
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 18,
              }}
            >
              <div
                style={{
                  color: "#f1fafb",
                  display: "flex",
                  fontSize: 62,
                  fontWeight: 800,
                  letterSpacing: -1.6,
                  lineHeight: 1.02,
                }}
              >
                Lee Mulvey
              </div>
              <div
                style={{
                  color: "#b8d8da",
                  display: "flex",
                  fontSize: 30,
                  fontWeight: 500,
                  letterSpacing: -0.2,
                  lineHeight: 1.24,
                  maxWidth: 660,
                }}
              >
                Full-stack engineer building thoughtful products and shipping
                polished web experiences.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 22,
              }}
            >
              {["TypeScript", "React", "Next.js", "Node.js", "Web3"].map(
                (label) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(149, 174, 176, 0.16)",
                      border: "1px solid rgba(149, 174, 176, 0.35)",
                      borderRadius: 999,
                      color: "#d6ecee",
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
                  "linear-gradient(165deg, rgba(149, 174, 176, 0.32), rgba(22, 32, 34, 0.5))",
                border: "1px solid rgba(149, 174, 176, 0.34)",
                borderRadius: 26,
                display: "flex",
                padding: 12,
              }}
            >
              <img
                src={profileSrc}
                alt="Lee Mulvey"
                style={{
                  border: "1px solid rgba(149, 174, 176, 0.34)",
                  borderRadius: 18,
                  display: "flex",
                  height: 320,
                  objectFit: "cover",
                  objectPosition: "center",
                  width: 260,
                }}
              />
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              bottom: 28,
              color: "#9bc4c7",
              display: "flex",
              fontSize: 18,
              fontWeight: 800,
              gap: 10,
              left: 38,
              letterSpacing: 0.5,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                background: "#7dd3d9",
                borderRadius: 999,
                height: 10,
                width: 10,
              }}
            />
            Calgary, Alberta
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
