'use client'

import { useEffect, useState } from 'react'

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Website Design & Development',
      description: 'Custom-built websites tailored to your business needs with modern design and functionality.',
      features: ['Responsive Design', 'Fast Loading', 'SEO Optimized', 'Mobile-First Approach']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
      title: 'E-commerce Solutions',
      description: 'Complete online store setup with secure payment processing and inventory management.',
      features: ['Online Store Setup', 'Payment Integration', 'Inventory Management', 'Order Tracking']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'SEO & Marketing',
      description: 'Boost your online visibility with search engine optimization and digital marketing strategies.',
      features: ['Local SEO', 'Google My Business', 'Social Media Setup', 'Analytics Tracking']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
      title: 'Maintenance & Support',
      description: '24/7 support and regular maintenance to keep your website running smoothly and securely.',
      features: ['Regular Updates', 'Security Monitoring', '24/7 Support', 'Backup Services']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      title: 'Mobile Optimization',
      description: 'Ensure your website looks and works perfectly on all devices and screen sizes.',
      features: ['Mobile-First Design', 'Touch-Friendly Interface', 'App-Like Experience', 'Cross-Browser Compatible']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600',
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


  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            ✨ What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Choose Your Perfect <span className="text-secondary-200">Plan</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
            Select the plan that best fits your needs and start achieving your goals today
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 ${service.iconColor}`}>
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 mb-4 leading-tight">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-neutral-600 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-neutral-600">
                    <div className={`w-5 h-5 ${service.iconBg} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                      <svg className={`w-3 h-3 ${service.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
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
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services