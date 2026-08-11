import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostLayout } from "@/components/PostLayout";
import { getAllLearningLogSlugs, getLearningLogEntry } from "@/lib/content";

export function generateStaticParams() {
  return getAllLearningLogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLearningLogEntry(slug);
  if (!entry) return {};
  return { title: entry.title };
}

export default async function LearningLogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLearningLogEntry(slug);
  if (!entry) notFound();

  return (
    <PostLayout frontmatter={entry} backHref="/learning-log" backLabel="Learning Log">
      <MDXRemote source={entry.content} />
    </PostLayout>
  );
}
