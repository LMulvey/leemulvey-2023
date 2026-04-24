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
  const classNames = cvu(
    [
      "hero-image",
      "rounded-xl",
      "overflow-hidden",
      "border",
      "border-border-muted/70",
      "shadow-sm",
      "bg-card-elevated/30",
    ],
    {
      variants: {
        defaultVariants: { size: "default" },
        size: {
          default: ["h-[340px]", "md:h-[520px]"],
          small: ["h-[260px]", "md:h-[360px]"],
        },
      },
    },
  );

  return (
    <figure className="not-prose my-10">
      <div className={classNames({ size })}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1200px) 900px, (min-width: 768px) 75vw, 100vw"
        />
      </div>
      <figcaption className="mt-3 text-center text-[11px] uppercase tracking-[0.08em] text-foreground-muted">
        {alt}
      </figcaption>
    </figure>
  );
};
