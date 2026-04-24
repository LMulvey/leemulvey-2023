import fs, { readFileSync } from "fs";
import { PROJECTS_DIR } from "@/constants/directories";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Hero } from "@/components/mdx/Hero/Hero";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { H1 } from "@/components/mdx/H1/H1";
import { Code } from "@/components/mdx/Code/Code";
import { Pre } from "@/components/mdx/Pre/Pre";
import Link from "next/link";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(date: Date) {
  return dateFormatter.format(date);
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = readFileSync(
    path.join(PROJECTS_DIR, slug + ".mdx"),
    "utf-8",
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    content,
    frontMatter,
    slug,
  };
}

export default async function ProjectPage(props: any) {
  const params = await props.params;
  const source = getPost(params);
  const title = (source.frontMatter.title as string) ?? "Untitled";
  const description = (source.frontMatter.description as string) ?? "";
  const date = source.frontMatter.date
    ? new Date(source.frontMatter.date as string)
    : null;
  const tags = ((source.frontMatter.tags as string | undefined) ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const options = {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, { theme: "solarized-light" }]],
      remarkPlugins: [remarkGfm],
    },
  };

  return (
    <section className="w-full max-w-none pb-20">
      <Link
        href="/projects"
        className="inline-flex text-sm font-medium no-underline text-foreground-muted border-b border-border-muted/70 hover:border-border"
      >
        ← Back to projects
      </Link>

      <header className="not-prose mt-6 rounded-xl border border-border-muted/70 bg-card/60 px-5 py-6 md:px-7 md:py-7">
        <h1 className="m-0 text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-foreground leading-tight">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 mb-0 text-[15px] md:text-base leading-7 text-foreground-muted max-w-3xl">
            {description}
          </p>
        ) : null}

        <div className="mt-4 flex flex-col gap-2">
          {date ? (
            <p className="m-0 text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap">
              {formatDate(date)}
            </p>
          ) : null}

          {tags.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-1.5 items-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] leading-4 h-min font-medium uppercase tracking-[0.06em] bg-accent/80 text-accent-foreground/90 border border-border/40 px-2 py-0.5 rounded-md shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <article className="prose prose-green max-w-none mt-10 lg:prose-lg prose-headings:font-semibold prose-headings:tracking-[-0.01em] prose-headings:mt-12 prose-headings:mb-3 prose-p:text-foreground-muted prose-p:leading-7 prose-p:mt-5 prose-li:text-foreground-muted prose-strong:text-foreground prose-a:font-medium prose-a:no-underline hover:prose-a:text-link-hover prose-blockquote:text-foreground prose-blockquote:border-l-border prose-hr:border-border-muted">
        <MDXRemote
          source={source.content}
          components={{
            code: Code,
            h1: H1,
            Hero,
            pre: Pre,
          }}
          // @ts-expect-error Options format is correct and works
          options={options}
        />
      </article>
    </section>
  );
}
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(PROJECTS_DIR));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export async function generateMetadata(props: any) {
  const siteUrl = "https://leemulvey.com";
  const params = await props.params;
  const project = getPost(params);
  const title = (project.frontMatter.title as string) ?? "Project";
  const description = (project.frontMatter.description as string) ?? "";
  const preview =
    (project.frontMatter.preview as string | undefined) ??
    "/opengraph-image.png";
  const tags = ((project.frontMatter.tags as string | undefined) ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const publishedDate = project.frontMatter.date
    ? new Date(project.frontMatter.date as string).toISOString()
    : undefined;
  const ogImage = preview.startsWith("http") ? preview : `${siteUrl}${preview}`;
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: title,
          url: ogImage,
        },
      ],
      publishedTime: publishedDate,
      tags,
      title,
      type: "article",
      url: canonicalUrl,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [ogImage],
      title,
    },
  };
}
