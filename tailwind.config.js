/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e6e6ff',
          200: '#d1d1ff',
          300: '#b3b3ff',
          400: '#9494ff',
          500: '#5D5FEF', // Main primary color from palette
          600: '#4a4ce6',
          700: '#3a3cdd',
          800: '#2e30d4',
          900: '#1f21cb',
        },
        secondary: {
          50: '#fef7fc',
          100: '#fdeef8',
          200: '#FCDDEC', // Light pink from palette
          300: '#f9b3d9',
          400: '#F178B6', // Medium pink from palette
          500: '#EF5DA8', // Main secondary color from palette
          600: '#e63d91',
          700: '#d12d7a',
          800: '#b82563',
          900: '#9f1f4c',
        },
        accent: {
          50: '#f5f5ff',
          100: '#ebebff',
          200: '#d9daff',
          300: '#bdbeff',
          400: '#A5A6F6', // Light purple from palette
          500: '#7879F1', // Medium purple from palette
          600: '#5d5fe8',
          700: '#4a4cdf',
          800: '#3a3cd6',
          900: '#2d2fcd',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'white': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
        'primary': '0 25px 50px -12px rgba(93, 95, 239, 0.25)',
        'secondary': '0 25px 50px -12px rgba(239, 93, 168, 0.25)',
        'accent': '0 25px 50px -12px rgba(120, 121, 241, 0.25)',
      },
    },
  },
  plugins: [],
}