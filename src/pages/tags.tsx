import Link from "next/link";
import { NextSeo } from "next-seo";
import { getLatestBlogs } from "@/utils/blogUtils";

interface Blog {
  tags: string;
}

interface TagWithCount {
  tag: string;
  count: number;
}

interface TagsPageProps {
  blogs: Blog[];
}

const TagsPage: React.FC<TagsPageProps> = ({ blogs }) => {
  // Calculate the tags and their counts
  const tagsCounts: { [tag: string]: number } = {};
  blogs.forEach((blog) => {
    if (blog.tags) {
      const tagsArray = blog.tags.split(",").map((tag) => tag.trim());
      tagsArray.forEach((tag) => {
        tagsCounts[tag] = tagsCounts[tag] ? tagsCounts[tag] + 1 : 1;
      });
    }
  });

  // Convert the tags counts to an array of objects
  const tagsWithCounts: TagWithCount[] = Object.entries(tagsCounts).map(([tag, count]) => ({
    tag,
    count,
  }));

  return (
    <>
      <>
        <NextSeo
          title="Tags - Dev"
          description="List of all the tags i have used in my blogs"
        />
        <div>
          <h1 className="text-4xl font-semibold">All Tags:</h1>
        </div>

        <div className="mt-10 flex gap-6 flex-wrap">
          {tagsWithCounts.map(({ tag, count }) => (
            <Link href={`/tags/${tag}`} key={tag} passHref>
              <button className="border border-white/70 p-2 rounded hover:border-celestialBlue hover:bg-lightSeaGreen/30">
                {tag} ({count})
              </button>
            </Link>
          ))}
        </div>
      </>
    </>
  );
};

export async function getStaticProps() {
  const latestBlogs = getLatestBlogs(); // Fetch latest blog data

  return {
    props: {
      blogs: latestBlogs, // Pass the blog data directly to the component
    },
  };
}

export default TagsPage;
