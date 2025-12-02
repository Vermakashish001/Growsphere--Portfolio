'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getProjects } from '@/lib/data'
import type { Project } from '@/types'

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const projects = getProjects()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('portfolio')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'health', label: 'Health', count: projects.filter(p => p.category === 'health').length },
    { id: 'ecommerce', label: 'E-commerce', count: projects.filter(p => p.category === 'ecommerce').length },
    { id: 'gym', label: 'Gym', count: projects.filter(p => p.category === 'gym').length },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  // Reset carousel when filter changes
  useEffect(() => {
    setCurrentSlide(0)
    setUserInteracted(false)
    setIsAutoScrolling(true)
  }, [activeFilter])

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || userInteracted || filteredProjects.length <= 1) return

    const autoScrollInterval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === filteredProjects.length - 1 ? 0 : prev + 1
      )
    }, 3000) // Auto-advance every 3 seconds

    return () => clearInterval(autoScrollInterval)
  }, [isAutoScrolling, userInteracted, filteredProjects.length])

  const handleUserInteraction = () => {
    setUserInteracted(true)
    setIsAutoScrolling(false)
  }

  const nextSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => 
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => 
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    )
  }

  const goToSlide = (index: number) => {
    handleUserInteraction()
    setCurrentSlide(index)
  }
  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-6">
            🚀 Our Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Featured <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover our latest web development projects crafted for small businesses. 
            Each solution is uniquely designed to drive growth and engagement.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-accent-500 to-primary-500 text-white shadow-lg shadow-accent-500/25'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50 shadow-md hover:shadow-lg border border-neutral-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Projects Display */}
        {/* Mobile Carousel (visible on small screens) */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Carousel Container */}
            <div 
              className="overflow-hidden rounded-xl"
              onTouchStart={handleUserInteraction}
              onMouseDown={handleUserInteraction}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[580px]">
                      {/* Project Image */}
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <div className="text-blue-600 text-6xl font-bold opacity-50">
                          {project.title.charAt(0)}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                            View Project
                          </button>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.category === 'other' ? 'bg-blue-100 text-blue-600' :
                              project.category === 'ecommerce' ? 'bg-green-100 text-green-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : 'Project'}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 text-sm">
                            {project.description}
                          </p>

                          {/* Features */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.features?.map((feature: string, featureIndex: number) => (
                                <span
                                  key={featureIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {feature}
                                </span>
                              )) || (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  Custom Features
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies?.map((tech: string, techIndex: number) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                                >
                                  {tech}
                                </span>
                              )) || (
                                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                                  Modern Technologies
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Button pinned to bottom */}
                        <div className="mt-auto pt-4">
                          <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                            View Case Study
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between mt-6">
              {/* Previous Button */}
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={filteredProjects.length <= 1}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Center Controls */}
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={() => {
                    if (isAutoScrolling) {
                      handleUserInteraction()
                    } else {
                      setIsAutoScrolling(true)
                      setUserInteracted(false)
                    }
                  }}
                  className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  title={isAutoScrolling ? 'Pause auto-scroll' : 'Resume auto-scroll'}
                >
                  {isAutoScrolling ? (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {filteredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={filteredProjects.length <= 1}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Project Counter and Status */}
            <div className="text-center mt-4 space-y-2">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {filteredProjects.length}
              </span>
              {isAutoScrolling && !userInteracted && (
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary-600">Auto-scrolling</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Grid (hidden on small screens) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col min-h-[600px] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-blue-600 text-6xl font-bold opacity-50">
                  {project.title.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                    View Project
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'other' ? 'bg-blue-100 text-blue-600' :
                      project.category === 'ecommerce' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : 'Project'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features?.map((feature: string, featureIndex: number) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {feature}
                        </span>
                      )) || (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          Custom Features
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                        >
                          {tech}
                        </span>
                      )) || (
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                          Modern Technologies
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Button pinned to bottom */}
                <div className="mt-auto pt-4">
                  <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-gray-600 mb-6">
            Ready to see your business featured in our portfolio?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
