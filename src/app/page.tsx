import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { TopographicBackdrop } from "@/components/TopographicBackdrop";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <TopographicBackdrop />
      <p className="text-sm font-medium text-foreground/60">
        Hi, I&apos;m {siteConfig.firstName}.
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.title}
      </h1>
      <p className="max-w-xl text-lg text-foreground/70">
        I enjoy building software that works and creates value. My expertise lies in developing full-stack applications, data pipelines and AI interfaces.

        I currently am strengthening my skills in cloud infrastructure and operations for reliable and safe deployment.
      </p>
      <p className="max-w-xl text-lg text-foreground/70">
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <Link
          href="/experience"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
        >
          View my experiences
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
