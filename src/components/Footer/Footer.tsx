"use server";

export const Footer = async () => {
  return (
    <footer className="font-sans text-sm p-8">
      <p>
        <u>
          Built with love by Lee Mulvey in {new Date().getFullYear()} and then{" "}
          <em>probably lovingly ignored</em>
        </u>
      </p>
      <p className="mt-0">
        Sorry. For the most up-to-date work, check my{" "}
        <a
          className="underline"
          href="https://github.com/lmulvey"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>{" "}
        or don&apos;t hesitate to get in touch ❤️
      </p>
    </footer>
  );
};
