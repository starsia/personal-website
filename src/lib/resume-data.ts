export const profileSummary =
  "Software Engineer with a desire to create value and impact. Experienced in building and deploying end-to-end full-stack applications, ETL data pipelines and on-premise infrastructure. Competent in database design, with hands-on exposure to container orchestration and CI/CD practices. Strong interest in system reliability and scalable backend systems. Curious and independent with strong presentation skills.";

export const skillGroups = [
  {
    category: "Programming",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "Go", "C#", "SQL", "Bash"],
  },
  {
    category: "Web",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Fastify",
      "FastAPI",
      "tRPC",
      "REST APIs",
      "Drizzle ORM",
      "Tailwind",
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "Supabase", "Firebase"],
  },
  {
    category: "Data Engineering",
    skills: ["Apache Airflow", "Spark", "MapReduce", "Cron"],
  },
  {
    category: "Testing",
    skills: ["Vitest", "Jest", "Playwright", "JUnit"],
  },
  {
    category: "Cloud, DevOps & Infrastructure",
    skills: [
      "Linux",
      "AWS Certified Cloud Practitioner",
      "Azure Fundamentals",
      "Docker",
      "Kubernetes",
      "Terraform",
      "VMware vSphere",
      "CI/CD",
      "GitHub Actions",
      "Vercel",
    ],
  },
  {
    category: "Analytics & GIS",
    skills: ["Qlik Sense", "Kepler.gl", "ArcGIS Pro", "QGIS"],
  },
  {
    category: "Tools",
    skills: ["Git", "Vim", "Figma"],
  },
] as const;

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Chinese", level: "Fluent" },
  { name: "French", level: "A2" },
  { name: "Thai", level: "A1" },
] as const;

export const coCurriculars = [
  "Oversaw welfare and safety of 36 residents as a Residential Assistant",
  "Organised ClimbNUS 2024 as Project Director, attracting over 300 participants",
  "Captain of the NUS College Climbing Club, planning weekly activities for 55 members",
] as const;

export const education = {
  school: "National University of Singapore (NUS)",
  degree: "Bachelor of Computing in Computer Science, NUS College",
  period: "2022–2026",
  courses: [
    "Software Engineering Principles and Patterns",
    "Operating Systems",
    "Database Systems Implementation",
    "Big Data Systems for Data Science",
    "Data Structures and Algorithms",
    "Database Applications Design and Tuning",
    "Internet Architecture",
    "GIS",
    "Solving Energy and Environmental Problems",
    "Foundations of Data Engineering",
    "Deep Learning",
    "Distributed Systems and Middleware",
    "Data Mining",
    "Network Engineering",
  ],
} as const;

export const experiences = [
  {
    slug: "ncs",
    company: "NCS Pte Ltd",
    role: "Cloud Engineer",
    period: "2026–Present",
    location: "Singapore",
    blurb: "IT infrastructure MNC based in Singapore.",
    tags: ["Terraform", "Grafana", "CloudWatch", "VMware ESXi", "Windows Server", "Networking"],
  },
  {
    slug: "lalia",
    company: "Lalia Pte Ltd",
    role: "Software Engineer Intern",
    period: "2025",
    location: "Singapore",
    blurb: "Fast-growing e-learning company in the education sector with a strong SEA client base.",
    tags: ["React", "Supabase", "LangChain", "Embeddings", "TDD", "Scrum"],
  },
  {
    slug: "nea",
    company: "National Environment Agency",
    role: "Data Analyst Intern",
    period: "2022",
    location: "Singapore",
    blurb: "Public agency responsible for environmental policy and management in Singapore.",
    tags: ["Analytics Dashboard", "Qlik Sense", "GIS", "Database Design"],
  },
] as const;
