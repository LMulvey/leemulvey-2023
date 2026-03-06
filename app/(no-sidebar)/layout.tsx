import "../globals.scss";
import { cvu } from "@/utilities/cvu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyClasses = cvu([
    "text-foreground-muted",
    "font-sans",
    "max-w-7xl",
    "mx-auto",
    "my-32",
    "layout--container",
  ]);

  return (
    <html lang="en">
      <head />
      <body className={bodyClasses()}>{children}</body>
    </html>
  );
}
