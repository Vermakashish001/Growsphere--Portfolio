'use client'

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Icon, { IconName } from './Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: IconName
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  animated?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled, 
    children, 
    icon,
    iconPosition = 'left',
    fullWidth = false,
    animated = true,
    ...props 
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-xl font-semibold',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-all duration-300 ease-out tracking-wide',
      'relative overflow-hidden',
      animated && 'transform hover:scale-105 active:scale-95',
      fullWidth && 'w-full'
    )
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-xl hover:shadow-2xl border border-primary-500/20',
      secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 focus:ring-secondary-500 shadow-xl hover:shadow-2xl border border-secondary-500/20',
      outline: 'border-2 border-white/90 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-700 focus:ring-white/50 shadow-lg hover:shadow-xl transition-all duration-300',
      ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 hover:shadow-md',
      gradient: 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 shadow-2xl hover:shadow-primary-500/25 border border-primary-400/30'
    }
    
    const sizes = {
      sm: 'px-4 py-2.5 text-sm gap-2 min-h-[40px]',
      md: 'px-6 py-3 text-base gap-2 min-h-[44px]',
      lg: 'px-8 py-4 text-lg gap-3 min-h-[52px]',
      xl: 'px-12 py-5 text-xl gap-4 min-h-[60px]'
    }

    const iconSize = {
      sm: 16,
      md: 18,
      lg: 20,
      xl: 22
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
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
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

Button.displayName = 'Button'

export default Button
