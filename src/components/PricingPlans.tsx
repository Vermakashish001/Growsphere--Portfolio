'use client'

import React, { useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'

const projectTypes = [
  { id: 'web', label: 'Web Development', price: 9999 },
  { id: 'ai', label: 'Generative AI Solution', price: 11999 },
  { id: 'ml', label: 'ML Model Integration', price: 13999 },
]

const PricingPlans = () => {
  const [selectedProjectType, setSelectedProjectType] = useState('web')
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const basePrice = projectTypes.find(p => p.id === selectedProjectType)?.price || 5000
  
  const plans = [
    {
      name: 'Full Payment',
      discount: '15% OFF',
      description: 'Pay the complete amount upfront and get 15% discount on the total project cost',
      price: Math.round(basePrice * 0.85),
      priceLabel: '/ one-time',
      color: 'from-primary-500 to-primary-600',
      features: [
        'Complete project delivery',
        'Priority support',
        'Free maintenance (3 months)',
        'Source code included',
        'Documentation provided'
      ],
      popular: true
    },
    {
      name: 'Half Payment',
      discount: '5% OFF',
      description: 'Split your payment into two parts - 50% upfront and 50% on delivery',
      price: Math.round((basePrice * 0.95) / 2),
      priceLabel: '/ per installment',
      color: 'from-secondary-500 to-secondary-600',
      features: [
        'Complete project delivery',
        'Standard support',
        'Free maintenance (2 months)',
        'Source code included',
        'Documentation provided'
      ]
    },
    {
      name: '3 EMI Plan',
      discount: 'No discount',
      description: 'Flexible payment in 3 equal monthly installments for better budget management',
      price: Math.round(basePrice / 3),
      priceLabel: '/ per month',
      color: 'from-accent-500 to-accent-600',
      features: [
        'Complete project delivery',
        'Standard support',
        'Free maintenance (1 month)',
        'Source code included',
        'Documentation provided'
      ]
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % plans.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + plans.length) % plans.length)
  }

  return (
    <section className="relative min-h-screen">
      {/* Top Half - Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400">
        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg className="relative block w-full rotate-180 h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>
      
      {/* Bottom Half - Light Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
      
      {/* Content */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Select the plan that best fits your needs and start achieving your goals today
          </p>
        </div>

        {/* Project Type Selection */}
        <div className="mb-12">
          <h3 className="text-center text-white text-lg font-semibold mb-6">Select Your Project Type</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedProjectType(type.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedProjectType === type.id
                    ? 'bg-white text-primary-600 shadow-xl scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          <p className="text-center text-white/80 mt-6 text-lg">
            Base Price: <span className="font-bold text-white text-2xl">₹{basePrice}</span>
          </p>
        </div>

        {/* Pricing Cards - Carousel for Mobile, Grid for Desktop */}
        <div className="relative">
          {/* Mobile Carousel Navigation */}
          <div className="md:hidden flex justify-center items-center mb-6 gap-4">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Previous plan"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white w-8' : 'bg-white/40'
                  }`}
                  aria-label={`Go to plan ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
              aria-label="Next plan"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile: Carousel View */}
          <div className="md:hidden overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {plans.map((plan, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${
                      plan.popular ? 'ring-4 ring-secondary-400' : ''
                    }`}
                  >
                    {/* Card Content */}
                    <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative`}>
                      {plan.popular && (
                        <div className="absolute top-4 right-4 bg-primary-300 text-primary-600 px-3 py-1 rounded-full text-xs font-bold">
                          POPULAR
                        </div>
                      )}
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm text-white/90 mb-4 min-h-[60px]">{plan.description}</p>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-sm ml-2 text-white/80">{plan.priceLabel}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                          {plan.discount}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mr-3 mt-0.5`}>
                              <Check className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`/capstone-projects/start?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&type=${selectedProjectType}`}
                        className={`block w-full text-center bg-gradient-to-r ${plan.color} text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-4 ring-primary-400' : ''
              }`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative`}>
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-white text-primary-600 px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/90 mb-4 min-h-[60px]">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    ₹{plan.price}</span>
                  <span className="text-sm ml-2 text-white/80">{plan.priceLabel}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {plan.discount}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mr-3 mt-0.5`}>
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={`/capstone-projects/start?plan=${encodeURIComponent(plan.name)}&price=${plan.price}&type=${selectedProjectType}`}
                  className={`block w-full text-center bg-gradient-to-r ${plan.color} text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 text-sm">
            All plans include complete source code, documentation, and professional support
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}

export default PricingPlans
