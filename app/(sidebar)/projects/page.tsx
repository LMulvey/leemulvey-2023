import { readdirSync, readFileSync } from "fs";
import { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PROJECTS_DIR } from "@/constants/directories";

export const metadata: Metadata = {
  title: "Projects",
};

const ITEMS_PER_PAGE = 8;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function buildProjectsHref({ page, tag }: { page?: number; tag?: string }) {
  const params = new URLSearchParams();

  if (tag) {
    params.set("tag", tag);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/projects?${queryString}` : "/projects";
}

export default async function Projects(props: any) {
  const searchParams = await props.searchParams;
  const selectedTagParam = Array.isArray(searchParams?.tag)
    ? searchParams.tag[0]
    : searchParams?.tag;
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;
  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const selectedTag =
    typeof selectedTagParam === "string" ? normalizeTag(selectedTagParam) : "";

  const files = readdirSync(path.join(PROJECTS_DIR));
  const projects = files.map((filename) => {
    const fileContent = readFileSync(
      path.join(PROJECTS_DIR, filename),
      "utf-8",
    );
    const { data: meta } = matter(fileContent);

    const parsedDate =
      typeof meta.date === "string" || meta.date instanceof Date
        ? new Date(meta.date)
        : null;

    return {
      date: parsedDate,
      description: (meta.description as string) ?? "",
      preview: (meta.preview as string | undefined) ?? undefined,
      slug: filename.replace(".mdx", ""),
      tags: ((meta.tags as string | undefined) ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      title: (meta.title as string) ?? "Untitled",
    };
  });
  const sortedProjects = projects.sort((a, b) => {
    const bTime = b.date ? b.date.getTime() : 0;
    const aTime = a.date ? a.date.getTime() : 0;

    return bTime - aTime;
  });
  const allTags = Array.from(
    new Set(sortedProjects.flatMap((project) => project.tags)),
  ).sort((a, b) => a.localeCompare(b));
  const filteredProjects = selectedTag
    ? sortedProjects.filter((project) =>
        project.tags.some((tag) => normalizeTag(tag) === selectedTag),
      )
    : sortedProjects;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const cardContainerClasses =
    "group w-full p-5 md:p-6 rounded-xl bg-gradient-to-br from-card via-card to-link/20 flex flex-col gap-4 border border-border border-t-2 border-t-link/70 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:border-border-muted";
  const cardLinkClasses =
    "no-underline block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const chipClasses =
    "text-[10px] leading-4 h-min font-medium uppercase tracking-[0.06em] bg-accent/80 text-accent-foreground/90 border border-border/40 px-2 py-0.5 rounded-md shadow-sm transition-colors";
  const ctaClasses =
    "text-[12px] mt-2 mb-0 text-foreground-muted font-medium tracking-[0.03em] transition-colors group-hover:text-foreground";

  return (
    <section className="w-full max-w-none pb-6">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight m-0">
        Latest Projects
      </h2>
      <p className="mt-3 mb-7 text-[15px] leading-7 text-foreground-muted max-w-2xl">
        A curated list of shipped work, experiments, and client builds.
      </p>

      <div className="not-prose mt-4 mb-8">
        <details
          className="group md:hidden rounded-xl border border-border-muted/70 bg-card-elevated/40 px-4 py-3"
          open={!!selectedTag}
        >
          <summary className="list-none cursor-pointer select-none flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="m-0 text-[11px] uppercase tracking-[0.08em] text-foreground-muted">
                Tags
              </span>
              <span className="text-[11px] uppercase tracking-[0.08em] text-foreground-muted">
                {allTags.length}
              </span>
            </div>
            <ChevronDown
              size={16}
              className="text-foreground-muted transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="mt-2 flex flex-row flex-wrap gap-2 items-center">
            <Link
              href={buildProjectsHref({})}
              className={`text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-md shadow-sm no-underline border ${
                !selectedTag
                  ? "bg-card text-foreground border-border"
                  : "bg-card-elevated text-foreground-muted border-border/50"
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => {
              const isActive = normalizeTag(tag) === selectedTag;

              return (
                <Link
                  key={tag}
                  href={buildProjectsHref({ page: 1, tag })}
                  className={`text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-md shadow-sm no-underline border ${
                    isActive
                      ? "bg-card text-foreground border-border"
                      : "bg-card-elevated text-foreground-muted border-border/50"
                  }`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </details>

        <div className="hidden md:block rounded-xl border border-border-muted/70 bg-card-elevated/40 px-4 py-3">
          <p className="m-0 text-[11px] uppercase tracking-[0.08em] text-foreground-muted">
            Tags
          </p>
          <div className="mt-2 flex flex-row flex-wrap gap-2 items-center">
            <Link
              href={buildProjectsHref({})}
              className={`text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-md shadow-sm no-underline border ${
                !selectedTag
                  ? "bg-card text-foreground border-border"
                  : "bg-card-elevated text-foreground-muted border-border/50"
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => {
              const isActive = normalizeTag(tag) === selectedTag;

              return (
                <Link
                  key={tag}
                  href={buildProjectsHref({ page: 1, tag })}
                  className={`text-[11px] leading-4 h-min font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-md shadow-sm no-underline border ${
                    isActive
                      ? "bg-card text-foreground border-border"
                      : "bg-card-elevated text-foreground-muted border-border/50"
                  }`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-2 grid grid-cols-1 gap-6">
        {paginatedProjects.map((project) => (
          <Link
            className={cardLinkClasses}
            href={"/projects/" + project.slug}
            passHref
            key={project.slug}
          >
            <div className={cardContainerClasses}>
              <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-stretch">
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="text-xl md:text-[1.7rem] font-semibold tracking-[-0.015em] m-0 leading-tight transition-colors duration-200 group-hover:text-foreground">
                    {project.title}
                  </h3>
                  <div className="mt-2">
                    {project.date ? (
                      <span className="text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap block">
                        {formatDate(project.date)}
                      </span>
                    ) : null}
                    {project.tags.length > 0 ? (
                      <div className="mt-2 flex flex-row flex-wrap gap-1.5 items-start">
                        {project.tags.map((tag) => (
                          <span key={tag} className={chipClasses}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <p
                    className="mt-3 mb-0 text-foreground-muted text-[15px] leading-7 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {project.description}
                  </p>
                  <p className={ctaClasses}>Read more →</p>
                </div>

                {project.preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.preview}
                    alt={`${project.title} preview`}
                    className="w-full md:w-72 rounded-lg object-cover object-center border border-border-muted aspect-[16/9] md:aspect-[4/3] transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>
          </Link>
        ))}

        {filteredProjects.length === 0 ? (
          <div className="rounded-xl border border-border-muted bg-card/60 p-5 md:p-6">
            <p className="m-0 text-sm text-foreground-muted">
              No projects found for this tag yet.
            </p>
            {selectedTag ? (
              <Link
                className="inline-flex mt-3 text-sm font-medium text-foreground-muted no-underline border-b border-border-muted/60 hover:border-border"
                href={buildProjectsHref({})}
              >
                Clear tag
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="not-prose mt-6 flex items-center justify-between gap-3">
          <Link
            href={buildProjectsHref({
              page: safePage - 1,
              tag: selectedTagParam,
            })}
            aria-disabled={safePage <= 1}
            className={`text-sm font-semibold no-underline px-3 py-1 rounded-md border ${
              safePage <= 1
                ? "pointer-events-none opacity-50 border-border-muted text-foreground-muted"
                : "border-border text-foreground-muted"
            }`}
          >
            ← Previous
          </Link>

          <p className="text-sm text-foreground-muted m-0">
            Page {safePage} of {totalPages}
          </p>

          <Link
            href={buildProjectsHref({
              page: safePage + 1,
              tag: selectedTagParam,
            })}
            aria-disabled={safePage >= totalPages}
            className={`text-sm font-semibold no-underline px-3 py-1 rounded-md border ${
              safePage >= totalPages
                ? "pointer-events-none opacity-50 border-border-muted text-foreground-muted"
                : "border-border text-foreground-muted"
            }`}
          >
            Next →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
