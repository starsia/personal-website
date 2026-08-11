import type { Metadata } from "next";
import Link from "next/link";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        Case studies from my time as a Cloud Engineer, Software Engineer
        Intern, and Data Analyst Intern.
      </p>

      <div className="mt-10 flex flex-col gap-8">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/experience/${cs.slug}`}
            className="group block rounded-xl border border-foreground/10 p-6 transition-colors hover:border-foreground/25"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium group-hover:underline">
                {cs.role} · {cs.company}
              </h2>
              <span className="text-sm text-foreground/50">{cs.period}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{cs.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
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
    </div>
  );
}
