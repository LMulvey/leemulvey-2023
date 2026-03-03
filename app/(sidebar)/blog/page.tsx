import { readdirSync, readFileSync } from "fs";
import { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { BLOG_DIR } from "@/constants/directories";
import { getLetterboxdReviews } from "@/utilities/letterboxd";

export const metadata: Metadata = {
  title: "Blog",
};

const ITEMS_PER_PAGE = 8;

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

function buildBlogHref({ page, tag }: { page?: number; tag?: string }) {
  const params = new URLSearchParams();

  if (tag) {
    params.set("tag", tag);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/blog?${queryString}` : "/blog";
}

export default async function Blog(props: any) {
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

  const allTags = Array.from(
    new Set(feedItems.flatMap((item) => item.tags)),
  ).sort((a, b) => a.localeCompare(b));
  const filteredFeedItems = selectedTag
    ? feedItems.filter((item) =>
        item.tags.some((tag) => normalizeTag(tag) === selectedTag),
      )
    : feedItems;
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
    "h-[312px] p-5 rounded-lg bg-gradient-to-tr from-surface2 to-darkGreen/50 flex flex-col justify-between align-middle gap-3 border border-lightGreen";
  const letterboxdCardContainerClasses =
    "h-[312px] p-5 rounded-lg bg-gradient-to-tr from-surface2 to-surface3 flex flex-col justify-between align-middle gap-3 border border-orange/40";

  return (
    <section className="prose prose-green lg:prose-md">
      <h2 className="text-2xl font-bold">Latest Thoughts</h2>

      <div className="not-prose mt-4 mb-8 flex flex-row flex-wrap gap-2 items-center">
        <Link
          href={buildBlogHref({})}
          className={`text-xs leading-4 h-min font-semibold px-2 py-0.5 rounded-md shadow-sm no-underline ${
            !selectedTag
              ? "bg-lightGreen text-surface3"
              : "bg-surface3 text-lightGreen border border-lightGreen/50"
          }`}
        >
          All
        </Link>
        {allTags.map((tag) => {
          const isActive = normalizeTag(tag) === selectedTag;

          return (
            <Link
              key={tag}
              href={buildBlogHref({ page: 1, tag })}
              className={`text-xs leading-4 h-min font-semibold px-2 py-0.5 rounded-md shadow-sm no-underline ${
                isActive
                  ? "bg-lightGreen text-surface3"
                  : "bg-surface3 text-lightGreen border border-lightGreen/50"
              }`}
            >
              {tag}
            </Link>
          );
        })}
      </div>

      <div className="py-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paginatedFeedItems.map((item) => {
          if (item.type === "blog") {
            return (
              <Link
                className="no-underline"
                href={"/blog/" + item.slug}
                passHref
                key={item.id}
              >
                <div className={cardContainerClasses}>
                  <div className="flex flex-col gap-1">
                    {item.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.preview}
                        alt={`${item.title} preview`}
                        className="w-full my-2 h-20 rounded-md object-cover object-center border border-surface3"
                        loading="lazy"
                      />
                    ) : null}
                    <h3 className="text-lg font-bold flex justify-between m-0">
                      {item.title}
                    </h3>
                    <span className="italic text-white text-xs">
                      {item.date.toLocaleDateString()}
                    </span>
                    <p
                      className="my-0 text-lightGreen text-sm overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="h-auto lg:h-[64px]">
                    <div className="flex flex-row flex-wrap gap-1.5 items-start">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] leading-4 h-min font-semibold bg-lightGreen text-surface3 px-2 py-0.5 rounded-md shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <a
              className="no-underline"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <div className={letterboxdCardContainerClasses}>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3">
                    {item.posterUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.posterUrl}
                        alt={`${item.filmTitle} poster`}
                        className="w-16 h-24 my-0 rounded-md object-cover border border-surface3"
                        loading="lazy"
                      />
                    ) : null}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold flex justify-between m-0">
                        {item.filmTitle} ({item.filmYear})
                      </h3>
                      <span className="italic text-white text-xs">
                        {item.date.toLocaleDateString()}
                      </span>
                      <p
                        className="my-2 text-lightGreen text-sm overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 5,
                        }}
                      >
                        {item.excerpt}
                      </p>
                      <p className="text-xs mt-0 mb-2 text-lightGreen font-semibold">
                        {item.ratingLabel} · Read full review →
                      </p>
                      <div className="flex flex-row flex-wrap gap-1.5 items-start">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] leading-4 h-min font-semibold bg-lightGreen text-surface3 px-2 py-0.5 rounded-md shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {filteredFeedItems.length === 0 ? (
          <p className="text-sm text-lightGreen">
            No posts found for that tag yet.
          </p>
        ) : null}
      </div>

      {filteredFeedItems.length > 0 ? (
        <div className="not-prose mt-6 flex items-center justify-between gap-3">
          <Link
            href={buildBlogHref({
              page: safePage - 1,
              tag: selectedTagParam,
            })}
            aria-disabled={safePage <= 1}
            className={`text-sm font-semibold no-underline px-3 py-1 rounded-md border ${
              safePage <= 1
                ? "pointer-events-none opacity-50 border-surface3 text-lightGreen"
                : "border-lightGreen text-lightGreen"
            }`}
          >
            ← Previous
          </Link>

          <p className="text-sm text-lightGreen m-0">
            Page {safePage} of {totalPages}
          </p>

          <Link
            href={buildBlogHref({
              page: safePage + 1,
              tag: selectedTagParam,
            })}
            aria-disabled={safePage >= totalPages}
            className={`text-sm font-semibold no-underline px-3 py-1 rounded-md border ${
              safePage >= totalPages
                ? "pointer-events-none opacity-50 border-surface3 text-lightGreen"
                : "border-lightGreen text-lightGreen"
            }`}
          >
            Next →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
