import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

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

export const getProjects  = () => api.get<Project[]>('/projects').then(r => r.data)
export const getExperience = () => api.get<Experience[]>('/experience').then(r => r.data)
