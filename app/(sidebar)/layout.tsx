import { Lilita_One, Montserrat } from "next/font/google";
import { PageLayout } from "@/components/PageLayout";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import "../globals.scss";
import { cvu } from "@/utilities/cvu";
import { type Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const lilita = Lilita_One({
  subsets: ["latin"],
  variable: "--font-lilita",
  weight: "400",
});

export const metadata: Metadata = {
  authors: [{ name: "Lee Mulvey" }],
  description:
    "Get to know Lee Mulvey, a talented Full-stack Engineer from Calgary, Canada. With expertise in JavaScript, TypeScript, React, Node.js, and GraphQL.",
  keywords: [
    "web development",
    "frontend engineering",
    "react",
    "typescript",
    "node.js",
    "javascript",
    "graphql",
    "full stack engineer",
  ],
  metadataBase: new URL("https://leemulvey.com/"),
  openGraph: {
    description:
      "Get to know Lee Mulvey, a talented Full-stack Engineer from Calgary, Canada. With expertise in JavaScript, TypeScript, React, Node.js, and GraphQL.",
    images: [
      {
        alt: "Lee Mulvey - Full-stack Engineer",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "en_CA",
    siteName: "leemulvey.com",
    title: "Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
    type: "website",
    url: "https://leemulvey.com/",
  },
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: "Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
    template: "%s | Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@lmulvey",
    description:
      "Get to know Lee Mulvey, a talented Full-stack Engineer from Calgary, Canada. With expertise in JavaScript, TypeScript, React, Node.js, and GraphQL.",
    images: ["/twitter-image"],
    title: "Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClasses = cvu([
    "text-foreground-muted",
    montserrat.variable,
    lilita.variable,
    "font-sans",
    "w-full",
    "layout--container",
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={bodyClasses()}>
        <ThemeProvider>
          <PageLayout>{children}</PageLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
