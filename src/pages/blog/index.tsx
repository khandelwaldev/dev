import BlogCard from "@/components/elements/BlogCard";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { BlogPreview } from "@/types/blog";
import { NextSeo } from "next-seo";
import ScrollToSearchBox from "@/components/ScrollToSearchBox";
import { SearchIcon } from "@/components/Icons";
import { useState } from "react";

export default function Blogs({
  blogPreviews,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort blog previews based on the search query
  const filteredBlogs = blogPreviews
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Handle changes in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <NextSeo
        title="Blog - Dev"
        description="My place for thoughts, reflections & everything in between. Have a good read!"
      />
      <ScrollToSearchBox />

      <div>
        <h1 className="text-4xl font-medium">Blog</h1>
        <div className="my-10 flex items-center gap-3 p-3 border border-white/70 rounded-lg bg-[#2ec4b6]/10 h-[40px]">
          <SearchIcon className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent border-none outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-col gap-6">
          {filteredBlogs.map((blogPreview, i) => (
            <div key={i}>
              <BlogCard blogPreview={blogPreview} />
            </div>
          ))}
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

  return {
    props: {
      blogPreviews: blogPreviews,
    },
    revalidate: 60,
  };
}
