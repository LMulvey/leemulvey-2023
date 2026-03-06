import fs, { readFileSync } from "fs";
import { BLOG_DIR } from "@/constants/directories";
import { MDXRemote } from "next-mdx-remote/rsc";
import Head from "next/head";
import { Hero } from "@/components/mdx/Hero/Hero";
import React from "react";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { H1 } from "@/components/mdx/H1/H1";
import { Code } from "@/components/mdx/Code/Code";
import { Pre } from "@/components/mdx/Pre/Pre";
import Link from "next/link";

function getPost({ slug }: { slug: string }) {
  const markdownFile = readFileSync(
    path.join(BLOG_DIR, slug + ".mdx"),
    "utf-8",
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    content,
    frontMatter,
    slug,
  };
}

export default async function BlogPostPage(props: any) {
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
      rehypePlugins: [[rehypePrettyCode]],
      remarkPlugins: [remarkGfm],
    },
  };

  return (
    <div className="mb-80">
      <Head>
        <title>{title}</title>
      </Head>
      <section className="prose prose-green lg:prose-md">
        <Link href="/blog" className="no-underline text-sm font-semibold">
          ← Back to blog
        </Link>

        <header className="not-prose mt-6 mb-10">
          <h1 className="m-0 text-3xl lg:text-5xl font-bold text-foreground leading-tight">
            {title}
          </h1>

          {description ? (
            <p className="mt-3 mb-0 text-foreground-muted text-base">
              {description}
            </p>
          ) : null}

          <div className="mt-2 flex flex-col gap-3">
            {date ? (
              <p className="m-0 text-sm italic text-foreground-muted">
                Posted on{" "}
                {date.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-2 items-start">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs h-min font-semibold bg-accent text-accent-foreground px-2.5 py-1 rounded-md shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <MDXRemote
          source={source.content}
          components={{
            h1: H1,
            Hero,
            pre: Pre,
          }}
          // @ts-expect-error Options format is correct and works
          options={options}
        />
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(BLOG_DIR));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export async function generateMetadata(props: any) {
  const params = await props.params;
  const blog = getPost(params);
  const title = (blog.frontMatter.title as string) ?? "Blog Post";
  const description = (blog.frontMatter.description as string) ?? "";
  const preview = (blog.frontMatter.preview as string | undefined) ?? "/og";
  const tags = ((blog.frontMatter.tags as string | undefined) ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const publishedDate = blog.frontMatter.date
    ? new Date(blog.frontMatter.date as string).toISOString()
    : undefined;
  const ogImage = preview.startsWith("http")
    ? preview
    : `https://leemulvey.com${preview}`;
  const canonicalUrl = `https://leemulvey.com/blog/${blog.slug}`;

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
