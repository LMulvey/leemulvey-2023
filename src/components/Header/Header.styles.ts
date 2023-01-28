import { styled, theme } from "@/src/stitches";

export const Wordmark = styled("h1", {
  display: "inline-block",
  fontSize: "5rem",
  textAlign: "center",
  textShadow: "-5px -5px 0px white",
  marginTop: "0",
  backgroundColor: "#1a2a6c",
  background: `linear-gradient(to right, ${theme.colors.orange}, #b21f1f, #4f424c)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  border: "0",
  padding: "20px 5px",
  "@media (max-width: 525px)": { fontSize: "3.5rem" },
});
