'use client'

import { useEffect, useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    business: 'FitLife Gym',
    role: 'Owner',
    content: 'WebCraft Studios transformed our online presence completely. Our new website increased membership sign-ups by 150% in just 3 months. The booking system is intuitive and our members love it!',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 2,
    name: 'Michael Chen',
    business: 'Riverside High School',
    role: 'Principal',
    content: 'The team delivered exactly what we needed - a comprehensive website that serves students, parents, and staff. The parent portal has improved communication tremendously. Highly recommended!',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    business: 'Artisan Bakery',
    role: 'Owner',
    content: 'Our online orders increased by 200% after launching our new website. The custom cake ordering system is perfect for our business. Professional service from start to finish!',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 4,
    name: 'David Thompson',
    business: 'PowerFit CrossFit',
    role: 'Head Coach',
    content: 'The workout tracking features have revolutionized how we engage with our members. The community aspect of the website has built stronger relationships within our gym family.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 5,
    name: 'Lisa Parker',
    business: 'Sunshine Elementary',
    role: 'Administrative Director',
    content: 'WebCraft Studios understood our unique needs as an educational institution. The parent communication features have streamlined our operations significantly.',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 6,
    name: 'James Wilson',
    business: 'Local Coffee Shop',
    role: 'Manager',
    content: 'The loyalty program integration has increased repeat customers by 80%. The mobile-friendly design means customers can order on the go. Excellent work!',
    rating: 5,
    image: '/api/placeholder/80/80'
  }
]

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('testimonials')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-secondary-50 via-secondary-100 to-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center px-4 py-2 bg-secondary-500/20 backdrop-blur-sm text-secondary-700 rounded-full text-sm font-medium mb-6">
            💬 Client Stories
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            Success <span className="bg-gradient-to-r from-secondary-600 to-secondary-500 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Hear from business owners who transformed their online presence with our solutions. 
            Real results from real partnerships.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`relative mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            {/* Quote Icon */}
            <div className="text-primary-600 mb-6">
              <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
              </svg>
            </div>

            {/* Testimonial Content */}
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed italic">
                &ldquo;{testimonials[currentTestimonial].content}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonials[currentTestimonial].business}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">100+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">150%</div>
            <div className="text-gray-600">Avg. Growth</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials