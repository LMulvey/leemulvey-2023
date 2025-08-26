const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="font-sans text-sm pb-4 absolute bottom-0 mt-8 w-full px-4 border-t border-t-surface3 ">
      <p>
        <u>
          Built with love by Lee Mulvey in {currentYear} and then{" "}
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
