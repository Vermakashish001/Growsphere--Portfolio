import { ProjectCategory, NavigationLink } from '@/types';

// Navigation configuration
export const NAVIGATION_LINKS: NavigationLink[] = [
  { name: 'Home', path: '#home', type: 'scroll' },
  { name: 'Services', path: '#services', type: 'scroll' },
  { name: 'Portfolio', path: '#portfolio', type: 'scroll' },
  { name: 'Testimonials', path: '#testimonials', type: 'scroll' },
  { name: 'Contact', path: '#contact', type: 'scroll', isButton: true },
];

// Project categories with display information
export const PROJECT_CATEGORIES: Record<ProjectCategory, { label: string; description: string }> = {
  ecommerce: { 
    label: 'E-commerce', 
    description: 'Online stores and marketplace solutions' 
  },
  gym: { 
    label: 'Fitness & Gym', 
    description: 'Fitness centers and health clubs' 
  },
  health: { 
    label: 'Healthcare', 
    description: 'Medical and wellness platforms' 
  },
  social: { 
    label: 'Social & Community', 
    description: 'Social networks and community platforms' 
  },
  education: { 
    label: 'Education', 
    description: 'Schools and educational institutions' 
  },
  restaurant: { 
    label: 'Food & Restaurant', 
    description: 'Restaurants and food service businesses' 
  },
  corporate: { 
    label: 'Corporate', 
    description: 'Business and corporate websites' 
  },
  other: { 
    label: 'Other', 
    description: 'Custom and specialized solutions' 
  },
};

// Service categories
export const SERVICES = [
  {
    id: 1,
    title: 'Custom Website Development',
    description: 'Tailored web solutions built from scratch to meet your unique business needs',
    icon: 'code',
    features: [
      'Custom design and functionality',
      'Responsive mobile-first approach',
      'SEO optimization',
      'Performance optimization',
      'Cross-browser compatibility',
      'Modern UI/UX design',
      'Database integration',
      'API development'
    ],
    deliveryTime: '2-4 weeks',
    startingPrice: 15000
  },
  {
    id: 2,
    title: 'E-commerce Solutions',
    description: 'Complete online store setup with payment processing and inventory management',
    icon: 'shopping-cart',
    features: [
      'Product catalog management',
      'Secure payment gateway integration',
      'Inventory tracking',
      'Order management system',
      'Customer account portal',
      'Shopping cart functionality',
      'Multi-currency support',
      'Analytics dashboard'
    ],
    deliveryTime: '3-6 weeks',
    startingPrice: 25000
  },
  {
    id: 3,
    title: 'Business Website Package',
    description: 'Professional websites for small to medium businesses with essential features',
    icon: 'building',
    features: [
      'Professional design',
      'Contact forms and lead capture',
      'Google Maps integration',
      'Social media integration',
      'Basic SEO setup',
      'Mobile responsive',
      'Content management',
      'Performance optimization'
    ],
    deliveryTime: '1-3 weeks',
    startingPrice: 8000
  }
];

// Company statistics
export const BUSINESS_STATS = {
  projectsCompleted: 100,
  clientSatisfaction: 98,
  yearsExperience: 3,
  supportAvailability: '24/7'
};

// Contact information
export const CONTACT_INFO = {
  email: 'growsphere@zohomail.in',
  phone: '+91 62071-07305',
  location: 'India',
  socialMedia: {
    linkedin: '#',
    twitter: '#',
    github: '#'
  }
};

// Form validation constants
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50,
    required: true
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: true
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    required: false
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    required: true
  }
};

// Animation and UI constants
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};
