import { Suspense } from 'react'
import CapstoneInquiryForm from '@/components/CapstoneInquiryForm'

export default function StartCapstone() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CapstoneInquiryForm />
    </Suspense>
  )
}