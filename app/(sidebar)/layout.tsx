import { Lilita_One, Montserrat } from "next/font/google";
import { PageLayout } from "@/components/PageLayout";
import "../globals.scss";
import { cvu } from "@/utilities/cvu";
import { Metadata } from "next";

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
    images: ["/opengraph-image.png"],
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
    "text-dark-green",
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
        <footer className="font-sans text-sm p-8 bg-gradient-to-b to-gray-600/30 from-transparent w-screen -ml-4">
          <p>
            <u>
              Built with love by Lee Mulvey in {new Date().getFullYear()} and
              then <em>probably lovingly ignored</em>
            </u>
          </p>
          <p className="mt-0">
            Sorry. For the most up-to-date work, check my{" "}
            <a
              className="underline"
              href="https://github.com/lmulvey"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>{" "}
            or don&apos;t hesitate to get in touch ❤️
          </p>
        </footer>
      </body>
    </html>
  );
}
