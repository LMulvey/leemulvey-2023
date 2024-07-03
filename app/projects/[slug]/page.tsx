import fs, { readFileSync } from "fs";
import { PROJECTS_DIR } from "constants/directories";
import { MDXRemote } from "next-mdx-remote/rsc";
import Head from "next/head";
import { Hero } from "components/mdx/Hero/Hero";
import React from "react";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { H1 } from "components/mdx/H1/H1";
import { Code } from "@/src/components/mdx/Code/Code";
import { Pre } from "@/src/components/mdx/Pre/Pre";

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

export default function ProjectPage({ params }: any) {
  const source = getPost(params);
  const options = {
    mdxOptions: {
      rehypePlugins: [[rehypePrettyCode, { theme: "solarized-light" }]],
      remarkPlugins: [remarkGfm],
    },
  };

  return (
    <div className="mb-80">
      <Head>
        <title>{source.frontMatter.title as string}</title>
      </Head>
      {/* @ts-expect-error Server Component*/}
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
    </div>
  );
}
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(PROJECTS_DIR));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export async function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    description: blog.frontMatter.description,
    title: blog.frontMatter.title,
  };
}
