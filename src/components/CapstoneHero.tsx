'use client'

import React from 'react'

const CapstoneHero = (
  { form }: { form: boolean }
) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto text-center py-20 sm:py-24 lg:py-32">
        <div className="transition-all duration-1000 ease-out">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            🎓 Academic Excellence
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-[1.1] tracking-tight">
            <span className="inline-block">Transform Your Ideas into</span>
            <span className="block text-secondary-200 mt-2">Professional Capstone Projects</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
            Expert guidance and development support for students and professionals.
            Turn your academic vision into reality with our comprehensive capstone project service.
          </p>
          {form && (
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <a
                href="/capstone-projects/start"
                className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
              >
                Start Your Project
              </a>
              <a
                href="#how-it-works"
                className="border-2 border-white/90 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Learn More
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CapstoneHero