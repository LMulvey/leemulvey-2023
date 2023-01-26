"use client";

import React, { ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "./stitches.config";
import { globalStyles } from "./globalStyles";

export function SSRStylesheet({ children }: { children: ReactNode }) {
  useServerInsertedHTML(() => {
    if (typeof window === "undefined") {
      return (
        <style
          id="stitches"
          // rome-ignore lint/security/noDangerouslySetInnerHtml: for Stitches stylesheets
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      );
    }
  });

  globalStyles();
  return <>{children}</>;
}
