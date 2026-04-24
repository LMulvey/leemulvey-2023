import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Pre = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const preClasses = [
    "rounded-xl border border-border-muted/70 bg-card-elevated/40 shadow-sm overflow-x-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <pre className={preClasses} {...props}>
      {children}
    </pre>
  );
};
