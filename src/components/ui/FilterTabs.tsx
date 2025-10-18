'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Icon from './Icon'

interface FilterTab {
  id: string
  label: string
  count?: number
}

interface FilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

const FilterTabs = ({ tabs, activeTab, onTabChange, className = '' }: FilterTabsProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  return (
    <div className={cn('flex flex-wrap justify-center gap-2 mb-12', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          onMouseEnter={() => setHoveredTab(tab.id)}
          onMouseLeave={() => setHoveredTab(null)}
          className={cn(
            'relative px-6 py-3 rounded-full font-semibold transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            activeTab === tab.id
              ? 'bg-primary-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 shadow-md hover:shadow-lg',
            hoveredTab === tab.id && activeTab !== tab.id && 'scale-105'
          )}
        >
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                'text-xs px-2 py-1 rounded-full',
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-500'
              )}>
                {tab.count}
              </span>
            )}
          </span>
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full" />
          )}
          
          {/* Hover effect */}
          <div className={cn(
            'absolute inset-0 bg-primary-50 rounded-full transition-opacity duration-300',
            hoveredTab === tab.id && activeTab !== tab.id ? 'opacity-100' : 'opacity-0'
          )} />
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
