import Image from "next/image";

export default function Home() {
  return (
    <article className="prose prose-slate lg:prose-xl mt-8">
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
        With over 8 years of experience in both frontend and backend
        development, I have the expertise you need to bring your project to
        life.
      </p>
      <p>
        My focus is on crafting high-quality code using JavaScript, Node.js,
        TypeScript, React.js, GraphQL, and Relay. I have created a wide range of
        web experiences, from applications to standalone single-page websites.
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
