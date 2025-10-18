'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Icon, { IconName } from './Icon'

interface HeroButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'lg' | 'xl'
  loading?: boolean
  icon?: IconName
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'xl', 
    loading = false, 
    disabled, 
    children, 
    icon,
    iconPosition = 'right',
    fullWidth = false,
    ...props 
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-2xl font-bold',
      'focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-all duration-400 ease-out tracking-wide',
      'transform hover:scale-110 active:scale-95',
      'shadow-2xl hover:shadow-3xl',
      fullWidth && 'w-full'
    )
    
    const variants = {
      primary: cn(
        'bg-white text-primary-700 hover:bg-gray-50',
        'focus:ring-white/30',
        'shadow-white/20 hover:shadow-white/30',
        'border-2 border-white/20 hover:border-white/30'
      ),
      secondary: cn(
        'bg-white/10 backdrop-blur-md text-white border-2 border-white/30',
        'hover:bg-white/20 hover:border-white/50',
        'focus:ring-white/20',
        'shadow-black/20 hover:shadow-black/30'
      )
    }
    
    const sizes = {
      lg: 'px-8 py-4 text-lg gap-3 min-h-[56px]',
      xl: 'px-12 py-5 text-xl gap-4 min-h-[64px]'
    }

    const iconSize = {
      lg: 20,
      xl: 24
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
            Loading...
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <Icon name={icon} size={iconSize[size]} />
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <Icon name={icon} size={iconSize[size]} />
            )}
          </>
        )}
      </button>
    )
  }
)

HeroButton.displayName = 'HeroButton'

export default HeroButton
