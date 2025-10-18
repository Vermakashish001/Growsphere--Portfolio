'use client'

import { ReactNode } from 'react'
import { useIntersectionObserver } from '@/hooks'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  hover?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const AnimatedCard = ({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  hover = true,
  onClick,
  onMouseEnter,
  onMouseLeave
}: AnimatedCardProps) => {
  const { elementRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  })

  const directionClasses = {
    up: 'translate-y-10',
    down: '-translate-y-10',
    left: 'translate-x-10',
    right: '-translate-x-10',
    scale: 'scale-95'
  }

  const hoverClasses = hover ? 'hover:-translate-y-2 hover:shadow-xl hover:scale-105' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div
      ref={elementRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'transition-all duration-500 ease-out',
        isIntersecting 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
          : `opacity-0 ${directionClasses[direction]}`,
        hoverClasses,
        clickableClasses,
        className
      )}
      style={{ 
        transitionDelay: isIntersecting ? `${delay}ms` : '0ms' 
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedCard
