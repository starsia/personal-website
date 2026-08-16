import type { Metadata } from "next";
import { getAllLearningLogEntries } from "@/lib/content";
import { PostListing } from "@/components/PostListing";

export const metadata: Metadata = { title: "Learning Log" };

export default function LearningLogPage() {
  const entries = getAllLearningLogEntries();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Learning Log</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        A dated log of what I&apos;m currently learning. From deployment
        practices, Spring Boot, and whatever outside of this site.
      </p>
      <PostListing posts={entries} basePath="/learning-log" />
    </div>
  );
}
