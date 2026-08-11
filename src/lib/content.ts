import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CaseStudyFrontmatter = {
  title: string;
  company: string;
  role: string;
  period: string;
  excerpt: string;
  tags: string[];
};

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type ContentEntry<T> = T & { slug: string; content: string };

const contentRoot = path.join(process.cwd(), "content");

function collectionDir(collection: string) {
  return path.join(contentRoot, collection);
}

function readEntry<T>(collection: string, slug: string): ContentEntry<T> | null {
  const filePath = path.join(collectionDir(collection), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as T), slug, content };
}

function readAllEntries<T>(collection: string): ContentEntry<T>[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => readEntry<T>(collection, file.replace(/\.mdx$/, ""))!)
    .filter(Boolean);
}

function readAllSlugs(collection: string): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Case studies (Experience section) — sorted by period, most recent first.
export function getAllCaseStudies() {
  return readAllEntries<CaseStudyFrontmatter>("case-studies").sort((a, b) =>
    b.period.localeCompare(a.period),
  );
}

export function getCaseStudy(slug: string) {
  return readEntry<CaseStudyFrontmatter>("case-studies", slug);
}

export function getAllCaseStudySlugs() {
  return readAllSlugs("case-studies");
}

// Blog and Learning Log — both dated post collections, sorted newest first.
function getAllPosts(collection: "blog" | "learning-log") {
  return readAllEntries<PostFrontmatter>(collection).sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

function getPost(collection: "blog" | "learning-log", slug: string) {
  return readEntry<PostFrontmatter>(collection, slug);
}

export const getAllBlogPosts = () => getAllPosts("blog");
export const getBlogPost = (slug: string) => getPost("blog", slug);
export const getAllBlogSlugs = () => readAllSlugs("blog");

export const getAllLearningLogEntries = () => getAllPosts("learning-log");
export const getLearningLogEntry = (slug: string) => getPost("learning-log", slug);
export const getAllLearningLogSlugs = () => readAllSlugs("learning-log");
