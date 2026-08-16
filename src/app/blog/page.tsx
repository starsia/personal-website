import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import { PostListing } from "@/components/PostListing";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        Reflections on building things.
      </p>
      <p className="mt-4 max-w-2xl text-foreground/70">
        My reflections represent my personal opinions and do not reflect the views of my employer.
      </p>
      <PostListing posts={posts} basePath="/blog" />
    </div>
  );
}
