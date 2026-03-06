/** @type {import('tailwindcss').Config} */
const withOpacity = (cssVariable) => `rgb(var(${cssVariable}) / <alpha-value>)`;

module.exports = {
  content: ["app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        accent: withOpacity("--color-accent"),
        "accent-foreground": withOpacity("--color-accent-foreground"),
        background: withOpacity("--color-background"),
        "background-elevated": withOpacity("--color-background-elevated"),
        border: withOpacity("--color-border"),
        "border-muted": withOpacity("--color-border-muted"),
        card: withOpacity("--color-card"),
        "card-elevated": withOpacity("--color-card-elevated"),
        foreground: withOpacity("--color-foreground"),
        "foreground-muted": withOpacity("--color-foreground-muted"),
        "foreground-strong": withOpacity("--color-foreground-strong"),
        highlight: withOpacity("--color-highlight"),
        link: withOpacity("--color-link"),
        "link-hover": withOpacity("--color-link-hover"),
        overlay: withOpacity("--color-overlay"),
      },
      fontFamily: {
        heading: ["var(--heading-font)"],
        sans: ["var(--body-font)"],
      },
      typography: ({ theme }) => ({
        green: {
          css: {
            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-bold": theme("colors.foreground-strong"),
            "--tw-prose-bullets": theme("colors.foreground-muted"),
            "--tw-prose-captions": theme("colors.foreground-muted"),
            "--tw-prose-code": theme("colors.foreground-strong"),
            "--tw-prose-counters": theme("colors.foreground-muted"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-hr": theme("colors.border"),
            "--tw-prose-invert-body": theme("colors.foreground"),
            "--tw-prose-invert-lead": theme("colors.foreground-muted"),
            "--tw-prose-invert-links": theme("colors.link"),
            "--tw-prose-invert-pre-bg": theme("colors.card-elevated"),
            "--tw-prose-invert-pre-code": theme("colors.foreground"),
            "--tw-prose-invert-quote-borders": theme("colors.border"),
            "--tw-prose-invert-quotes": theme("colors.foreground"),
            "--tw-prose-invert-td-borders": theme("colors.border-muted"),
            "--tw-prose-invert-th-borders": theme("colors.border"),
            "--tw-prose-lead": theme("colors.foreground-muted"),
            "--tw-prose-links": theme("colors.link"),
            "--tw-prose-pre-bg": theme("colors.card-elevated"),
            "--tw-prose-pre-code": theme("colors.foreground"),
            "--tw-prose-quote-borders": theme("colors.border"),
            "--tw-prose-quotes": theme("colors.foreground"),
            "--tw-prose-td-borders": theme("colors.border-muted"),
            "--tw-prose-th-borders": theme("colors.border"),
          },
        },
      }),
    },
  },
};
