'use client'

import { useState } from 'react'
import { Service } from '@/types'
import { formatCurrency } from '@/utils'
import AnimatedCard from './ui/AnimatedCard'
import Button from './ui/Button'
import Icon, { IconName } from './ui/Icon'

interface ServiceCardProps {
  service: Service
  index: number
  onGetQuote?: (service: Service) => void
}

const ServiceCard = ({ service, index, onGetQuote }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const iconName = getIconName(service.icon)

  const handleGetQuote = () => {
    if (onGetQuote) {
      onGetQuote(service)
    }
  }

  return (
    <AnimatedCard 
      delay={index * 100}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100"
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon name={iconName} size={28} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary-700 transition-colors">
            {service.title}
          </h3>
          
          {service.startingPrice && (
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-primary-700">
              <Icon name="zap" size={14} className="mr-1" />
              From {formatCurrency(service.startingPrice)}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-gray-600 mb-6 leading-relaxed text-center">
          {service.description}
        </p>
        
        {/* Features */}
        <div className="space-y-3 mb-6">
          {service.features.slice(0, isExpanded ? service.features.length : 3).map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-center text-gray-700 group/feature hover:text-primary-600 transition-colors"
            >
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover/feature:bg-green-200 transition-colors">
                <Icon name="check" size={12} className="text-green-600" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          {service.features.length > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-primary-600 text-sm hover:text-primary-700 transition-colors mt-2"
            >
              <Icon 
                name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                size={16} 
                className="mr-1" 
              />
              {isExpanded ? 'Show less' : `+${service.features.length - 3} more features`}
            </button>
          )}
        </div>
        
        {/* Delivery time */}
        <div className="flex items-center justify-center text-sm text-gray-500 mb-6 bg-gray-50 rounded-lg p-3">
          <Icon name="clock" size={16} className="mr-2" />
          Delivery: {service.deliveryTime}
        </div>
        
        {/* CTA Button */}
        <Button
          variant="gradient"
          size="lg"
          fullWidth
          icon="arrow-right"
          iconPosition="right"
          onClick={handleGetQuote}
          className="group-hover:shadow-lg"
        >
          Get Quote
        </Button>
      </div>
    </AnimatedCard>
  )
}

// Map service icon names to Lucide icon names
const getIconName = (iconName: string): IconName => {
  const iconMap: Record<string, IconName> = {
    'Code': 'code',
    'ShoppingCart': 'shopping-cart',
    'Building': 'building',
    'Search': 'search',
    'Heart': 'heart',
    'Monitor': 'monitor',
    'Smartphone': 'smartphone',
    'Palette': 'palette',
    'Settings': 'settings',
    'Shield': 'shield'
  }
  
  return iconMap[iconName] || 'code'
}

export default ServiceCard
