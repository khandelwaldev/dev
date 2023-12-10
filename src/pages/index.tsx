import BlogCard from "@/components/elements/BlogCard";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { BlogPreview } from "@/types/blog";
import Hero from "@/components/design/Hero";
import {
  TailwindCssIcon,
  TypeScriptIcon,
  NextJsIcon,
  ReactIcon,
  VSCodeIcon,
} from "@/components/Icons";
import PageSwitch from "@/components/elements/PageSwitch";
import ProjectCard from "@/components/elements/ProjectCard";
import { ProjectsData } from "@/data/projectsData";

export default function Home({
  blogPreviews,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const skillsIcon = [
    { label: "Tailwindcss", icon: <TailwindCssIcon className="w-6 h-6" /> },
    { label: "TypeScript", icon: <TypeScriptIcon className="w-6 h-6" /> },
    { label: "Next.js", icon: <NextJsIcon className="w-6 h-6" /> },
    { label: "React", icon: <ReactIcon className="w-6 h-6" /> },
    { label: "VS Code", icon: <VSCodeIcon className="w-6 h-6" /> },
  ];
  return (
    <>
      <div>
        {/* Hero */}
        <Hero />

        <div className="my-20">
          <h1 className="text-2xl font-semibold">
            current favorite tech stack/tools:
          </h1>
          <div className="flex items-center gap-6 mt-6">
            {skillsIcon.map((icon) => (
              <button key={icon.label} className="opacity-50 hover:opacity-100">
                {icon.icon}
              </button>
            ))}
          </div>
        </div>

        <hr className="border border-white/70 my-20 opacity-30" />

        {/** Latest Blogs */}
        <div>
          <h1 className="text-3xl font-bold mb-10">Latest Blogs</h1>
          <div className="flex flex-col gap-6">
            {blogPreviews.slice(0, 5).map((blogPreview, i) => {
              return (
                <div key={i}>
                  <BlogCard blogPreview={blogPreview} />
                </div>
              );
            })}
          </div>
          <PageSwitch title={`Read More`} href={`/blog`} />
        </div>

        <hr className="border border-white/70 my-20 opacity-30" />

        {/** Latest Projects */}
        <div>
          <h1 className="text-3xl font-bold mb-10">Latest Projects</h1>
          <div className="grid sm:grid-cols-2 gap-6">
            {ProjectsData.map((project) => (
              <ProjectCard
                key={project.name}
                href={project.link}
                image={project.image}
                name={project.name}
                bio={project.bio}
              />
            ))}
          </div>

          <PageSwitch title={`View More`} href={`/projects`} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const blogFilePaths = fs
    .readdirSync("src/data/blogs")
    .filter((blogFilePath) => {
      return path.extname(blogFilePath).toLowerCase() === ".mdx";
    });

  const blogPreviews: BlogPreview[] = [];

  for (const blogFilePath of blogFilePaths) {
    const blogFile = fs.readFileSync(`src/data/blogs/${blogFilePath}`, "utf-8");

    const serializedBlog = await serialize(blogFile, {
      parseFrontmatter: true,
    });

    blogPreviews.push({
      ...serializedBlog.frontmatter,
      slug: blogFilePath.replace(".mdx", ""),
    } as BlogPreview);
  }

  // Sort the blogPreviews based on the date property in descending order
  blogPreviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    props: {
      blogPreviews: blogPreviews.slice(0, 3), // latest 3 blogs
    },
    revalidate: 60,
  };
}
