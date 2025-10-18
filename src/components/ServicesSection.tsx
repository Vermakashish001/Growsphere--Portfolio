'use client'

import { useState } from 'react'
import { getServices } from '@/lib/data'
import ServiceCard from './ServiceCard'
import Button from './ui/Button'
import Icon from './ui/Icon'
import { Service } from '@/types'

const ServicesSection = () => {
  const services = getServices()
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleGetQuote = (service: Service) => {
    setSelectedService(service)
    // Here you could open a modal or redirect to contact form
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
            <Icon name="settings" size={32} className="text-primary-600" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive web development services to help your business establish a strong online presence.
            From custom websites to e-commerce solutions, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onGetQuote={handleGetQuote}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business Online?
            </h3>
            <p className="text-xl text-primary-100 mb-8">
              Let's discuss your project and create something amazing together. 
              Get a free consultation and quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                icon="message-circle"
                iconPosition="left"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Free Consultation
              </Button>
              <Button
                variant="ghost"
                size="lg"
                icon="phone"
                iconPosition="left"
                className="text-white hover:bg-white/10"
                onClick={() => window.open('tel:+916207107305')}
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Trusted by businesses across India</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="shield" size={20} className="text-green-500" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="zap" size={20} className="text-yellow-500" />
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="heart" size={20} className="text-red-500" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
