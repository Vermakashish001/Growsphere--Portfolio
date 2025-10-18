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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className={`text-xl sm:text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-primary-600 hover:text-primary-700' : 'text-white hover:text-primary-200'
              }`}
            >
              <span className="bg-gradient-to-r from-current to-primary-400 bg-clip-text">
                {websiteData.websiteTitle}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navigation.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className={item.isButton 
                      ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      : `relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                          isScrolled 
                            ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                            : 'text-white hover:text-primary-200 hover:bg-white/10'
                        }`
                    }
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                      isScrolled 
                        ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                        : 'text-white hover:text-primary-200 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500' 
                  : 'text-white hover:bg-white/10 focus:ring-white/50'
              }`}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute top-1.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
                }`} />
                <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute top-4.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>

      {/* Mobile Navigation Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Navigation Items */}
          <div className="p-6">
            <nav className="space-y-3">
              {navigation.map((item, index) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className={`group w-full text-left p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                      item.isButton
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700"
                        : "bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 border border-gray-200 hover:border-primary-200"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{item.name}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                          item.isButton ? 'text-white/80' : 'text-gray-400 group-hover:text-primary-500'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group block w-full text-left p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 border border-gray-200 hover:border-primary-200 transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">{item.name}</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )
              ))}
            </nav>
            
            {/* Contact Info in Mobile Menu */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <a href={`mailto:${getWebsiteData().authorEmail}`} className="flex items-center p-3 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Us</p>
                    <p className="text-sm text-gray-500">{getWebsiteData().authorEmail}</p>
                  </div>
                </a>
                <a href={`tel:${getWebsiteData().mobile}`} className="flex items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Call Us</p>
                    <p className="text-sm text-gray-500">{getWebsiteData().mobile}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar