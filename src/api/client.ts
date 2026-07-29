// ─────────────────────────────────────────────────────────────────────────────
// client.ts — static data "client"
// There is no backend anymore; this file just reproduces the same async
// shape (Promise-returning functions) the components already expect, backed
// by the static arrays in data.ts instead of network calls.
// ─────────────────────────────────────────────────────────────────────────────
import { PROJECTS, EXPERIENCE } from '../data'
import type { Project, Experience } from '../data'

export type { Project, Experience }

export const getProjects = () =>
  Promise.resolve([...PROJECTS].sort((a, b) => a.order - b.order))

export const getExperience = () =>
  Promise.resolve([...EXPERIENCE].sort((a, b) => a.order - b.order))
