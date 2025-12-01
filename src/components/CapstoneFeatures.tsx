'use client'

import React from 'react'
import {ComputerIcon, LightbulbIcon, TextIcon, StarIcon} from 'lucide-react';

const features = [
  {
    title: 'Custom Project Development',
    description: 'Tailored development solutions that align with your academic requirements and industry standards.',
    icon: ComputerIcon
  },
  {
    title: 'Technical Guidance',
    description: 'Expert mentoring and technical support throughout your project lifecycle.',
    icon: LightbulbIcon
  },
  {
    title: 'Documentation Support',
    description: 'Comprehensive documentation and reporting assistance for your project.',
    icon: TextIcon
  },
  {
    title: 'Industry Best Practices',
    description: 'Implementation following current industry standards and best practices.',
    icon: StarIcon
  }
]

const CapstoneFeatures = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            ⚡ Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Comprehensive <span className="text-secondary-200">Capstone Services</span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Everything you need to successfully complete your capstone project with expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 leading-tight">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapstoneFeatures