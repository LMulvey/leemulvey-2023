import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export const Pre = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  return (
    <pre className="rounded-lg" {...props}>
      {children}
    </pre>
  );
};
