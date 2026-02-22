import { defineStore } from 'pinia'
import axios from 'axios'
import { keycloak } from '../services/keycloak'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.request.use(async (config) => {
  if (keycloak && keycloak.authenticated) {
    if (keycloak.isTokenExpired(5)) {
      try {
        await keycloak.updateToken(30)
      } catch (err) {
        console.error('Failed to refresh token', err)
        keycloak.login()
      }
    }
    config.headers.Authorization = `Bearer ${keycloak.token}`
  }
  return config
})

export interface Project {
  id?: number
  imageUrl: string
  linkUrl: string
  sourceUrl: string
  orderIndex: number
  titleEn: string
  descriptionEn: string
  titleIt: string
  descriptionIt: string
}

export interface Experience {
  id?: number
  company: string
  orderIndex: number
  titleEn: string
  periodEn: string
  descriptionEn: string
  titleIt: string
  periodIt: string
  descriptionIt: string
}

export interface Education {
  id?: number
  school: string
  orderIndex: number
  degreeEn: string
  periodEn: string
  descriptionEn: string
  degreeIt: string
  periodIt: string
  descriptionIt: string
}

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    projects: [] as Project[],
    experiences: [] as Experience[],
    educations: [] as Education[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const [projRes, expRes, eduRes] = await Promise.all([
          api.get<Project[]>('/projects'),
          api.get<Experience[]>('/experiences'),
          api.get<Education[]>('/educations')
        ])
        this.projects = projRes.data
        this.experiences = expRes.data
        this.educations = eduRes.data
      } catch (err: any) {
        console.error('Fail to load data', err)
        this.error = err.message || 'Failed to load portfolio data'
      } finally {
        this.loading = false
      }
    },

    async saveProject(project: Project) {
      try {
        const res = await api.post<Project>('/projects', project)
        const idx = this.projects.findIndex(p => p.id === res.data.id)
        if (idx !== -1) {
          this.projects[idx] = res.data
        } else {
          this.projects.push(res.data)
        }
        // re-sort by orderIndex
        this.projects.sort((a,b) => a.orderIndex - b.orderIndex)
      } catch (err) {
        console.error('Failed to save project', err)
        throw err
      }
    },

    async deleteProject(id: number) {
      try {
         await api.delete(`/projects/${id}`)
         this.projects = this.projects.filter(p => p.id !== id)
      } catch (err) {
        console.error('Failed to delete project', err)
        throw err
      }
    },

    async saveExperience(exp: Experience) {
      try {
        const res = await api.post<Experience>('/experiences', exp)
        const idx = this.experiences.findIndex(e => e.id === res.data.id)
        if (idx !== -1) {
          this.experiences[idx] = res.data
        } else {
          this.experiences.push(res.data)
        }
        this.experiences.sort((a,b) => a.orderIndex - b.orderIndex)
      } catch (err) {
        console.error('Failed to save experience', err)
        throw err
      }
    },

    async deleteExperience(id: number) {
      try {
         await api.delete(`/experiences/${id}`)
         this.experiences = this.experiences.filter(e => e.id !== id)
      } catch (err) {
        console.error('Failed to delete exp', err)
        throw err
      }
    },

    async saveEducation(edu: Education) {
      try {
        const res = await api.post<Education>('/educations', edu)
        const idx = this.educations.findIndex(e => e.id === res.data.id)
        if (idx !== -1) {
          this.educations[idx] = res.data
        } else {
          this.educations.push(res.data)
        }
        this.educations.sort((a,b) => a.orderIndex - b.orderIndex)
      } catch (err) {
        console.error('Failed to save education', err)
        throw err
      }
    },

    async deleteEducation(id: number) {
      try {
         await api.delete(`/educations/${id}`)
         this.educations = this.educations.filter(e => e.id !== id)
      } catch (err) {
        console.error('Failed to delete education', err)
        throw err
      }
    }
  }
})
