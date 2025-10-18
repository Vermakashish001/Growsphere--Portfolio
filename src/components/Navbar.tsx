'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getWebsiteData } from '@/lib/data'
import logo from './../assets/logo.png';

type NavItem = {
  name: string
  path: string
  type?: 'scroll' | 'link'
  isButton?: boolean

}

const defaultNavigation: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: 'services', type: 'scroll' },
  { name: 'Portfolio', path: 'portfolio', type: 'scroll' },
  { name: 'Testimonials', path: 'testimonials', type: 'scroll' },
  { name: 'Capstone Projects', path: '/capstone-projects', type: 'link' },
  { name: 'Contact Us', path: 'contact', type: 'scroll' }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const websiteData = getWebsiteData()
  const navigation: NavItem[] =  defaultNavigation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className={`text-2xl font-bold ${isScrolled ? 'text-primary-600' : 'text-white'}`}>
              {websiteData.websiteTitle}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className={item.isButton 
                      ? "bg-primary-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                      : `px-3 py-2 text-sm font-medium transition-colors ${
                          isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                        }`
                    }
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-md">
              {navigation.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className={
                      item.isButton
                        ? "block px-3 py-2 text-base font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 w-full text-left"
                        : "block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 w-full text-left"
                    }
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 w-full text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar