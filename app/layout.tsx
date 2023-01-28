import { SSRStylesheet } from "@/src/stitches";
import { globalStyles } from "@/src/stitches/globalStyles";
import { Inter } from "@next/font/google";

const font = Inter({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  globalStyles();

  return (
    <html lang="en" className={font.className}>
      <head />
      <body>
        <SSRStylesheet>{children}</SSRStylesheet>
      </body>
    </html>
  );
}
