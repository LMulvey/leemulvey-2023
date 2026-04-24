import { readdirSync, readFileSync } from "fs";
import { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BLOG_DIR } from "@/constants/directories";
import { getLetterboxdReviews } from "@/utilities/letterboxd";

export const metadata: Metadata = {
  title: "Blog",
};

const ITEMS_PER_PAGE = 8;
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
type FeedFilter = "all" | "blog" | "letterboxd";

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

function buildBlogHref({
  page,
  tag,
  filter,
}: {
  page?: number;
  tag?: string;
  filter?: FeedFilter;
}) {
  const params = new URLSearchParams();

  if (tag) {
    params.set("tag", tag);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  if (filter && filter !== "all") {
    params.set("filter", filter);
  }

  const queryString = params.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export default async function Blog(props: any) {
  const searchParams = await props.searchParams;
  const selectedTagParam = Array.isArray(searchParams?.tag)
    ? searchParams.tag[0]
    : searchParams?.tag;
  const selectedFilterParam = Array.isArray(searchParams?.filter)
    ? searchParams.filter[0]
    : searchParams?.filter;
  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;
  const parsedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const selectedTag =
    typeof selectedTagParam === "string" ? normalizeTag(selectedTagParam) : "";
  const selectedFilter: FeedFilter =
    selectedFilterParam === "blog" || selectedFilterParam === "letterboxd"
      ? selectedFilterParam
      : "all";

  const files = readdirSync(path.join(BLOG_DIR));
  const posts = files.map((filename) => {
    const fileContent = readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data: meta } = matter(fileContent);

    return {
      meta,
      slug: filename.replace(".mdx", ""),
    };
  });
  const letterboxdReviews = await getLetterboxdReviews({
    limit: 25,
    username: "LeeMulvey",
  });

  const feedItems = [
    ...posts.map((post) => ({
      date: new Date(post.meta.date as string),
      description: post.meta.description as string,
      id: `blog-${post.slug}`,
      preview: post.meta.preview as string | undefined,
      slug: post.slug,
      tags: ((post.meta.tags as string | undefined) ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      title: post.meta.title as string,
      type: "blog" as const,
    })),
    ...letterboxdReviews.map((review) => ({
      date: new Date(review.publishedAt),
      excerpt: review.excerpt,
      filmTitle: review.filmTitle,
      filmYear: review.filmYear,
      id: review.id,
      posterUrl: review.posterUrl,
      ratingLabel: review.ratingLabel,
      tags: ["Letterboxd Review"],
      type: "letterboxd" as const,
      url: review.url,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const filterScopedFeedItems =
    selectedFilter === "all"
      ? feedItems
      : feedItems.filter((item) => item.type === selectedFilter);
  const allTags = Array.from(
    new Set(filterScopedFeedItems.flatMap((item) => item.tags)),
  ).sort((a, b) => a.localeCompare(b));
  const filteredFeedItems = selectedTag
    ? filterScopedFeedItems.filter((item) =>
        item.tags.some((tag) => normalizeTag(tag) === selectedTag),
      )
    : filterScopedFeedItems;
  const tagSetsByFilter: Record<FeedFilter, Set<string>> = {
    all: new Set(
      feedItems.flatMap((item) => item.tags.map((tag) => normalizeTag(tag))),
    ),
    blog: new Set(
      feedItems
        .filter((item) => item.type === "blog")
        .flatMap((item) => item.tags.map((tag) => normalizeTag(tag))),
    ),
    letterboxd: new Set(
      feedItems
        .filter((item) => item.type === "letterboxd")
        .flatMap((item) => item.tags.map((tag) => normalizeTag(tag))),
    ),
  };
  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeedItems.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginatedFeedItems = filteredFeedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const cardContainerClasses =
    "group w-full p-5 md:p-6 rounded-xl bg-gradient-to-br from-card via-card to-link/20 flex flex-col gap-4 border border-border border-t-2 border-t-link/70 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:border-border-muted";
  const letterboxdCardContainerClasses =
    "group w-full p-5 md:p-6 rounded-xl bg-gradient-to-br from-card to-card-elevated flex flex-col gap-4 border border-highlight/40 border-t-2 border-t-highlight/70 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md";
  const cardLinkClasses =
    "no-underline block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const chipClasses =
    "text-[10px] leading-4 h-min font-medium uppercase tracking-[0.06em] bg-accent/80 text-accent-foreground/90 border border-border/40 px-2 py-0.5 rounded-md shadow-sm transition-colors";
  const ctaClasses =
    "text-[12px] mt-2 mb-0 text-foreground-muted font-medium tracking-[0.03em] transition-colors group-hover:text-foreground";

  return (
    <section className="w-full max-w-none pb-6">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight m-0">
        Latest Thoughts
      </h2>
      <p className="mt-3 mb-7 text-[15px] leading-7 text-foreground-muted max-w-2xl">
        A running stream of writing and Letterboxd notes, ordered by most
        recent.
      </p>

      <div className="not-prose mt-4 mb-8 space-y-4">
        <div className="flex w-full md:w-auto md:inline-flex items-center rounded-full border border-border-muted/70 bg-card-elevated/70 p-1 shadow-sm">
          {(
            [
              { label: "All", value: "all" },
              { label: "Blog", value: "blog" },
              { label: "Reviews", value: "letterboxd" },
            ] as const
          ).map((option) => {
            const isActive = selectedFilter === option.value;
            const shouldKeepTag =
              !!selectedTag && tagSetsByFilter[option.value].has(selectedTag);

            return (
              <Link
                key={option.value}
                href={buildBlogHref({
                  filter: option.value,
                  page: 1,
                  tag: shouldKeepTag ? selectedTag : undefined,
                })}
                className={`no-underline flex-1 text-center md:flex-none px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.07em] font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </Link>
            );
          })}
        </div>

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
              href={buildBlogHref({ filter: selectedFilter })}
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
                  href={buildBlogHref({ filter: selectedFilter, page: 1, tag })}
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
              href={buildBlogHref({ filter: selectedFilter })}
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
                  href={buildBlogHref({ filter: selectedFilter, page: 1, tag })}
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
        {paginatedFeedItems.map((item) => {
          if (item.type === "blog") {
            return (
              <Link
                className={cardLinkClasses}
                href={"/blog/" + item.slug}
                passHref
                key={item.id}
              >
                <div className={cardContainerClasses}>
                  <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-stretch">
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="text-xl md:text-[1.7rem] font-semibold tracking-[-0.015em] m-0 leading-tight transition-colors duration-200 group-hover:text-foreground">
                        {item.title}
                      </h3>
                      <div className="mt-2">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap block">
                          {formatDate(item.date)}
                        </span>
                        <div className="mt-2 flex flex-row flex-wrap gap-1.5 items-start">
                          {item.tags.map((tag) => (
                            <span key={tag} className={chipClasses}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p
                        className="mt-3 mb-0 text-foreground-muted text-[15px] leading-7 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {item.description}
                      </p>
                      <p className={ctaClasses}>Read more →</p>
                    </div>

                    {item.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.preview}
                        alt={`${item.title} preview`}
                        className="w-full md:w-72 rounded-lg object-cover object-center border border-border-muted aspect-[16/9] md:aspect-[4/3] transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <a
              className={cardLinkClasses}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <div className={letterboxdCardContainerClasses}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    {item.posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.posterUrl}
                        alt={`${item.filmTitle} poster`}
                        className="w-28 sm:w-24 md:w-28 mx-auto sm:mx-0 rounded-md object-cover border border-border-muted aspect-[2/3] shrink-0 transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-[1.65rem] font-semibold tracking-[-0.015em] m-0 leading-tight transition-colors duration-200 group-hover:text-foreground">
                        {item.filmTitle} ({item.filmYear})
                      </h3>
                      <div className="mt-2">
                        <span className="text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap block">
                          {formatDate(item.date)}
                        </span>
                        <div className="mt-2 flex flex-row flex-wrap gap-1.5 items-start">
                          {item.tags.map((tag) => (
                            <span key={tag} className={chipClasses}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p
                        className="mt-3 mb-2 text-foreground-muted text-[15px] leading-7 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {item.excerpt}
                      </p>
                      <p className="text-[11px] mt-0 mb-0 text-foreground-muted tracking-[0.06em] uppercase">
                        {item.ratingLabel}
                      </p>
                      <p className={ctaClasses}>Read more →</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {filteredFeedItems.length === 0 ? (
          <div className="rounded-xl border border-border-muted bg-card/60 p-5 md:p-6">
            <p className="m-0 text-sm text-foreground-muted">
              No entries found for this filter combination.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {selectedTag ? (
                <Link
                  className="inline-flex text-sm font-medium text-foreground-muted no-underline border-b border-border-muted/60 hover:border-border"
                  href={buildBlogHref({ filter: selectedFilter })}
                >
                  Clear tag
                </Link>
              ) : null}
              {selectedFilter !== "all" ? (
                <Link
                  className="inline-flex text-sm font-medium text-foreground-muted no-underline border-b border-border-muted/60 hover:border-border"
                  href={buildBlogHref({ tag: selectedTagParam })}
                >
                  Show all content
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      {filteredFeedItems.length > 0 ? (
        <div className="not-prose mt-6 flex items-center justify-between gap-3">
          <Link
            href={buildBlogHref({
              filter: selectedFilter,
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
            href={buildBlogHref({
              filter: selectedFilter,
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
