import { Lilita_One, Montserrat } from "next/font/google";
import { PageLayout } from "@/components/PageLayout";
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
  metadataBase: new URL("https://leemulvey.com/"),
  openGraph: {
    description:
      "Get to know Lee Mulvey, a talented Full-stack Engineer from Calgary, Canada. With expertise in JavaScript, TypeScript, React, Node.js, and GraphQL.",
  },
  title: {
    default: "Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
    template: "%s | Lee Mulvey - Full-stack Engineer based in Calgary, Alberta",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClasses = cvu([
    "text-darkGreen",
    montserrat.variable,
    lilita.variable,
    "font-sans",
    "max-w-7xl",
    "mx-auto",
    "my-32",
    "layout--container",
  ]);

  return (
    <html lang="en">
      <head />
      <body className={bodyClasses()}>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
