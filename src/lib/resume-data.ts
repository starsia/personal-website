export const profileSummary =
  "Software Engineer with a desire to create value and impact. I specialise in database systems. I enjoy designing fast and efficient queries based on fundamentals in query tuning, data modelling techniques, denormalisation, and transactions in relational databases. Strong interest in safe and reliable systems that reduce toil. Curious and proactive with strong presentation skills.";

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
      "Django",
      "Spring Boot"
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "Supabase", "Firebase", "Neo4j"],
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

export const education = [{
  school: "National University of Singapore (NUS)",
  degree: "Bachelor of Computing in Computer Science, NUS College",
  period: "2022–2026",
  courses: [
    "Software Engineering Principles and Patterns",
    "Design and Analysis of Algorithms",
    "Introduction to AI and Machine Learning",
    "Operating Systems",
    "Computer Organisation",
    "Database Systems Implementation",
    "Big Data Systems for Data Science",
    "Database Applications Design and Tuning",
    "Internet Architecture",
    "Introduction to Computer Networks",
    "Programming Methodology II (OOP)",
    "Programming Methodology I",
    "Effective Communication for Computing Professionals",
    "Software Engineering",
    "Database Systems",
    "Linear Algebra",
    "Discrete Structures",
    "Calculus for Computing",
    "Quantitative Reasoning with Data",
    "Probability and Statistics",
    "Digital and AI Ethics",
    "GIS Design and Practices",
    "Introduction to GIS",
    "Solving Energy and Environmental Problems",
  ],},
  {
  school: "Institut National des Sciences Appliquées de Lyon (INSA)",
  degree: "Department of Computer Science, Department of Telecommunications",
  period: "2025-2025",
  courses: [
    "Foundations of Data Engineering",
    "Deep Learning",
    "Distributed Systems and Middleware",
    "Data Mining",
    "Network Engineering",]
  }] as const;

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
    tags: ["Analytics Dashboard", "Qlik Sense"],
  },
] as const;
