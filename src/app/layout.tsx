import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getWebsiteData } from '@/lib/data'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const websiteData = getWebsiteData()

export const metadata: Metadata = {
  title: `${websiteData.websiteTitle} - ${websiteData.websiteDescription}`,
  description: `${websiteData.websiteDescription} Created by ${websiteData.author}.`,
  keywords: 'website design, digital experiences, web development, modern design, responsive websites',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}