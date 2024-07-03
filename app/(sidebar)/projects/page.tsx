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
    <section className="py-10">
      <h2 className="text-2xl font-bold">Latest Projects</h2>

      <div className="py-2">
        {projects.map((project) => (
          <Link href={"/projects/" + project.slug} passHref key={project.slug}>
            <div className="py-2 pb-8 flex flex-col justify-between align-middle gap-2 border-b-[1px] border-light-green">
              <div>
                <h3 className="text-lg font-bold flex justify-between">
                  {project.meta.title}{" "}
                  <span className="italic">
                    {project.meta.date.toLocaleString().split(",")[0]}
                  </span>
                </h3>
                <p className="my-2">{project.meta.description}</p>
              </div>

              <div className="flex flex-row flex-wrap gap-2">
                {project.meta.tags.split(",").map((tag: string) => {
                  const cleanTag = tag.trim();

                  return (
                    <span
                      key={cleanTag}
                      className="text-xs font-semibold bg-light-green text-white px-3 py-1 rounded-md"
                    >
                      {cleanTag}
                    </span>
                  );
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
