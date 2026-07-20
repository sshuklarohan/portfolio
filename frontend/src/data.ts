// ─────────────────────────────────────────────────────────────────────────────
// data.ts — hardcoded frontend content
// Skills live here. Edit and `docker compose up --build` to update.
// ─────────────────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  category: string
  level: number  // 1–5
}

export const SKILLS: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", level: 5 },
  { name: "C++", category: "Languages", level: 5 },
  { name: "Java", category: "Languages", level: 5 },
  { name: "TypeScript", category: "Languages", level: 5 },
  { name: "JavaScript", category: "Languages", level: 5 },
  { name: "SQL", category: "Languages", level: 5 },

  // Backend
  { name: "FastAPI",    category: "Backend",   level: 5 },
  { name: "Node.js",    category: "Backend",   level: 5 },
  { name: "Django", category: "Backend", level: 5 },
  { name: "REST", category: "Backend", level: 5 },
  { name: "PostgreSQL", category: "Backend", level: 5 },
  
  // Frontend
  { name: "React",      category: "Frontend",  level: 5 },
  { name: "HTML",    category: "Frontend",  level: 5 },
  { name: "CSS",        category: "Frontend",  level: 5 },


  // Machine Learning & AI
  { name: "TensorFlow", category: "Machine Learning", level: 5 },
  { name: "Computer Vision", category: "Machine Learning", level: 5 },
  { name: "PyTorch", category: "Machine Learning", level: 5 },
  { name: "RoboFlow", category: "Machine Learning", level: 5 },

  // Tools
  { name: "Git", category: "Tools", level: 5 },
  { name: "GitHub", category: "Tools", level: 5 },
  { name: "Grafana", category: "Tools", level: 5 },
  { name: "Power BI", category: "Tools", level: 5 },
  { name: "Docker",     category: "Tools",    level: 5 },
  { name: "AWS",        category: "Tools",    level: 5 },
]
