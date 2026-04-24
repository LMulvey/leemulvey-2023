"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { Footer } from "../Footer";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Sidebar />
      <div className="relative flex-1 pb-[136px] pt-20 md:pt-6">
        <div className="w-full max-w-[1520px] mx-auto px-4 md:px-8 lg:px-10 xl:px-12 pb-24">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
};
