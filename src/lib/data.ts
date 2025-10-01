import data from '../../data.json'

export interface Project {
  title: string
  description: string
  image: string
  link: string
  id?: number
  category?: string
  technologies?: string[]
  features?: string[]
}

export interface WebsiteData {
  websiteTitle: string
  websiteDescription: string
  author: string
  authorEmail: string
  mobile: string
  projects: Project[]
}

export const getWebsiteData = (): WebsiteData => {
  return data as WebsiteData
}

export const getProjects = (): Project[] => {
  return data.projects
}

export const getContactInfo = () => {
  return {
    email: data.authorEmail,
    phone: data.mobile,
    author: data.author
  }
}