import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const WHOAMI: { id: string; label: ReactNode; emoji: ReactNode }[] = [
  { emoji: <>👨🏼</>, id: "father", label: "weird dad" },
  { emoji: <>👾</>, id: "gamer", label: "avid gamer" },
  { emoji: <>🚴‍♂️</>, id: "cyclist", label: "cyclist" },
  { emoji: <>🎥</>, id: "pop-culture", label: "pop-culture enthusiast" },
  {
    emoji: <>🎸</>,
    id: "lover-of-music",
    label: (
      <>
        music lover{" "}
        <a
          href="https://soundcloud.com/yevyev"
          aria-label="Some of my music is here!"
          target="_blank"
          rel="noreferrer noopener"
        >
          (and musician!)
        </a>
      </>
    ),
  },
];

const TECH: { id: string; label: string }[] = [
  {
    id: "typescript",
    label: "TypeScript",
  },
  {
    id: "javascript",
    label: "JavaScript",
  },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "nodejs", label: "Node.js" },
  {
    id: "vercel",

    label: "Vercel + Vercel AI",
  },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "web3-tools", label: "Web3 tooling" },
  { id: "wagmi", label: "Wagmi" },
  { id: "viem", label: "Viem" },
];

export default function Home() {
  // I've been coding since I was 12 - cut my teeth building vBulletin mods. But, I've been working _professionally_ since 2017.
  const yearsOfExperience = new Date().getFullYear() - 2017;

  return (
    <article className="w-full max-w-5xl mx-auto pb-8">
      <section className="rounded-2xl border border-border-muted/70 bg-card/60 px-5 py-6 md:px-8 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <Image
            className="rounded-xl border border-border-muted/60"
            src="/lee.webp"
            width={112}
            height={112}
            alt="Lee Mulvey"
          />

          <div className="min-w-0">
            <h1 className="m-0 text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-tight text-foreground">
              Hey, I am Lee{" "}
              <span role="img" aria-label="waving emoji">
                👋🏼
              </span>
            </h1>
            <p className="mt-3 mb-0 text-[15px] md:text-base leading-7 text-foreground-muted max-w-3xl">
              Full-stack engineer based in Calgary, AB focused on building
              thoughtful products and interfaces that feel fast, clear, and
              dependable.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-row flex-wrap gap-2 items-start">
          {WHOAMI.map(({ id, label, emoji }) => (
            <span
              key={id}
              className="text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] bg-accent/80 text-accent-foreground/90 border border-border/40 px-2.5 py-1 rounded-md shadow-sm"
            >
              {label} {emoji}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8">
        <div>
          <h2 className="m-0 text-2xl md:text-3xl font-semibold tracking-[-0.015em] text-foreground">
            Building products people actually enjoy using
          </h2>
          <p className="mt-3 mb-0 text-[15px] leading-7 text-foreground-muted">
            With over {yearsOfExperience}+ years of experience across frontend
            and backend development, I help teams ship resilient products with
            great UX and maintainable systems.
          </p>
          <p className="mt-4 mb-0 text-[15px] leading-7 text-foreground-muted">
            My approach is pragmatic: choose the right tools for the
            constraints, iterate quickly, and keep product quality high as
            complexity grows.
          </p>
        </div>

        <div>
          <h2 className="m-0 text-2xl md:text-3xl font-semibold tracking-[-0.015em] text-foreground">
            Tech I reach for to move fast
          </h2>
          <div className="mt-4 flex flex-row flex-wrap gap-2 items-start">
            {TECH.map(({ id, label }) => (
              <span
                key={id}
                className="text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] bg-card-elevated/70 text-foreground-muted border border-border/50 px-2.5 py-1 rounded-md"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border-muted/70 bg-card-elevated/40 px-5 py-5 md:px-7 md:py-6">
        <p className="m-0 text-[15px] leading-7 text-foreground-muted">
          Check out my <Link href="/projects">projects</Link>, read the
          occasional <Link href="/blog">blog post</Link>, or dig into the code
          on{" "}
          <a
            href="https://github.com/lmulvey"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </article>
  );
}
