import React from 'react'
import CapstoneHero from '@/components/CapstoneHero'
import CapstoneFeatures from '@/components/CapstoneFeatures'
import HowItWorks from '@/components/HowItWorks'
import CapstoneCTA from '@/components/CapstoneCTA'

export default function CapstoneProjects() {
  return (
    <main>
      <CapstoneHero form={true} />
      <CapstoneFeatures />
      <HowItWorks />
      <CapstoneCTA />
    </main>
  )
}