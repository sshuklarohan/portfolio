import { useQuery } from '@tanstack/react-query'
import { getProjects, getExperience } from '../api/client'

export const useProjects = (featured?: boolean) =>
  useQuery({
    queryKey: ['projects', { featured }],
    queryFn: () => getProjects().then(ps =>
      featured !== undefined ? ps.filter(p => p.featured === featured) : ps
    ),
  })

export const useExperience = () =>
  useQuery({ queryKey: ['experience'], queryFn: getExperience })
