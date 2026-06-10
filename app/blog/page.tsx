import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — Green Deal Cannabis | York",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from Green Deal Cannabis in York.",
  alternates: {
    canonical: "https://greendealcannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
