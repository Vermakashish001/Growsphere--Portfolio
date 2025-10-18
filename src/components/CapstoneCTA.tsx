'use client'

import React from 'react'

const CapstoneCTA = () => {
  return (
    <section className="bg-primary-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to Start Your Project?</span>
          <span className="block text-primary-200">Get in Touch Today</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/capstone-projects/start"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
            >
              Start Your Project
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CapstoneCTA