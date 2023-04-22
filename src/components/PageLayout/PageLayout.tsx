import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid gap-12 grid-cols-1 md:grid-cols-[324px_1fr] max-w-4xl mx-auto my-12">
      <Sidebar />
      {children}
    </main>
  );
};
