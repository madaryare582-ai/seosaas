export type ProjectStatus = "Draft" | "Active" | "Completed"

export type ProjectStats = {
  keywords: number
  topicClusters: number
  plannedArticles: number
  publishedArticles: number
}

export type Project = {
  id: string
  name: string
  primaryNiche: string
  targetCountry: string
  language: string
  status: ProjectStatus
  createdAt: string
  stats: ProjectStats
}

const SEED_PROJECTS: Project[] = [
  {
    id: "proj-001",
    name: "Fitness & Nutrition Blog",
    primaryNiche: "Health & Fitness",
    targetCountry: "United States",
    language: "English",
    status: "Active",
    createdAt: "2026-05-14",
    stats: { keywords: 47, topicClusters: 8, plannedArticles: 32, publishedArticles: 14 },
  },
  {
    id: "proj-002",
    name: "SaaS Marketing Hub",
    primaryNiche: "B2B SaaS",
    targetCountry: "United Kingdom",
    language: "English",
    status: "Active",
    createdAt: "2026-06-01",
    stats: { keywords: 29, topicClusters: 5, plannedArticles: 18, publishedArticles: 6 },
  },
  {
    id: "proj-003",
    name: "Personal Finance Tips",
    primaryNiche: "Personal Finance",
    targetCountry: "Canada",
    language: "English",
    status: "Draft",
    createdAt: "2026-06-20",
    stats: { keywords: 0, topicClusters: 0, plannedArticles: 0, publishedArticles: 0 },
  },
]

const STORAGE_KEY = "hiigsi_projects"

function initStorage(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Project[]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PROJECTS))
    return SEED_PROJECTS
  } catch {
    return SEED_PROJECTS
  }
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") return SEED_PROJECTS
  return initStorage()
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id)
}

export function saveProject(project: Project): void {
  if (typeof window === "undefined") return
  const all = getProjects()
  const idx = all.findIndex((p) => p.id === project.id)
  if (idx >= 0) all[idx] = project
  else all.push(project)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function deleteProjectById(id: string): void {
  if (typeof window === "undefined") return
  const filtered = getProjects().filter((p) => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function createProject(data: {
  name: string
  primaryNiche: string
  targetCountry: string
  language: string
}): Project {
  const project: Project = {
    id: `proj-${Date.now()}`,
    name: data.name,
    primaryNiche: data.primaryNiche,
    targetCountry: data.targetCountry,
    language: data.language,
    status: "Draft",
    createdAt: new Date().toISOString().split("T")[0],
    stats: { keywords: 0, topicClusters: 0, plannedArticles: 0, publishedArticles: 0 },
  }
  saveProject(project)
  return project
}
