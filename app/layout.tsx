import { Montserrat } from "next/font/google";
import { PageLayout } from "@/src/components/PageLayout";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`bg-darkBlue text-darkGreen font-sans ${montserrat.className}`}
      >
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
