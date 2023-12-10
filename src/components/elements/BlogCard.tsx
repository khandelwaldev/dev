import { BlogPreview } from "@/types/blog";
import Link from "next/link";
import DateFormatter from "../DateFormatter";

export default function BlogCard({
  blogPreview,
}: {
  blogPreview: BlogPreview;
}) {
  return (
    <>
      <div>
        <Link href={`blog/${blogPreview.slug}`}>
          <div className="bg-lightSeaGreen/10 backdrop-blur-sm p-4 rounded-lg hover:p-[14px] hover:border-2 border-celestialBlue">
            <h2 className="text-seaSalt text-xl font-medium line-clamp-2">{blogPreview.title}</h2>
            <p className="opacity-50 text-seaSalt text-base font-semibold mt-1 mb-3">
              <DateFormatter dateString={blogPreview.date} />
            </p>
            <p className="opacity-70 text-seasalt text-lg font-semibold line-clamp-3">{blogPreview.description}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
