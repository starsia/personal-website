import type { Metadata } from "next";
import {
  coCurriculars,
  education,
  languages,
  profileSummary,
  skillGroups,
} from "@/lib/resume-data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
        <p className="mt-4 max-w-2xl text-foreground/70">{profileSummary}</p>
      </div>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/50">
          Skills
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium">{group.category}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/50">
          Education
        </h2>
        <div className="mt-4">
          <p className="font-medium">{education.school}</p>
          <p className="text-sm text-foreground/70">
            {education.degree} · {education.period}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {education.courses.map((course) => (
              <span
                key={course}
                className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/50">
          Languages
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {languages.map((lang) => (
            <span
              key={lang.name}
              className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70"
            >
              {lang.name} — {lang.level}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/50">
          Co-Curricular Activities
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-foreground/70">
          {coCurriculars.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-foreground/30">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
