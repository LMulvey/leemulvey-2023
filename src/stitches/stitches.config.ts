import { createStitches } from "@stitches/react";
import { colors } from "./colors";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    space: {
      small: "4px",
      medium: "8px",
      large: "16px",
    },
  },
  media: {
    initial: "(min-width: 0px)",
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1440px)",
  },
});
