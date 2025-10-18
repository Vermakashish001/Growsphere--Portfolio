import CapstoneInquiryForm from '@/components/CapstoneInquiryForm'
import CapstoneHero from '@/components/CapstoneHero'
export default function StartCapstone() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CapstoneHero form = {false}/>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <CapstoneInquiryForm />
        </div>
    </div>
  )
}