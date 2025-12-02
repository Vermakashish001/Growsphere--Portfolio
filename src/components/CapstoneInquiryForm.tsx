'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

// You can create a dedicated icons file or import from a library like react-icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.978 5.978 0 0112 13a5.979 5.979 0 012.121.302m-2.121-.302a4 4 0 110-5.292" /></svg>
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
const UploadIcon = () => <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>


interface TeamMember {
  name: string
  email: string
  phone: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  university: string
  teamMembers: TeamMember[]
  projectTitle: string // Added projectTitle
  projectDescription: string
  deadline: string
  additionalNotes: string
  files: FileList | null
}

const CapstoneInquiryForm = () => {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<{plan: string, price: string, type: string} | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    teamMembers: [{ name: '', email: '', phone: '' }],
    projectTitle: '', // Added projectTitle
    projectDescription: '',
    deadline: '',
    additionalNotes: '',
    files: null
  })
  
  // --- Form State & Handlers (largely unchanged) ---
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  
  // Read plan info from URL parameters
  useEffect(() => {
    const plan = searchParams.get('plan')
    const price = searchParams.get('price')
    const type = searchParams.get('type')
    
    if (plan && price && type) {
      setSelectedPlan({ plan, price, type })
    }
  }, [searchParams])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => {
      const newTeamMembers = [...prev.teamMembers]
      newTeamMembers[index] = { ...newTeamMembers[index], [field]: value }
      return { ...prev, teamMembers: newTeamMembers }
    })
  }

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '' }]
    }))
  }

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, files: e.target.files }))
    }
  }

  // --- Step Navigation ---
  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  // --- Form Submission ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Validate that a plan is selected
      if (!selectedPlan) {
        throw new Error('Please select a plan from the pricing page before submitting.')
      }

      const submitData = new FormData()
      
      // Append all fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'teamMembers') {
          submitData.append(key, JSON.stringify(value))
        } else if (key === 'files' && value) {
          Array.from(value as FileList).forEach(file => {
            submitData.append('files', file)
          })
        } else if (value !== null) {
          submitData.append(key, value as string)
        }
      })
      
      // Append selected plan information
      submitData.append('paymentPlan', selectedPlan.plan)
      submitData.append('totalAmount', selectedPlan.price)
      submitData.append('projectType', selectedPlan.type)
      
      // --- Client-side Validation (Example) ---
      if (formData.files) {
        const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB
        const totalSize = Array.from(formData.files).reduce((acc, file) => acc + file.size, 0);
        if (totalSize > MAX_TOTAL_SIZE) {
            throw new Error(`Total file size exceeds the maximum limit of 25MB.`);
        }
        if (Array.from(formData.files).length > 5) {
            throw new Error('You can upload a maximum of 5 files.');
        }
      }

      // --- API Call ---
      const response = await fetch('/api/capstone-inquiry', {
        method: 'POST',
        body: submitData
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to submit inquiry')

      setSubmitStatus({
        type: 'success',
        message: 'Your inquiry has been submitted successfully! We will contact you soon.'
      })
      setIsSubmitted(true)
      // Optionally reset form or redirect
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // --- Progress Bar Component ---
  const steps = [
    { number: 1, title: 'Contact Info', icon: <UserIcon /> },
    { number: 2, title: 'Team Details', icon: <UsersIcon /> },
    { number: 3, title: 'Project Specs', icon: <DocumentTextIcon /> },
    { number: 4, title: 'Review & Submit', icon: <CheckCircleIcon /> }
  ]

  const ProgressBar = () => (
    <div className="w-full px-4 sm:px-0 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
      <ul className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <li className="flex flex-col items-center text-center space-y-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${currentStep > step.number ? 'bg-secondary-500 text-white shadow-lg' : ''}
                  ${currentStep === step.number ? 'bg-secondary-500 text-white ring-4 ring-secondary-200 shadow-lg scale-110' : ''}
                  ${currentStep < step.number ? 'bg-white/30 text-white' : ''}
                `}
              >
                {currentStep > step.number ? <CheckCircleIcon /> : step.icon}
              </div>
              <p className={`text-xs font-medium ${currentStep >= step.number ? 'text-white' : 'text-white/60'}`}>{step.title}</p>
            </li>
            {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-colors duration-300 rounded ${currentStep > index + 1 ? 'bg-secondary-400' : 'bg-white/30'}`} />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  )

  return (
    <section className="relative min-h-screen">
      {/* Top Half - Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-primary-500 via-accent-500 to-accent-400">
        {/* Multi-Layer Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            {/* Background Wave */}
            <path fill="#ffffff" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,101.3C672,96,768,128,864,149.3C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            {/* Middle Wave */}
            <path fill="#ffffff" fillOpacity="0.5" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,224C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            {/* Front Wave */}
            <path fill="#ffffff" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Bottom Half - Light Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
      
      {/* Content */}
      <div className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              📝 Project Inquiry
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Submit Your Project Details
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s bring your vision to life. Please fill out the form below.
            </p>
            
            
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <ProgressBar />
          </div>
          
          {/* Selected Plan Badge - Top Right Desktop, Top Mobile */}
          {selectedPlan && (
            <div className="fixed top-20 right-4 z-50 lg:block hidden">
              <div className="bg-white rounded-2xl p-4 shadow-2xl border-2 border-primary-200 w-72 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Plan Selected</span>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-primary-50 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">Payment Plan</div>
                    <div className="text-base font-bold text-primary-600">{selectedPlan.plan}</div>
                  </div>
                  
                  <div className="bg-secondary-50 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">Total Amount</div>
                    <div className="text-lg font-bold text-secondary-600">₹{selectedPlan.price}</div>
                  </div>
                  
                  <div className="bg-neutral-50 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">Project Type</div>
                    <div className="text-sm font-bold text-neutral-700 capitalize">
                      {selectedPlan.type.replace('web', 'Web').replace('ml', 'ML').replace('ai', 'AI')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Selected Plan Badge - Mobile Top Banner */}
          {selectedPlan && (
            <div className="lg:hidden bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-4 mb-6 shadow-lg">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wide">Plan Selected</span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wider opacity-90">Plan</div>
                  <div className="text-xs font-bold mt-1">{selectedPlan.plan}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wider opacity-90">Amount</div>
                  <div className="text-sm font-bold mt-1">₹{selectedPlan.price}</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wider opacity-90">Type</div>
                  <div className="text-xs font-bold mt-1 capitalize">
                    {selectedPlan.type.replace('web', 'Web').replace('ml', 'ML').replace('ai', 'AI')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isSubmitted ? (
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 text-center animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  Submission Successful!
                </h2>
                
                <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
                  Thank you for your inquiry! We&apos;ve received your project details and will review them carefully. Our team will get back to you within 24-48 hours.
                </p>
                
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                  <h3 className="text-lg font-bold text-neutral-800 mb-3">What happens next?</h3>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <span className="text-neutral-700">Our team will review your project requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <span className="text-neutral-700">We&apos;ll reach out via email or phone to discuss details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <span className="text-neutral-700">You&apos;ll receive a detailed proposal and timeline</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Back to Home
                  </a>
                  <a
                    href="/capstone-projects"
                    className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-2xl font-semibold hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                  >
                    View Plans
                  </a>
                </div>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <section className="space-y-6 animate-fade-in">
              
              <div className="pb-6 border-b-2 border-primary-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                    <UserIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">Contact Information</h2>
                </div>
                <p className="text-neutral-600 ml-13">Who is the primary point of contact for this project?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" required placeholder="Jane Doe"
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                    value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Email Address *</label>
                  <input type="email" id="email" name="email" required placeholder="jane.doe@university.edu"
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                    value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="group">
                  <label htmlFor="university" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">University / Organization *</label>
                  <input type="text" id="university" name="university" required placeholder="Northvale Tech University"
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                    value={formData.university} onChange={handleInputChange} />
                </div>
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="+1 (555) 123-4567"
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                    value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Team Members */}
          {currentStep === 2 && (
            <section className="space-y-6 animate-fade-in">
              <div className="pb-6 border-b-2 border-primary-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                    <UsersIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">Team Details</h2>
                </div>
                <p className="text-neutral-600 ml-13">List the members of your project team.</p>
              </div>
              <div className="space-y-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gradient-to-br from-neutral-50 to-neutral-100/50 p-6 rounded-2xl border-2 border-neutral-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md">
                    <div className="md:col-span-1 group">
                      <label className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Member Name {index === 0 && '*'}</label>
                      <input type="text" required={index === 0} placeholder="Alex Johnson"
                        className="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                        value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} />
                    </div>
                    <div className="md:col-span-1 group">
                      <label className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Email {index === 0 && '*'}</label>
                      <input type="email" required={index === 0} placeholder="alex@university.edu"
                        className="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                        value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} />
                    </div>
                    <div className="md:col-span-1 group">
                      <label className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Phone {index === 0 && '*'}</label>
                      <input type="tel" required={index === 0} placeholder="+1 (555) 123-4567"
                        className="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                        value={member.phone} onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)} />
                    </div>
                    {formData.teamMembers.length > 1 && (
                      <div className="md:col-span-1 flex justify-end">
                        <button type="button" onClick={() => removeTeamMember(index)} 
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addTeamMember}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-sm font-semibold rounded-xl text-primary-600 bg-white hover:bg-primary-50 transition-all hover:scale-105 shadow-sm hover:shadow-md">
                  <span className="text-lg">+</span> Add Another Member
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Project Specifications */}
          {currentStep === 3 && (
            <section className="space-y-6 animate-fade-in">
              <div className="pb-6 border-b-2 border-primary-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                    <DocumentTextIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">Project Specifications</h2>
                </div>
                <p className="text-neutral-600 ml-13">Tell us about the project itself.</p>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                    <label htmlFor="projectTitle" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Project Title *</label>
                    <input type="text" id="projectTitle" name="projectTitle" required placeholder="e.g., AI-Powered E-commerce Recommendation Engine"
                      className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                      value={formData.projectTitle} onChange={handleInputChange} />
                </div>
                
                <div className="group">
                  <label htmlFor="projectDescription" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Project Description *</label>
                  <textarea id="projectDescription" name="projectDescription" rows={5} required placeholder="Describe your project goals, scope, expected deliverables, and constraints..."
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400 resize-none"
                    value={formData.projectDescription} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="deadline" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Preferred Deadline *</label>
                  <input type="date" id="deadline" name="deadline" required
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400 cursor-pointer"
                    value={formData.deadline} onChange={handleInputChange} />
                </div>
                <div className="group">
                  <label htmlFor="additionalNotes" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-primary-600 transition-colors">Additional Notes</label>
                  <input type="text" id="additionalNotes" name="additionalNotes" placeholder="e.g., Specific requirements or questions"
                    className="block w-full rounded-xl border-2 border-neutral-300 px-4 py-3.5 shadow-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all hover:border-neutral-400"
                    value={formData.additionalNotes} onChange={handleInputChange} />
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Attachments & Review */}
          {currentStep === 4 && (
            <section className="space-y-6 animate-fade-in">
              <div className="pb-6 border-b-2 border-primary-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg">
                    <CheckCircleIcon />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">Review & Submit</h2>
                </div>
                <p className="text-neutral-600 ml-13">Attach any relevant documents and submit your inquiry.</p>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-neutral-700">Attachments</label>
                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center bg-neutral-50 hover:border-primary-400 hover:bg-primary-50/30 transition-all cursor-pointer">
                  <input type="file" id="files" name="files" multiple className="hidden" onChange={handleFileChange} />
                  <label htmlFor="files" className="cursor-pointer flex flex-col items-center">
                    <UploadIcon />
                    <span className="mt-2 text-base font-semibold text-primary-600">Click to upload or drag and drop</span>
                    <span className="mt-1 text-sm text-neutral-500">Max 5 files, up to 25MB total</span>
                  </label>
                </div>
                {formData.files && Array.from(formData.files).length > 0 && (
                  <div className="mt-4 border border-neutral-200 rounded-2xl p-4 bg-neutral-50">
                    <h3 className="text-sm font-semibold text-neutral-800 mb-3">Selected Files:</h3>
                    <ul className="divide-y divide-neutral-200">
                      {Array.from(formData.files).map((file, index) => (
                        <li key={index} className="py-3 flex justify-between items-center text-sm">
                          <span className="text-neutral-700 truncate pr-4 font-medium">{file.name}</span>
                          <span className="text-neutral-500 flex-shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {submitStatus && (
                <div className={`p-4 rounded-xl text-sm font-medium ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 border-t border-neutral-200">
            <div className="w-full sm:w-auto order-2 sm:order-1">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-neutral-300 text-sm sm:text-base font-semibold rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 transition-all">
                  Previous
                </button>
              )}
            </div>
            
            <div className="w-full sm:w-auto order-1 sm:order-2">
              {currentStep < 4 && (
                <button type="button" onClick={nextStep}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-transparent text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Next Step
                </button>
              )}
              
              {currentStep === 4 && (
                <button type="submit" disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-transparent text-sm sm:text-base font-semibold rounded-xl text-white shadow-lg transition-all transform
                    ${isSubmitting ? 'bg-neutral-400 cursor-not-allowed' : 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl hover:scale-105'}`}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              )}
            </div>
          </div>
        </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default CapstoneInquiryForm