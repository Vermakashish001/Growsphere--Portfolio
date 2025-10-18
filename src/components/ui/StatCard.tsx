'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/hooks'
import Icon, { IconName } from './Icon'

interface StatCardProps {
  value: string | number
  label: string
  icon: IconName
  delay?: number
  countUp?: boolean
}

const StatCard = ({ value, label, icon, delay = 0, countUp = false }: StatCardProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>()
  const [displayValue, setDisplayValue] = useState<string | number>(countUp ? 0 : value)

  useEffect(() => {
    if (isIntersecting && countUp && typeof value === 'number') {
      let startValue = 0
      const increment = value / 50 // 50 steps for smooth animation
      const timer = setInterval(() => {
        startValue += increment
        if (startValue >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(startValue))
        }
      }, 30)

      return () => clearInterval(timer)
    } else if (isIntersecting) {
      setDisplayValue(value)
    }
  }, [isIntersecting, value, countUp])

  return (
    <div
      ref={elementRef}
      className={`text-center transition-all duration-700 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon name={icon} size={28} className="text-white" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {displayValue}{typeof value === 'string' && value.includes('%') ? '%' : ''}
        {typeof value === 'string' && value.includes('+') ? '+' : ''}
      </div>
      <div className="text-primary-200 text-sm md:text-base">{label}</div>
    </div>
  )
}

export default StatCard
