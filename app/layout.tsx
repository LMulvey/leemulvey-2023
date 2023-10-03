import { Lilita_One, Montserrat } from "next/font/google";
import { PageLayout } from "@/src/components/PageLayout";
import "./globals.scss";
import { cvu } from "@/src/utilities/cvu";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const lilita = Lilita_One({
  subsets: ["latin"],
  variable: "--font-lilita",
  weight: "400",
});

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
