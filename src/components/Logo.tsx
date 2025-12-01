import React from 'react'

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

const Logo: React.FC<LogoProps> = ({ width = 40, height = 40, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle with gradient */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="url(#bgGradient)"
      />
      
      {/* Outer glow circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#primaryGradient)"
        opacity="0.95"
      />
      
      {/* Laptop */}
      <g transform="translate(22, 38)">
        {/* Laptop screen with shadow */}
        <rect
          x="1"
          y="1"
          width="36"
          height="24"
          rx="2"
          fill="#1a1a2e"
          opacity="0.1"
        />
        <rect
          x="0"
          y="0"
          width="36"
          height="24"
          rx="2"
          fill="white"
        />
        
        {/* Screen bezel */}
        <rect
          x="2"
          y="2"
          width="32"
          height="20"
          rx="1"
          fill="#f8f9ff"
        />
        
        {/* Growth chart on screen */}
        <path
          d="M 6 16 L 11 12 L 16 14 L 21 9 L 26 11 L 30 7"
          stroke="url(#chartGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Chart dots */}
        <circle cx="6" cy="16" r="1.5" fill="#F178B6" />
        <circle cx="11" cy="12" r="1.5" fill="#F178B6" />
        <circle cx="16" cy="14" r="1.5" fill="#EF5DA8" />
        <circle cx="21" cy="9" r="1.5" fill="#EF5DA8" />
        <circle cx="26" cy="11" r="1.5" fill="#EF5DA8" />
        <circle cx="30" cy="7" r="1.5" fill="#EF5DA8" />
        
        {/* Laptop base */}
        <path
          d="M -3 24 L 0 24 L 4 30 L 32 30 L 36 24 L 39 24 L 39 31.5 L -3 31.5 Z"
          fill="url(#laptopGradient)"
        />
        
        {/* Trackpad */}
        <rect x="15" y="27" width="6" height="2" rx="0.5" fill="#9494ff" opacity="0.4" />
      </g>
      
      {/* Phone */}
      <g transform="translate(60, 45)">
        {/* Phone shadow */}
        <rect
          x="1"
          y="1"
          width="16"
          height="28"
          rx="3"
          fill="#1a1a2e"
          opacity="0.1"
        />
        
        {/* Phone body */}
        <rect
          x="0"
          y="0"
          width="16"
          height="28"
          rx="3"
          fill="white"
        />
        
        {/* Phone screen */}
        <rect
          x="1.5"
          y="3"
          width="13"
          height="22"
          rx="1.5"
          fill="#f8f9ff"
        />
        
        {/* Notch */}
        <rect
          x="5"
          y="3"
          width="6"
          height="1.5"
          rx="0.75"
          fill="white"
        />
        
        {/* Screen content - browser bars */}
        <rect x="3" y="7" width="10" height="2" rx="1" fill="#5D5FEF" opacity="0.25" />
        <rect x="3" y="10.5" width="7" height="1.5" rx="0.75" fill="#5D5FEF" opacity="0.2" />
        <rect x="3" y="13.5" width="9" height="1.5" rx="0.75" fill="#5D5FEF" opacity="0.2" />
        <rect x="3" y="16.5" width="6" height="1.5" rx="0.75" fill="#5D5FEF" opacity="0.2" />
        
        {/* Small growth indicator on phone */}
        <path
          d="M 4 20 L 6.5 18 L 9 19 L 12 17"
          stroke="#F178B6"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Decorative elements */}
      <circle cx="15" cy="20" r="3" fill="#F178B6" opacity="0.15" />
      <circle cx="85" cy="75" r="4" fill="#FCDDEC" opacity="0.2" />
      <circle cx="20" cy="80" r="2.5" fill="#5D5FEF" opacity="0.15" />
      
      {/* Gradients and Filters */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a4ce6" />
          <stop offset="100%" stopColor="#2e30d4" />
        </linearGradient>
        
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5D5FEF" />
          <stop offset="50%" stopColor="#4a4ce6" />
          <stop offset="100%" stopColor="#3a3cdd" />
        </linearGradient>
        
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F178B6" />
          <stop offset="100%" stopColor="#EF5DA8" />
        </linearGradient>
        
        <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e6e6ff" />
          <stop offset="100%" stopColor="#d1d1ff" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

export default Logo
