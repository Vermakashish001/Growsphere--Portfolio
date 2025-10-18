import data from '../../data.json'
import { BusinessInfo, Project, Service, Testimonial, BusinessStats, SEOData } from '@/types'

// Re-export commonly used types for backward compatibility
export type { Project, Service, Testimonial, BusinessInfo, BusinessStats, SEOData } from '@/types'

// Enhanced data access layer with proper TypeScript types
export const getBusinessInfo = (): BusinessInfo => {
  return data.businessInfo as BusinessInfo
}

export const getProjects = (): Project[] => {
  return data.projects as Project[]
}

export const getProjectById = (id: number): Project | undefined => {
  return data.projects.find(project => project.id === id) as Project | undefined
}

export const getProjectsByCategory = (category: string): Project[] => {
  return data.projects.filter(project => project.category === category) as Project[]
}

export const getServices = (): Service[] => {
  return data.services as Service[]
}

export const getTestimonials = (): Testimonial[] => {
  return data.testimonials as Testimonial[]
}

export const getBusinessStats = (): BusinessStats => {
  return data.businessStats as BusinessStats
}

export const getSEOData = (): SEOData => {
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    ogImage: data.seo.ogImage
  }
}

export const getContactInfo = () => {
  const businessInfo = getBusinessInfo()
  return {
    email: businessInfo.email,
    phone: businessInfo.phone,
    owner: businessInfo.owner,
    location: businessInfo.location,
    socialMedia: businessInfo.socialMedia
  }
}

// Legacy compatibility functions
export const getWebsiteData = () => {
  const businessInfo = getBusinessInfo()
  return {
    websiteTitle: businessInfo.name,
    websiteDescription: businessInfo.tagline,
    author: businessInfo.owner,
    authorEmail: businessInfo.email,
    mobile: businessInfo.phone,
    navigation: [] // Empty array for now, can be populated from data.json if needed
  }
}

// Utility functions
export const getFeaturedProjects = (limit: number = 3): Project[] => {
  return getProjects().slice(0, limit)
}

export const getProjectCategories = (): string[] => {
  const projects = getProjects()
  return Array.from(new Set(projects.map(project => project.category)))
}