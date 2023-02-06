import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid gap-24 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto my-12">
      <Sidebar />
      {children}
    </main>
  );
};
