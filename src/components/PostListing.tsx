import Link from "next/link";
import type { PostFrontmatter } from "@/lib/content";

export function PostListing({
  posts,
  basePath,
}: {
  posts: (PostFrontmatter & { slug: string })[];
  basePath: string;
}) {
  return (
    <div className="mt-10 flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`${basePath}/${post.slug}`}
          className="group py-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-medium group-hover:underline">
              {post.title}
            </h2>
            <time className="shrink-0 text-sm text-foreground/50">
              {post.date}
            </time>
          </div>
          <p className="mt-2 text-sm text-foreground/70">{post.excerpt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
