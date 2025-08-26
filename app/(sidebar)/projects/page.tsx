import { readdirSync, readFileSync } from "fs";
import { Metadata } from "next";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { PROJECTS_DIR } from "@/constants/directories";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Projects() {
  const files = readdirSync(path.join(PROJECTS_DIR));
  const projects = files.map((filename) => {
    const fileContent = readFileSync(
      path.join(PROJECTS_DIR, filename),
      "utf-8",
    );
    const { data: meta } = matter(fileContent);
    return {
      meta,
      slug: filename.replace(".mdx", ""),
    };
  });
  const sortedProjects = projects.sort((a, b) => b.meta.date - a.meta.date);

  return (
    <section className="prose prose-green lg:prose-md">
      <h2 className="text-2xl font-bold">Latest Projects</h2>

      <div className="py-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedProjects.map((project) => (
          <Link
            className="no-underline"
            href={"/projects/" + project.slug}
            passHref
            key={project.slug}
          >
            <div className="p-4 rounded-lg bg-gradient-to-tr from-surface2 to-surface3 flex flex-col justify-between align-middle gap-2 border border-lightGreen">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold flex justify-between m-0">
                  {project.meta.title}{" "}
                </h3>
                <span className="italic text-white text-xs">
                  {project.meta.date.toLocaleString().split(",")[0]}
                </span>
                <p className="my-2 text-lightGreen text-sm h-auto lg:h-28">
                  {project.meta.description}
                </p>
              </div>

              <div className="h-auto lg:h-[88px]">
                <div className="flex flex-row flex-wrap gap-2  items-start">
                  {project.meta.tags.split(",").map((tag: string) => {
                    const cleanTag = tag.trim();

                    return (
                      <span
                        key={cleanTag}
                        className="text-xs h-min font-semibold bg-lightGreen text-surface3 px-3 py-1 rounded-md shadow-sm"
                      >
                        {cleanTag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
