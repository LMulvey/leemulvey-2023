import { CloudLightningIcon, LogsIcon } from "lucide-react";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="font-sans text-sm pb-4 px-8 absolute bottom-0 mt-8 w-full bg-background/50 backdrop-blur-md">
      <p>
        Built by Lee Mulvey in {currentYear} and then{" "}
        <em>probably lovingly forgotten.</em> Sorry.
      </p>
      <p className="mt-0 mb-2 pb-2 border-b border-b-border-muted text-xs">
        For the most up-to-date work, check my{" "}
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
      <div className="flex flex-row gap-1 items-center">
        <CloudLightningIcon size={10} />
        <p className="mt-0 text-xs">
          Shader courtesy of{" "}
          <a
            className="underline"
            href="https://openshaders.com/@lmulvey"
            rel="noopener noreferrer"
            target="_blank"
          >
            OpenShaders
          </a>
        </p>
      </div>

      <div className="flex flex-row gap-1 items-center">
        <LogsIcon size={10} />
        <p className="mt-0 text-xs">
          <Link className="underline text-foreground-muted" href="/changelog">
            Changelog
          </Link>
        </p>
      </div>
    </footer>
  );
};
