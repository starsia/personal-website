import type { ReactNode } from "react";
import Link from "next/link";
import type { PostFrontmatter } from "@/lib/content";

export function PostLayout({
  frontmatter,
  backHref,
  backLabel,
  children,
}: {
  frontmatter: PostFrontmatter;
  backHref: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <article>
      <Link href={backHref} className="text-sm text-foreground/50 hover:text-foreground">
        ← {backLabel}
      </Link>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        {frontmatter.title}
      </h1>
      <time className="mt-2 block text-sm text-foreground/50">
        {frontmatter.date}
      </time>

      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/60"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-foreground">
        {children}
      </div>
    </article>
  );
}
