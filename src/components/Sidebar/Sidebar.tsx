import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FolderKey, NotebookPen, MailCheck, Menu, Moon, Sun, X } from "lucide-react";
import { cvu } from "@/utilities/cvu";
import "./Sidebar.scss";
import { useTheme } from "next-themes";
import { LogoSVG } from "../Logo/LogoSVG";
import { CONTACT_LINKS } from "@/constants/contactLinks";
import { useCursorChat } from "@/components/CursorChat";
import { NowListening } from "@/components/NowListening";

const iconClasses = "text-highlight/80";

const VisitorIndicator = ({
  count,
  align = "center",
}: {
  count: number;
  align?: "left" | "center";
}) => (
  <div className="relative inline-flex group">
    <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap cursor-default">
      <span className="relative inline-flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {count} online now
    </span>

    <div
      className={`absolute top-full mt-2 w-56 rounded-lg bg-card border border-border-muted shadow-lg px-3 py-2 text-xs leading-5 text-foreground-muted opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 z-50 ${
        align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
      }`}
    >
      Press <span className="font-semibold text-foreground">/</span> anywhere
      on the site to leave a short message near your cursor for other
      visitors to see.
    </div>
  </div>
);

const linkClasses = cvu(
  [
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
  ],
  {
    variants: {
      active: {
        false: "",
        true: "bg-gradient-to-tr",
      },
    },
  },
);

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
        scrolled: [
          "bg-background/80",
          "border-b-border-muted",
          "backdrop-blur-md",
        ],
      },
    },
  },
);

const overlayMenuClasses = cvu(
  [
    "fixed",
    "inset-0",
    "z-30",
    "bg-overlay/30",
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
    "pb-6",
    "border-x",
    "border-x-border-muted",
    "bg-background/80",
    "flex",
    "flex-col",
    "gap-1",
    "z-40",
    "overflow-y-auto",
    "transition-transform",
    "duration-300",
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

const desktopHeaderClasses = cvu(
  ["hidden", "md:block", "sticky", "top-0", "z-30", "w-full", "transition-all"],
  {
    variants: {
      background: {
        none: ["bg-background/90"],
        scrolled: ["bg-background/85", "shadow-sm", "backdrop-blur-md"],
      },
    },
  },
);

const desktopNavLinkClasses = cvu(
  [
    "text-sm",
    "uppercase",
    "tracking-[0.08em]",
    "font-medium",
    "px-1",
    "py-1",
    "border-b",
    "transition-colors",
    "no-underline",
  ],
  {
    variants: {
      active: {
        false: [
          "border-transparent",
          "text-foreground-muted",
          "hover:text-foreground",
          "hover:border-border/70",
        ],
        true: ["border-link/80", "text-foreground"],
      },
    },
  },
);

export const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { visitorCount } = useCursorChat();

  const isRouteActive = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (!mounted) {
      setTheme(nextTheme);
      return;
    }

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const documentWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };

    if (!shouldReduceMotion && documentWithTransition.startViewTransition) {
      const transition = documentWithTransition.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.catch(() => {});
      return;
    }

    setTheme(nextTheme);
  };

  const isDarkMode = resolvedTheme === "dark";

  const mobileDrawerContent = (
    <>
      <div className="flex items-center justify-between mb-3 px-1 pb-3 border-b border-border">
        <Link href="/" className="no-underline" onClick={() => setOpen(false)}>
          <LogoSVG
            pathFillClass="fill-background"
            outlineFillClass="fill-foreground-muted"
            width={144}
            height={56}
          />
        </Link>

        <button
          type="button"
          className="p-2 rounded-full border border-border-muted bg-card"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {mounted && isDarkMode ? (
            <Sun className={iconClasses} size={16} />
          ) : (
            <Moon className={iconClasses} size={16} />
          )}
        </button>
      </div>

      {visitorCount !== null ? (
        <div className="mb-3 px-1">
          <VisitorIndicator count={visitorCount} align="left" />
        </div>
      ) : null}

      <Link
        className={`${linkClasses({
          active: isRouteActive("/projects"),
        })}  from-link/40 px-4 py-2 mb-1 to-card border border-border-muted shadow-sm`}
        href="/projects"
        onClick={() => setOpen(false)}
      >
        <FolderKey className={iconClasses} size={24} />
        Projects
      </Link>
      <Link
        className={`${linkClasses({
          active: isRouteActive("/blog"),
        })} from-link/40 px-4 py-2 mb-4 to-card border border-border-muted shadow-sm`}
        href="/blog"
        onClick={() => setOpen(false)}
      >
        <NotebookPen className={iconClasses} size={24} />
        Blog
      </Link>
      <Link
        className={`${linkClasses({
          active: isRouteActive("/contact"),
        })} from-link/40 px-4 py-2 mb-4 to-card border border-border-muted shadow-sm`}
        href="/contact"
        onClick={() => setOpen(false)}
      >
        <MailCheck className={iconClasses} size={24} />
        Contact
      </Link>

      {CONTACT_LINKS.map((item) => (
        <a
          key={item.label}
          className={linkClasses()}
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => setOpen(false)}
        >
          <item.icon className={iconClasses} size={24} />
          {item.label}
        </a>
      ))}

      <div className="mt-4">
        <NowListening />
      </div>
    </>
  );

  return (
    <>
      <header
        className={desktopHeaderClasses({
          background: scrolled ? "scrolled" : "none",
        })}
      >
        <div className="w-full px-6 lg:px-10 xl:px-12 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="no-underline shrink-0">
            <LogoSVG
              pathFillClass="fill-background"
              outlineFillClass="fill-foreground-muted"
              width={156}
              height={60}
            />
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/projects"
              className={desktopNavLinkClasses({
                active: isRouteActive("/projects"),
              })}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={desktopNavLinkClasses({
                active: isRouteActive("/blog"),
              })}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={desktopNavLinkClasses({
                active: isRouteActive("/contact"),
              })}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {visitorCount !== null ? (
              <div className="pr-3 border-r border-border-muted/60">
                <VisitorIndicator count={visitorCount} />
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              {CONTACT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={item.label}
                  title={item.label}
                  className="p-1.5 rounded-md text-foreground-muted hover:text-foreground transition-colors"
                >
                  <item.icon className={iconClasses} size={16} />
                </a>
              ))}
            </div>

            <div className="pl-3 border-l border-border-muted/60">
              <button
                type="button"
                className="p-2 rounded-md border border-border-muted/70 bg-card-elevated/60 text-foreground-muted hover:text-foreground hover:bg-card transition-colors shadow-sm"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {mounted && isDarkMode ? (
                  <Sun className={iconClasses} size={16} />
                ) : (
                  <Moon className={iconClasses} size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger button - visible below md */}
      <div
        className={hamburgerBarClasses({
          background: scrolled ? "scrolled" : "none",
        })}
      >
        <LogoSVG
          pathFillClass="fill-background"
          outlineFillClass="fill-foreground-muted"
          width={114}
          height={44}
        />
        <button
          className="flex items-center justify-center bg-card border border-border-muted rounded-md p-2 shadow-lg"
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
        aria-label="Mobile navigation drawer"
      >
        {mobileDrawerContent}
      </aside>
    </>
  );
};
