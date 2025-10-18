'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ChevronRight, Mail, Phone } from 'lucide-react'
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])
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
    <>
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
                className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={logo}
                    alt={websiteData.websiteTitle}
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                    priority
                  />
                </div>
                <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-primary-600' : 'text-white'
                }`}>
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
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-3">
                {navigation.map((item, index) => (
                  item.type === 'scroll' ? (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.path)}
                      className={`group w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                        item.isButton
                          ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700"
                          : "bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-600 border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{item.name}</span>
                        <ChevronRight 
                          className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                            item.isButton ? 'text-white/80' : 'text-gray-400 group-hover:text-primary-500'
                          }`} 
                        />
                      </div>
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group block w-full text-left p-4 rounded-xl bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-600 border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{item.name}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  )
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar