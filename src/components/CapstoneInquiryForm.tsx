'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'

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
  role: string
}

interface FormData {
  fullName: string
  email: string
  phone: string
  university: string
  teamMembers: TeamMember[]
  projectTitle: string // Added projectTitle
  projectDescription: string
  techStack: string
  projectType: string
  deadline: string
  additionalNotes: string
  files: FileList | null
}

const CapstoneInquiryForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    teamMembers: [{ name: '', email: '', role: '' }],
    projectTitle: '', // Added projectTitle
    projectDescription: '',
    techStack: '',
    projectType: '',
    deadline: '',
    additionalNotes: '',
    files: null
  })
  
  // --- Form State & Handlers (largely unchanged) ---
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

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
      teamMembers: [...prev.teamMembers, { name: '', email: '', role: '' }]
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
    <div className="w-full px-4 sm:px-0">
      <ul className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <li className="flex flex-col items-center text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${currentStep > step.number ? 'bg-primary-600 text-white' : ''}
                  ${currentStep === step.number ? 'bg-primary-600 text-white ring-4 ring-primary-200' : ''}
                  ${currentStep < step.number ? 'bg-gray-200 text-gray-500' : ''}
                `}
              >
                {currentStep > step.number ? <CheckCircleIcon /> : step.icon}
              </div>
              <p className={`text-xs font-medium ${currentStep >= step.number ? 'text-primary-700' : 'text-gray-500'}`}>{step.title}</p>
            </li>
            {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${currentStep > index + 1 ? 'bg-primary-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center text-secondary-800">Submit Your Project Details</h1>
          <p className="mt-2 text-center text-md text-secondary-600">
            Let's bring your vision to life. Please fill out the form below.
          </p>
        </div>

        <div className="mb-10">
          <ProgressBar />
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-8 animate-fade-in">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <section className="animate-slide-up">
              <h2 className="text-xl font-semibold text-secondary-900">Step 1: Contact Information</h2>
              <p className="text-gray-500 mt-1 mb-6">Who is the primary point of contact for this project?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="fullName" name="fullName" required placeholder="Jane Doe"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.fullName} onChange={handleInputChange} />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" name="email" required placeholder="jane.doe@university.edu"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.email} onChange={handleInputChange} />
                </div>
                {/* University */}
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">University / Organization</label>
                  <input type="text" id="university" name="university" required placeholder="Northvale Tech University"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.university} onChange={handleInputChange} />
                </div>
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required placeholder="+1 (555) 123-4567"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
            </section>
          )}

          {/* Step 2: Team Members */}
          {currentStep === 2 && (
            <section className="animate-slide-up">
              <h2 className="text-xl font-semibold text-secondary-900">Step 2: Team Details</h2>
              <p className="text-gray-500 mt-1 mb-6">List the members of your project team.</p>
              <div className="space-y-6">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg border">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Member Name</label>
                      <input type="text" required placeholder="Alex Johnson"
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        value={member.name} onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)} />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" required placeholder="alex@university.edu"
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        value={member.email} onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)} />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Role</label>
                      <input type="text" required placeholder="Developer"
                        className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        value={member.role} onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)} />
                    </div>
                    {formData.teamMembers.length > 1 && (
                      <div className="md:col-span-1 flex justify-end">
                        <button type="button" onClick={() => removeTeamMember(index)} className="p-2 text-red-600 hover:bg-red-100 rounded-full">
                          <TrashIcon />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addTeamMember}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  + Add Another Member
                </button>
              </div>
            </section>
          )}

          {/* Step 3: Project Specifications */}
          {currentStep === 3 && (
            <section className="animate-slide-up">
              <h2 className="text-xl font-semibold text-secondary-900">Step 3: Project Specifications</h2>
              <p className="text-gray-500 mt-1 mb-6">Tell us about the project itself.</p>
              
              <div className="space-y-6">
                {/* Project Title */}
                <div>
                    <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700">Project Title</label>
                    <input type="text" id="projectTitle" name="projectTitle" required placeholder="e.g., AI-Powered E-commerce Recommendation Engine"
                      className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      value={formData.projectTitle} onChange={handleInputChange} />
                </div>
                
                {/* Project Description */}
                <div>
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea id="projectDescription" name="projectDescription" rows={5} required placeholder="Describe your project goals, scope, expected deliverables, and constraints..."
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.projectDescription} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Primary Tech Stack</label>
                  <input type="text" id="techStack" name="techStack" required placeholder="e.g., React, Node.js, Python, AWS"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.techStack} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
                  <select id="projectType" name="projectType" required
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.projectType} onChange={handleInputChange}>
                    <option value="">Select a type</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="Data Science / ML">Data Science / ML</option>
                    <option value="Research Project">Research Project</option>
                    <option value="Prototype / MVP">Prototype / MVP</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Preferred Deadline</label>
                  <input type="date" id="deadline" name="deadline" required
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.deadline} onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
                  <input type="text" id="additionalNotes" name="additionalNotes" placeholder="e.g., Specific requirements or questions"
                    className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={formData.additionalNotes} onChange={handleInputChange} />
                </div>
              </div>
            </section>
          )}

          {/* Step 4: Attachments & Review */}
          {currentStep === 4 && (
            <section className="animate-slide-up">
              <h2 className="text-xl font-semibold text-secondary-900">Step 4: Review & Submit</h2>
              <p className="text-gray-500 mt-1 mb-6">Attach any relevant documents and submit your inquiry.</p>
              
              {/* Attachments */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:border-primary-400 transition">
                  <input type="file" id="files" name="files" multiple className="hidden" onChange={handleFileChange} />
                  <label htmlFor="files" className="cursor-pointer flex flex-col items-center">
                    <UploadIcon />
                    <span className="mt-2 text-sm font-medium text-primary-600">Click to upload or drag and drop</span>
                    <span className="mt-1 text-xs text-gray-500">Max 5 files, up to 25MB total</span>
                  </label>
                </div>
                {formData.files && Array.from(formData.files).length > 0 && (
                  <div className="mt-4 border rounded-md p-3">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Selected Files:</h3>
                    <ul className="divide-y divide-gray-200">
                      {Array.from(formData.files).map((file, index) => (
                        <li key={index} className="py-2 flex justify-between items-center text-sm">
                          <span className="text-gray-700 truncate pr-4">{file.name}</span>
                          <span className="text-gray-500 flex-shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Submission Status Message */}
              {submitStatus && (
                <div className={`p-4 mt-6 rounded-md text-sm ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                  {submitStatus.message}
                </div>
              )}
            </section>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 flex justify-between items-center">
            <div>
              {currentStep > 1 && (
                <button type="button" onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
              )}
            </div>
            
            <div>
              {currentStep < 4 && (
                <button type="button" onClick={nextStep}
                  className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                  Next
                </button>
              )}
              
              {currentStep === 4 && (
                <button type="submit" disabled={isSubmitting}
                  className={`px-8 py-3 border border-transparent text-base font-medium rounded-md text-white transition
                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}>
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CapstoneInquiryForm