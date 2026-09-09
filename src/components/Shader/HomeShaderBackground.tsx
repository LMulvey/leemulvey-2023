"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Shader } from "./Shader";

const BACKGROUND = { dark: "#121212", light: "#F6F7F9" };

export function HomeShaderBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Shader
      theme={resolvedTheme === "light" ? "light" : "dark"}
      background={BACKGROUND}
      className="fixed inset-0 -z-10 pointer-events-none opacity-35 dark:opacity-25"
    />
  );
}
