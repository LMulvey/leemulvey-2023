import React from "react";
import Image from "next/image";
import "./Hero.scss";
import { cvu } from "@/utilities/cvu";

export const Hero = ({
  src,
  alt,
  size = "default",
}: {
  src: string;
  alt: string;
  size?: "default" | "small";
}) => {
  const classNames = cvu(["hero-image"], {
    variants: {
      defaultVariants: { size: "default" },
      size: { default: ["h-[600px]"], small: ["h-[400px]"] },
    },
  });

  return (
    <div className="flex flex-col gap-2 items-center mt-8">
      <div className={classNames({ size })}>
        <Image src={src} alt={alt} fill />
      </div>
      <p className="italic mt-0">{alt}</p>
    </div>
  );
};
