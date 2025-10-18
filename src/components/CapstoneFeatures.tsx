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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Comprehensive Capstone Project Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to successfully complete your capstone project
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">
                <feature.icon className="text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapstoneFeatures