"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { motion, Variants } from "framer-motion";
import "./PageLayout.scss";
import { cvu } from "@/src/utilities/cvu";

const animationVariants: Variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      mass: 2,
      stiffness: 40,
      type: "spring",
    },
    y: 0,
  },
  initial: {
    opacity: 0,
    y: -400,
  },
};

export const PageLayout = ({ children }: { children: ReactNode }) => {
  const mainClasses = cvu([
    "grid",
    "gap-12",
    "grid-cols-1",
    "md:grid-cols-[324px_auto]",
    "max-w-7xl",
    "mx-auto",
    "my-32",
    "layout--container",
  ]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants}
      style={{ marginLeft: "64px" }}
    >
      <main className={mainClasses()}>
        <Sidebar />
        {children}
      </main>
    </motion.div>
  );
};
