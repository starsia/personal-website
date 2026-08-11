import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostLayout } from "@/components/PostLayout";
import { getAllBlogSlugs, getBlogPost } from "@/lib/content";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <PostLayout frontmatter={post} backHref="/blog" backLabel="Blog">
      <MDXRemote source={post.content} />
    </PostLayout>
  );
}
