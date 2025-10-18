'use client'

import { 
  Code2, 
  ShoppingCart, 
  Building2, 
  Search, 
  Heart, 
  Check, 
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Star,
  ExternalLink,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Users,
  Target,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Palette,
  Settings,
  MessageCircle,
  Send,
  ArrowUp,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
  LucideIcon
} from 'lucide-react'

export type IconName = 
  | 'code' | 'shopping-cart' | 'building' | 'search' | 'heart' | 'check'
  | 'chevron-down' | 'chevron-up' | 'arrow-right' | 'mail' | 'phone' | 'map-pin' | 'star'
  | 'external-link' | 'menu' | 'x' | 'github' | 'linkedin' | 'twitter'
  | 'instagram' | 'globe' | 'users' | 'target' | 'trending-up' | 'award'
  | 'clock' | 'zap' | 'shield' | 'smartphone' | 'monitor' | 'palette'
  | 'settings' | 'message-circle' | 'send' | 'arrow-up' | 'play' | 'pause'
  | 'chevron-left' | 'chevron-right' | 'eye'

const iconMap: Record<IconName, LucideIcon> = {
  'code': Code2,
  'shopping-cart': ShoppingCart,
  'building': Building2,
  'search': Search,
  'heart': Heart,
  'check': Check,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'arrow-right': ArrowRight,
  'mail': Mail,
  'phone': Phone,
  'map-pin': MapPin,
  'star': Star,
  'external-link': ExternalLink,
  'menu': Menu,
  'x': X,
  'github': Github,
  'linkedin': Linkedin,
  'twitter': Twitter,
  'instagram': Instagram,
  'globe': Globe,
  'users': Users,
  'target': Target,
  'trending-up': TrendingUp,
  'award': Award,
  'clock': Clock,
  'zap': Zap,
  'shield': Shield,
  'smartphone': Smartphone,
  'monitor': Monitor,
  'palette': Palette,
  'settings': Settings,
  'message-circle': MessageCircle,
  'send': Send,
  'arrow-up': ArrowUp,
  'play': Play,
  'pause': Pause,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'eye': Eye
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}

const Icon = ({ name, size = 24, className = '', strokeWidth = 2 }: IconProps) => {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return <Code2 size={size} className={className} strokeWidth={strokeWidth} />
  }

  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />
}

export default Icon
