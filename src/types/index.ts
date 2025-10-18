// Core business types
export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  owner: string;
  email: string;
  phone: string;
  location?: string;
  socialMedia?: SocialMedia;
}

export interface SocialMedia {
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  github?: string;
}

// Project and Portfolio types
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: ProjectCategory;
  technologies: string[];
  features: string[];
  status: 'completed' | 'in-progress' | 'planned';
  clientName?: string;
  completedDate?: string;
  testimonial?: Testimonial;
}

export type ProjectCategory = 'ecommerce' | 'gym' | 'health' | 'social' | 'education' | 'restaurant' | 'corporate' | 'other';

// Service offerings
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing?: ServicePricing;
  deliveryTime: string;
  startingPrice?: number;
}

export interface ServicePricing {
  basic: PricingTier;
  standard: PricingTier;
  premium: PricingTier;
}

export interface PricingTier {
  price: number;
  features: string[];
  deliveryTime: string;
}

// Testimonials and reviews
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  message: string;
  image?: string;
  projectId?: number;
}

// Navigation and UI
export interface NavigationLink {
  name: string;
  path: string;
  type: 'scroll' | 'link' | 'external';
  isButton?: boolean;
  icon?: string;
}

// Forms and contact
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  serviceInterest?: string;
  budget?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Content and SEO
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface BusinessStats {
  projectsCompleted: number;
  clientSatisfaction: number;
  yearsExperience: number;
  supportAvailability: string;
}
