import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory: string = path.join(process.cwd(), "src/data/blogs");

export const getLatestBlogs = (): any[] => {
  const fileNames: string[] = fs.readdirSync(postsDirectory);

  // Sort fileNames based on date in descending order (latest first)
  const sortedFileNames: string[] = fileNames.sort((a: string, b: string) => {
    const dateA: Date = new Date(a.slice(0, 10));
    const dateB: Date = new Date(b.slice(0, 10));
    return dateB.getTime() - dateA.getTime();
  });

  const latestBlogs: any[] = sortedFileNames.slice(0, 5).map((fileName: string) => {
    const filePath: string = path.join(postsDirectory, fileName);
    const source: string = fs.readFileSync(filePath, "utf8");
    const { data }: any = matter(source);
    return { slug: fileName.replace(/\.mdx$/, ""), ...data };
  });

  return latestBlogs;
};

export const getBlogsByTag = (tag: string): any[] => {
  const fileNames: string[] = fs.readdirSync(postsDirectory);

  const blogs: any[] = fileNames.map((fileName: string) => {
    const filePath: string = path.join(postsDirectory, fileName);
    const source: string = fs.readFileSync(filePath, "utf8");
    const { data }: any = matter(source);
    return { slug: fileName.replace(/\.mdx$/, ""), ...data };
  });

  // Filter the blogs based on the selected tag
  const blogsByTag: any[] = blogs.filter((blog: any) => {
    return blog.tags && blog.tags.includes(tag);
  });

  return blogsByTag;
};