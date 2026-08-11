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
        Write-ups on cloud/data engineering, and reflections on building
        things.
      </p>
      <PostListing posts={posts} basePath="/blog" />
    </div>
  );
}
