import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Code = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return (
    <code className="p-8 my-10 rounded-lg" {...props}>
      {children}
    </code>
  );
};
