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
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our proven process ensures successful project delivery
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