import Link from "next/link";
import { Logo } from "../Logo";
import { FolderKey, Github, MailCheck, ScanFace, Twitter } from "lucide-react";

const iconClasses = "text-orange/80";

const linkClasses =
  "text-neutral-100 p-2 rounded-md transition-colors hover:bg-slate-300/50 focus:bg-slate-300/50 text-xl font-bold mb-3 flex flex-row gap-4 items-center";

export const Sidebar = () => {
  return (
    <aside className="max-w-full md:max-w-fit h-fit grid grid-col-1">
      <Logo className="mb-3 px-2 pb-5 border-b border-slate-200" />
      <Link className={linkClasses} href="/about">
        <ScanFace className={iconClasses} size={24} />
        About
      </Link>
      <Link className={`${linkClasses} mb-5`} href="/projects">
        <FolderKey className={iconClasses} size={24} />
        Projects
      </Link>
      <div className="mb-5 border-b border-slate-200" />
      <a
        className={linkClasses}
        href="mailto:hello@leemulvey.com?subject=Hey, Lee, I promise I am not sending you spam"
      >
        <MailCheck className={iconClasses} size={24} />
        Email
      </a>
      <a
        className={linkClasses}
        href="https://github.com/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github className={iconClasses} size={24} />
        GitHub
      </a>
      <a
        className={linkClasses}
        href="https://twitter.com/leemulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Twitter className={iconClasses} size={24} />
        Twitter
      </a>
    </aside>
  );
};
