import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/content";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return { title: caseStudy.title };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <CaseStudyLayout frontmatter={caseStudy}>
      <MDXRemote source={caseStudy.content} />
    </CaseStudyLayout>
  );
}
