'use client'

import React from 'react'

const CapstoneHero = (
  { form }: { form: boolean }
) => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-800 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Ideas into</span>
            <span className="block text-primary-200">Professional Capstone Projects</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Expert guidance and development support for students and professionals.
            Turn your academic vision into reality with our comprehensive capstone project service.
          </p>
          {form && (
            <>
          <div className="mt-10 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <a
                href="/capstone-projects/start"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-10"
              >
                Start Your Project
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#how-it-works"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </a>
            </div>

          </div>
          </>
          )}
        </div>
      </div>
    </section>
  )
}

export default CapstoneHero