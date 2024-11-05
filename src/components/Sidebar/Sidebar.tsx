import Link from "next/link";
import { Logo } from "../Logo";
import {
  FolderKey,
  Github,
  MailCheck,
  Layers,
  Linkedin,
  BookOpenCheck,
  Cloud,
} from "lucide-react";
import { cvu } from "@/utilities/cvu";
import "./Sidebar.scss";

const iconClasses = "text-orange/80";

const linkClasses = cvu([
  "sidebar-link",
  "p-2",
  "rounded-md",
  "transition-colors",
  "text-xl",
  "font-bold",
  "mb-3",
  "flex",
  "flex-row",
  "gap-4",
  "items-center",
]);

export const Sidebar = () => {
  return (
    <aside className="max-w-full md:max-w-fit h-fit grid grid-col-1">
      <Logo className="mb-3 px-2 pb-5 border-b border-light-green" />
      <Link className={`${linkClasses()} mb-5`} href="/projects">
        <FolderKey className={iconClasses} size={24} />
        Projects
      </Link>
      <div className="mb-5 border-b border-light-green" />
      <a
        className={linkClasses()}
        href="https://registry.jsonresume.org/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <BookOpenCheck className={iconClasses} size={24} />
        Resume
      </a>
      <a
        className={linkClasses()}
        href="mailto:hello@leemulvey.com?subject=Hey, Lee, I promise I am not sending you spam"
        rel="noopener noreferrer"
        target="_blank"
      >
        <MailCheck className={iconClasses} size={24} />
        Email
      </a>
      <a
        className={linkClasses()}
        href="https://www.linkedin.com/in/leemulvey/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Linkedin className={iconClasses} size={24} />
        LinkedIn
      </a>
      <a
        className={linkClasses()}
        href="https://github.com/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github className={iconClasses} size={24} />
        GitHub
      </a>
      <a
        className={linkClasses()}
        href="https://stackoverflow.com/users/8246359/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Layers className={iconClasses} size={24} />
        StackOverflow
      </a>
      <a
        className={linkClasses()}
        href="https://bsky.app/profile/leemulvey.bsky.social"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Cloud className={iconClasses} size={24} />
        Bluesky
      </a>
    </aside>
  );
};
