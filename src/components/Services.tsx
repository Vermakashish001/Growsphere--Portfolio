'use client'

import { useEffect, useState } from 'react'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Website Design & Development',
      description: 'Custom-built websites tailored to your business needs with modern design and functionality.',
      features: ['Responsive Design', 'Fast Loading', 'SEO Optimized', 'Mobile-First Approach']
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: 'E-commerce Solutions',
      description: 'Complete online store setup with secure payment processing and inventory management.',
      features: ['Online Store Setup', 'Payment Integration', 'Inventory Management', 'Order Tracking']
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: 'SEO & Marketing',
      description: 'Boost your online visibility with search engine optimization and digital marketing strategies.',
      features: ['Local SEO', 'Google My Business', 'Social Media Setup', 'Analytics Tracking']
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Maintenance & Support',
      description: '24/7 support and regular maintenance to keep your website running smoothly and securely.',
      features: ['Regular Updates', 'Security Monitoring', '24/7 Support', 'Backup Services']
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Mobile Optimization',
      description: 'Ensure your website looks and works perfectly on all devices and screen sizes.',
      features: ['Mobile-First Design', 'Touch-Friendly Interface', 'App-Like Experience', 'Cross-Browser Compatible']
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analytics & Reporting',
      description: 'Track your website performance with detailed analytics and monthly reports.',
      features: ['Performance Tracking', 'User Behavior Analysis', 'Monthly Reports', 'ROI Measurement']
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || userInteracted || services.length <= 1) return

    const autoScrollInterval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === services.length - 1 ? 0 : prev + 1
      )
    }, 4000) // Auto-advance every 4 seconds (slightly slower than portfolio)

    return () => clearInterval(autoScrollInterval)
  }, [isAutoScrolling, userInteracted, services.length])

  const handleUserInteraction = () => {
    setUserInteracted(true)
    setIsAutoScrolling(false)
  }

  const nextSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => 
      prev === services.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    handleUserInteraction()
    setCurrentSlide((prev) => 
      prev === 0 ? services.length - 1 : prev - 1
    )
  }

  const goToSlide = (index: number) => {
    handleUserInteraction()
    setCurrentSlide(index)
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive web solutions tailored specifically for small businesses. 
            From design to deployment and ongoing support, we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Display */}
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
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col min-h-[400px]">
                      <div className="text-blue-600 mb-6">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 flex-1">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
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
                disabled={services.length <= 1}
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
                  {services.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                disabled={services.length <= 1}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Service Counter and Status */}
            <div className="text-center mt-4 space-y-2">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {services.length}
              </span>
              {isAutoScrolling && !userInteracted && (
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-600">Auto-scrolling</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Grid (hidden on small screens) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-blue-600 mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services