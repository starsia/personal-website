import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-8 text-sm text-foreground/60 sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {year} {siteConfig.name}
        </p>
        <div className="flex gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
