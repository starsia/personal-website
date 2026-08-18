import { describe, expect, it } from "vitest";
import {
  getAllBlogPosts,
  getAllCaseStudies,
  getAllLearningLogEntries,
  getBlogPost,
  getCaseStudy,
} from "@/lib/content";

describe("content", () => {
  it("loads all case studies with required frontmatter", () => {
    const caseStudies = getAllCaseStudies();
    expect(caseStudies.length).toBeGreaterThan(0);
    for (const cs of caseStudies) {
      expect(cs.title).toBeTruthy();
      expect(cs.company).toBeTruthy();
      expect(cs.tags.length).toBeGreaterThan(0);
    }
  });

  it("sorts case studies by period, most recent first", () => {
    const caseStudies = getAllCaseStudies();
    const periods = caseStudies.map((cs) => cs.period);
    expect(periods[0]).toBe("2026–Present");
  });

  it("returns null for a case study slug that doesn't exist", () => {
    expect(getCaseStudy("does-not-exist")).toBeNull();
  });

  it("loads all blog posts sorted by date, newest first", () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBeGreaterThan(0);
    const dates = posts.map((p) => p.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("loads a single blog post by slug", () => {
    const post = getBlogPost("from-onprem-to-cloud");
    expect(post?.title).toContain("Early notes as a Cloud Engineer");
  });

  it("loads all learning log entries", () => {
    const entries = getAllLearningLogEntries();
    expect(entries.length).toBeGreaterThan(0);
  });
});
