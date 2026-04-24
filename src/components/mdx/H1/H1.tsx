import { DetailedHTMLProps, HTMLAttributes } from "react";

export const H1 = ({
  children,
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return (
    <h1 className="font-semibold text-foreground text-2xl md:text-3xl tracking-[-0.01em] leading-tight mt-12 mb-0">
      {children}
    </h1>
  );
};
