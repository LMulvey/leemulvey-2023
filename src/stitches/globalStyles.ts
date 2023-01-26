import { globalCss, theme } from "./stitches.config";

export const globalStyles = globalCss({
  "html, body": {
    backgroundColor: theme.colors.darkBlue,
    color: theme.colors.darkGreen,
    padding: "$large",
    fontFamily: "Inter, sans-serif",
    fontSize: "18px",
    lineHeight: 1.25,
  },
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
});
