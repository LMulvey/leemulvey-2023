import Link from "next/link";
import { Logo } from "../Logo";
import { FolderKey, Github, MailCheck, ScanFace, Twitter } from "lucide-react";

const LinkClasses =
  "text-white text-xl font-bold mb-5 flex flex-row gap-4 items-center";

export const Sidebar = () => {
  return (
    <aside className="max-w-full md:max-w-max grid grid-col-1">
      <Logo className="mb-5 pb-5 border-b border-slate-200" />
      <Link className={LinkClasses} href="/about">
        <ScanFace size={24} />
        About
      </Link>
      <Link
        className={`${LinkClasses} mb-5 pb-5 border-b border-slate-200`}
        href="/projects"
      >
        <FolderKey size={24} />
        Projects
      </Link>
      <a
        className={LinkClasses}
        href="mailto:hello@leemulvey.com?subject=Hey, Lee, I promise I am not sending you spam"
      >
        <MailCheck size={24} />
        Email
      </a>
      <a
        className={LinkClasses}
        href="https://github.com/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github size={24} />
        GitHub
      </a>
      <a
        className={LinkClasses}
        href="https://twitter.com/leemulvey"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Twitter size={24} />
        Twitter
      </a>
    </aside>
  );
};
