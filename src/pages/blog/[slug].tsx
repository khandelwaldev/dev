import fs from "fs";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import MDXComponents from "@/components/mdxComponents";
import DateFormatter from "@/components/DateFormatter";
import UnstyledLink from "@/components/elements/UnstyledLink";
import Image from "next/image";
import readingTime from "reading-time";
import { useRouter } from "next/router";
import Comments from "@/components/Comments";
import ScrollToComments from "@/components/ScrollToComments";
import 'prism-themes/themes/prism-night-owl.css'

export default function Blog({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const pageUrl = `https://slyro.vercel.app${router.asPath}`;
  const siteUrl = `https://slyro.vercel.app`;
  const mdxText = source.compiledSource.replace(/<[^>]*>/g, "");
  const { text: readingTimeText, minutes } = readingTime(mdxText);

  return (
    <>
      <div>
        <NextSeo
          title={`${source.frontmatter.title as string} - Dev`}
          description={source.frontmatter.description as string}
          openGraph={{
            url: pageUrl,
            title: source.frontmatter.title as string,
            description: source.frontmatter.description as string,
            images: [
              {
                url: `${siteUrl}${source.frontmatter.banner as string}`,
                width: 800,
                height: 420,
                alt: "Dev Khandelwal",
              },
            ],
          }}
        />

        <div>
          <h1 className="text-3xl font-bold">
            {source.frontmatter.title as string}
          </h1>

          <div className="flex items-center gap-3 mt-10 my-5 text-base">
            <p className="opacity-60">
              <DateFormatter dateString={source.frontmatter.date as string} /> /{" "}
              <span>
                {readingTimeText} {/* ({Math.ceil(minutes)} min) */}
              </span>
            </p>
          </div>

          <UnstyledLink
            href={`/about`}
            className="py-1 px-3 bg-[#2ec4b6]/10 rounded-lg w-fit flex items-center gap-3 hover:border border-[#20a4f3] hover:py-[3px] hover:px-[11px]"
          >
            <Image
              src={`https://github.com/khandelwaldev.png`}
              width={30}
              height={30}
              alt="Author"
              className="rounded-full"
            />
            <p className=" text-lg">Dev Khandelwal</p>
          </UnstyledLink>
        </div>

        <hr className="border border-white/70 opacity-40 my-10" />

        <article className="prose dark:prose-invert">
          <MDXRemote {...source} components={MDXComponents} />
        </article>

        <hr className="my-10 border border-white opacity-70" />

        <div id="comments">
          {/* <Comments /> */}
        </div>

        <ScrollToComments />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string;
  }>
) {
  const { slug } = ctx.params!;

  const articleFile = fs.readFileSync(`src/data/blogs/${slug}.mdx`);

  const mdxPrism = require('mdx-prism')

  const mdxSource = await serialize(articleFile, { parseFrontmatter: true, mdxOptions: {rehypePlugins: [mdxPrism]}} );
  return {
    props: {
      source: mdxSource,
    },
    revalidate: 60,
  };
}
