import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "../Logo";
import {
  FolderKey,
  Github,
  MailCheck,
  Layers,
  Linkedin,
  BookOpenCheck,
  Cloud,
  Menu,
  X,
} from "lucide-react";
import { cvu } from "@/utilities/cvu";
import "./Sidebar.scss";
import Image from "next/image";

const iconClasses = "text-orange/80";

const linkClasses = cvu([
  "sidebar-link",
  "p-2",
  "rounded-md",
  "transition-colors",
  "text-lg",
  "font-semibold",
  "flex",
  "flex-row",
  "gap-4",
  "items-center",
]);

const hamburgerBarClasses = cvu(
  [
    "fixed",
    "top-0",
    "left-0",
    "w-screen",
    "z-40",
    "md:hidden",
    "flex",
    "justify-between",
    "items-center",
    "p-4",
    "transition-all",
    "border-b",
    "border-b-transparent",
  ],
  {
    variants: {
      background: {
        none: [],
        scrolled: ["bg-surface1/80", "border-b-surface3", "backdrop-blur-md"],
      },
    },
  },
);

const overlayMenuClasses = cvu(
  [
    "fixed",
    "inset-0",
    "z-30",
    "bg-black/30",
    "transition-opacity",
    "duration-300",
    "md:hidden",
  ],
  {
    variants: {
      state: {
        closed: ["opacity-0", "pointer-events-none"],
        open: ["opacity-100", "pointer-events-auto"],
      },
    },
  },
);

const overlayAsideClasses = cvu(
  [
    "fixed",
    "top-0",
    "left-0",
    "h-full",
    "w-72",
    "max-w-full",
    "pt-16",
    "px-8",
    "border-x",
    "border-x-surface3",
    "bg-surface1/80",
    "flex",
    "flex-col",
    "gap-1",
    "z-40",
    "transition-transform",
    "duration-300",
    "md:static",
    "md:translate-x-0",
    "md:flex",
    "md:w-72",
    "shadow-lg",
    "backdrop-blur-md",
  ],
  {
    variants: {
      state: {
        closed: ["-translate-x-full"],
        open: ["translate-x-0"],
      },
    },
  },
);

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sidebar content as a function for reuse
  const sidebarContent = (
    <>
      <Logo className="mb-3 px-2 pb-5 border-b border-lightGreen" />
      <Link
        className={`${linkClasses()} bg-gradient-to-tr from-darkGreen/20 p-4 mb-4 to-surface2 border border-surface3 shadow-sm`}
        href="/projects"
        onClick={() => setOpen(false)}
      >
        <FolderKey className={iconClasses} size={24} />
        Projects
      </Link>
      <a
        className={linkClasses()}
        href="https://registry.jsonresume.org/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <BookOpenCheck className={iconClasses} size={24} />
        Resume
      </a>
      <a
        className={linkClasses()}
        href="https://github.com/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <Github className={iconClasses} size={24} />
        GitHub
      </a>
      <a
        className={linkClasses()}
        href="mailto:hello@leemulvey.com?subject=Hey, Lee, I promise I am not sending you spam"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <MailCheck className={iconClasses} size={24} />
        Email
      </a>
      <a
        className={linkClasses()}
        href="https://www.linkedin.com/in/leemulvey/"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <Linkedin className={iconClasses} size={24} />
        LinkedIn
      </a>
      <a
        className={linkClasses()}
        href="https://stackoverflow.com/users/8246359/lmulvey"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <Layers className={iconClasses} size={24} />
        StackOverflow
      </a>
      <a
        className={linkClasses()}
        href="https://bsky.app/profile/leemulvey.com"
        rel="noopener noreferrer"
        target="_blank"
        onClick={() => setOpen(false)}
      >
        <Cloud className={iconClasses} size={24} />
        Bluesky
      </a>
    </>
  );

  return (
    <>
      {/* Hamburger button - visible below md */}
      <div
        className={hamburgerBarClasses({
          background: scrolled ? "scrolled" : "none",
        })}
      >
        <Image
          className="mobile-logo-image"
          src="/logo-leemulvey.svg"
          width={114}
          height={44}
          alt="Lee Mulvey"
        />
        <button
          className="flex items-center justify-center bg-surface2 border border-surface3 rounded-md p-2 shadow-lg"
          aria-label={open ? "Close sidebar" : "Open sidebar"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      <div
        className={overlayMenuClasses({ state: open ? "open" : "closed" })}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar - mobile (slide in) and desktop (static) */}
      <aside
        className={overlayAsideClasses({ state: open ? "open" : "closed" })}
        aria-label="Sidebar"
      >
        {sidebarContent}
      </aside>
    </>
  );
};
