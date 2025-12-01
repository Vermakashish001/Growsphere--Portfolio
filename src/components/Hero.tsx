'use client'

import { useEffect, useState } from 'react'
import { getWebsiteData } from '@/lib/data'
import HeroButton from './ui/HeroButton'
import Icon from './ui/Icon'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const websiteData = getWebsiteData()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Pattern & Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='6' cy='6' r='1'/%3E%3Ccircle cx='36' cy='36' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto text-center py-20 sm:py-24 lg:py-32">
        <div className={`transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            <span className="inline-block animate-fade-in">
              {websiteData.websiteTitle}
            </span>
            <span className="block text-primary-500 bg-gradient-to-r from-secondary-200 to-white bg-clip-text text-transparent animate-slide-up" style={{animationDelay: '0.3s'}}>
              Digital Experiences
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-accent-100 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
            {websiteData.websiteDescription} We create modern, responsive websites that help businesses 
            grow their online presence. 
            <span className="block mt-2 text-white/90 font-medium">
              Beautiful design meets powerful functionality.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up" style={{animationDelay: '0.9s'}}>
            <HeroButton
              variant="primary"
              size="xl"
              onClick={scrollToContact}
              icon="arrow-right"
              iconPosition="right"
            >
              Get Your Website Today
            </HeroButton>
            <HeroButton
              variant="secondary"
              size="xl"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              icon="eye"
              iconPosition="right"
            >
              View Our Work
            </HeroButton>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="text-center p-6 sm:p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-secondary-200 bg-clip-text text-transparent">100+</div>
            <div className="text-secondary-200 text-sm sm:text-base font-medium">Websites Created</div>
          </div>
          <div className="text-center p-6 sm:p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-secondary-200 bg-clip-text text-transparent">98%</div>
            <div className="text-secondary-200 text-sm sm:text-base font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 sm:p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-secondary-200 bg-clip-text text-transparent">24/7</div>
            <div className="text-secondary-200 text-sm sm:text-base font-medium">Support Available</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="animate-bounce">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
          <div className="text-white/60 text-xs mt-2 font-medium">Scroll</div>
        </div>
      </div>
    </section>
  )
}

export default Hero