import { useRouter } from "next/router";
import { getBlogsByTag } from "../../utils/blogUtils";
// import { NextSeo } from "next-seo";
import { FC } from "react";
import BlogCard from "@/components/elements/BlogCard";

interface Blog {
  slug: string;
  title: string;
  description: string;
  href: string;
  date: string;
}

interface TagPageProps {
  tag: string;
  blogs: Blog[];
}

const TagPage: FC<TagPageProps> = ({ tag, blogs }) => {
  const router = useRouter();
  const pageUrl = `https://slyro.vercel.app${router.asPath}`;

  return (
    <>
      {/* <NextSeo
        title={`${tag} - Dev`}
        description={`List of all blogs tagged with ${tag}`}
      /> */}
      <div>
        <h1 className="text-3xl font-medium text-white/50">
          Tag: <span className="text-white">{tag}</span>
        </h1>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {blogs.map((blogPreview, i) => (
          <div key={i}>
            <BlogCard blogPreview={blogPreview} />
          </div>
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const blogs = getBlogsByTag(tag);

  return {
    props: {
      tag,
      blogs,
    },
  };
}

export default TagPage;
