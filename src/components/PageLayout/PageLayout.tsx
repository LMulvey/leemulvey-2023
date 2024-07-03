"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { cvu } from "@/utilities/cvu";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const mainClasses = cvu([
    "grid",
    "gap-12",
    "grid-cols-1",
    "md:grid-cols-[324px_auto]",
  ]);

  return (
    <main className={mainClasses()}>
      <Sidebar />
      {children}
    </main>
  );
};
