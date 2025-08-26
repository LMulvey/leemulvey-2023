"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { cvu } from "@/utilities/cvu";
import { Footer } from "../Footer";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const mainClasses = cvu([
    "grid",
    "grid-cols-1",
    "md:grid-cols-[324px_auto]",
    "min-h-screen",
  ]);

  return (
    <main className={mainClasses()}>
      <Sidebar />
      <div className="overflow-y-scroll mt-24 md:mt-16 md:pr-16 relative pb-[136px]">
        <div className="px-8 pb-24">{children}</div>
        <Footer />
      </div>
    </main>
  );
};
