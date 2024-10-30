import Image from "next/image";
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
  {
    id: "php",

    label: "PHP",
  },
  { id: "laravel", label: "Laravel" },
];

export default function Home() {
  // I've been coding since I was 12 - cut my teeth building vBulletin mods. But, I've been working _professionally_ since 2017.
  const yearsOfExperience = new Date().getFullYear() - 2017;

  return (
    <article className="prose prose-green lg:prose-lg">
      <div className="flex flex-row items-center gap-8 p-4 border border-black/20 bg-black/10 rounded-lg mb-8">
        <Image
          className="rounded-md mt-0 mb-0 lg:mt-0 lg:mb-0"
          src="/lee.webp"
          width={84}
          height={84}
          alt="Lee Mulvey"
        />
        <div>
          <h2 className="mt-0 mb-0 lg:mt-0 lg:mb-0">
            Hey, I am Lee{" "}
            <span role="img" aria-label="waving emoji">
              👋🏼
            </span>
          </h2>
          <p style={{ margin: 0 }}>
            I&apos;m a{" "}
            {WHOAMI.map(({ id, label, emoji }) => (
              <strong key={id}>
                {label}{" "}
                <span role="img" aria-label={id}>
                  {emoji}
                </span>
                ,{" "}
              </strong>
            ))}{" "}
            and <strong>full-stack engineer</strong> from{" "}
            <strong>Calgary, AB</strong>.
          </p>
        </div>
      </div>
      <p>
        With over {yearsOfExperience}+ years of experience in both frontend and
        backend development, I have the expertise you need to bring your project
        to life.
      </p>
      <p>
        My focus is on crafting high-quality user experiences no matter the
        technology. Lately, I&apos;ve been using{" "}
        {TECH.map(({ id, label }) => (
          <strong key={id}>{label}, </strong>
        ))}{" "}
        and anything else a project calls for. I am able to learn on-the-fly and
        use the right tools for the job.
      </p>
      <p>
        Check out the <a href="/projects">projects</a> I have worked on, or dig
        into my code on{" "}
        <a
          href="https://github.com/lmulvey"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        .
      </p>
    </article>
  );
}
