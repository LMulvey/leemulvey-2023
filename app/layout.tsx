import { PageLayout } from "@/src/components/PageLayout";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-darkBlue text-darkGreen font-sans">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
