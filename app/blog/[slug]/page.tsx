import type { Metadata } from "next";
import PostContent from "./PostContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} — Blog | Green Deal Cannabis`,
    description: `Read about ${title.toLowerCase()} and other cannabis guides from Green Deal Cannabis in York.`,
    alternates: {
      canonical: `https://greendealcannabis.com/blog/${slug}`,
    },
  };
}

export default function BlogPostPage() {
  return <PostContent />;
}
