'use client'

import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    description: 'We discuss your project requirements, objectives, and expected outcomes.'
  },
  {
    number: '02',
    title: 'Project Detailing',
    description: 'Submission about your project requirements and specifications for approval.'
  },
  {
    number: '03',
    title: 'Development Phase',
    description: 'Systematic development with regular updates and feedback sessions.'
  },
  {
    number: '04',
    title: 'Testing & Documentation',
    description: 'Thorough testing and preparation of comprehensive documentation.'
  },
  {
    number: '05',
    title: 'Final Delivery',
    description: 'Project handover with presentation support and future maintenance guidance.'
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-6">
            🚀 Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
            How It <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our proven process ensures successful project delivery with clear milestones and regular communication
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 h-16 w-0.5 bg-primary-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks