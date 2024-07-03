import Image from "next/image";

export default function Home() {
  // I've been coding since I was 12 - cut my teeth building vBulletin mods. But, I've been working _professionally_ since 2017.
  const yearsOfExperience = new Date().getFullYear() - 2017;

  return (
    <article className="prose prose-green lg:prose-lg">
      <div className="flex flex-row items-center gap-8">
        <Image
          className="rounded-full mt-0 mb-0 lg:mt-0 lg:mb-0"
          src="/lee.webp"
          width={84}
          height={84}
          alt="Lee Mulvey"
        />
        <h2 className="mt-0 mb-0 lg:mt-0 lg:mb-0">Hey, I am Lee 👋🏼</h2>
      </div>
      <p>
        I&apos;m a weird dad, avid gamer, cyclist, and full-stack engineer from{" "}
        <strong>Calgary, AB</strong>.
      </p>
      <p>
        With over {yearsOfExperience} years of experience in both frontend and backend
        development, I have the expertise you need to bring your project to
        life.
      </p>
      <p>
        My focus is on crafting high-quality user experiences using technologies like JavaScript/Typescript, React.js, GraphQL, and Relay. 
        I&apos;ve created and maintained a variety of web applications, from small marketing sites to large-scale enterprise applications.
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
