'use client'

import React from 'react'

const CapstoneCTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            🎯 Ready to Begin?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Start Your <span className="text-secondary-200">Project?</span>
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Get in touch today and let's transform your academic vision into reality
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <a
              href="/capstone-projects/start"
              className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Start Your Project
            </a>
            <a
              href="/#portfolio"
              className="border-2 border-white/90 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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