import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export const H1 = ({
  children,
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  return <h1 className="font-bold text-white text-[20px] mt-12">{children}</h1>;
};
