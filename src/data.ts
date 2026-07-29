// ─────────────────────────────────────────────────────────────────────────────
// data.ts — all portfolio content lives here.
// This is a fully static site: edit this file, then `npm run build` (or push
// to trigger a Cloudflare Pages rebuild) to update the live site.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: number
  title: string
  summary: string
  tags: string[]
  repo_url: string | null
  live_url: string | null
  featured: boolean
  order: number
}

export interface Experience {
  id: number
  company: string
  role: string
  location: string | null
  start_date: string
  end_date: string | null
  description: string | null
  technologies: string[]
  order: number
}

export interface Skill {
  name: string
  category: string
  level: number  // 1–5
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    summary: "This site — built with React, deployed statically on Cloudflare Pages.",
    tags: ["React", "TypeScript", "Vite", "Cloudflare Pages"],
    repo_url: "https://github.com/you/portfolio",
    live_url: "https://yoursite.com",
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: "Probabilistic Energy Demand Forecasting",
    summary: "Deep learning system for forecasting UK electricity demand using LSTM-based models with uncertainty quantification.",
    tags: [
      "Python",
      "PyTorch",
      "LSTM",
      "Deep Learning",
      "Machine Learning",
      "Time Series",
      "Data Engineering",
    ],
    repo_url: "",
    live_url: "",
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: "Live Personal Trainer",
    summary: "Computer vision fitness assistant that uses MediaPipe BlazePose to analyze exercise form in real time and provide live posture feedback.",
    tags: ["Python", "MediaPipe", "Computer Vision", "Machine Learning"],
    repo_url: null,
    live_url: null,
    featured: true,
    order: 3,
  },
  {
    id: 4,
    title: "Insight Façade",
    summary: "Full-stack React application for managing and querying 5,000+ course records with advanced filtering and high-performance dataset processing.",
    tags: ["TypeScript", "React", "Mocha", "JSON", "REST API"],
    repo_url: null,
    live_url: null,
    featured: true,
    order: 4,
  },
  {
    id: 5,
    title: "Transit System Manager",
    summary: "Transit management system featuring a normalized Oracle database, REST API backend, and web frontend.",
    tags: ["JavaScript", "SQL", "Oracle", "HTML", "CSS"],
    repo_url: null,
    live_url: null,
    featured: false,
    order: 5,
  },
  {
    id: 6,
    title: "Discord AI Moderator & Assistant",
    summary: "GPT-4 powered Discord bot deployed across 100+ servers for moderation, contextual conversations, and automated rule enforcement.",
    tags: ["Python", "OpenAI API", "Discord API", "GPT-4"],
    repo_url: null,
    live_url: null,
    featured: true,
    order: 6,
  },
]

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: "Nexera Robotics",
    role: "Software Engineer",
    location: "Vancouver, BC",
    start_date: "2025-05-01",
    end_date: "2025-12-31",
    description: "- Reduced robot pick cycle time by 47% (15s → <8s) by refactoring a 10-module concurrent Ray pipeline, eliminating redundant computation and optimizing task scheduling.\n- Re-architected a 25+ table PostgreSQL database handling over 1,000 inserts every 7 seconds, restoring normalization and improving Grafana and Power BI analytics.\n- Built a Django configuration management service with role-based access, reducing hardware configuration updates from hours to minutes.\n- Automated 3D camera calibration using 2D object detection, Zivid point cloud projection, and surface matching, eliminating a daily manual process.\n- Developed a material instance segmentation model achieving over 95% accuracy and contributing to robot pick success rates exceeding 96%.",
    technologies: [
      "Python",
      "Ray",
      "PostgreSQL",
      "Django",
      "Grafana",
      "Power BI",
      "Zivid",
      "Computer Vision",
      "Machine Learning",
    ],
    order: 1,
  },
  {
    id: 2,
    company: "UBC Agrobot",
    role: "Machine Learning Engineer",
    location: "Vancouver, BC",
    start_date: "2024-09-01",
    end_date: "2025-09-30",
    description: "- Trained a Faster R-CNN model for weed detection achieving over 95% accuracy.\n- Implemented a real-time computer vision pipeline capable of processing 30 FPS video streams with low latency.\n- Developed dataset conversion scripts to transform multiple annotation formats into YOLO datasets.",
    technologies: [
      "Python",
      "TensorFlow",
      "Faster R-CNN",
      "YOLO",
      "Computer Vision",
      "ARC Sockeye",
    ],
    order: 2,
  },
  {
    id: 3,
    company: "University of British Columbia",
    role: "Java Software Construction Tutor",
    location: "Vancouver, BC",
    start_date: "2023-02-01",
    end_date: "2025-01-31",
    description: "- Tutored students in Java programming and object-oriented design.\n- Improved student exam scores by over 20% during a single academic term.\n- Explained advanced OOP concepts including inheritance, interfaces, abstraction, and software design principles.",
    technologies: [
      "Java",
      "Object-Oriented Programming",
      "Software Design",
    ],
    order: 3,
  },
]

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
