import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact" };

const links = [
  { label: "Email", href: `mailto:${siteConfig.email}`, value: siteConfig.email },
  { label: "GitHub", href: siteConfig.links.github, value: "github.com" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, value: "linkedin.com" },
];

// TODO: add a "Resume" row linking to /resume.pdf once public/resume.pdf exists
// (requires LibreOffice locally to convert the source .docx — not installed on this machine).

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 max-w-xl text-foreground/70">
        Open to software, data, and cloud engineering opportunities. The
        fastest way to reach me is email.
      </p>

      <div className="mt-8 flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="flex items-center justify-between py-4 text-sm transition-colors hover:text-foreground/60"
          >
            <span className="font-medium">{link.label}</span>
            <span className="text-foreground/50">{link.value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
