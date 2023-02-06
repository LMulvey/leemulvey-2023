import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid gap-4 grid-cols-2 max-w-2xl mx-auto my-[144px]">
      <Sidebar />
      {children}
    </div>
  );
};
