import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CrisisSupport() {
  const resources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: 'Free and confidential support for people in crisis',
      phone: 'Call or text 988',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      description: 'Crisis counselors via text message',
      phone: 'Text HOME to 741741',
      available: '24/7'
    },
    {
      name: 'International Association for Suicide Prevention',
      description: 'Global suicide prevention services',
      phone: 'Visit iasp.info/resources',
      available: 'Online Resources'
    },
    {
      name: 'NAMI Helpline',
      description: 'Mental health support and resources',
      phone: 'Call 1-800-950-NAMI',
      available: 'Mon-Fri 10am-10pm'
    },
  ]

  return (
    <main className="flex-1">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Crisis Support</h1>
          <p className="text-lg text-muted-foreground">
            If you're in immediate danger, please contact emergency services or reach out to a crisis helpline
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12 text-center">
          <p className="text-lg font-bold text-foreground mb-4">Immediate Help Available</p>
          <p className="text-4xl font-bold text-red-600 mb-4">Call 988</p>
          <p className="text-muted-foreground mb-6">Or go to your nearest emergency room</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Chat with Crisis Counselor
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-white border border-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">{resource.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
              <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-semibold text-foreground">{resource.phone}</p>
                <p className="text-xs text-muted-foreground">{resource.available}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 space-y-4">
          <h3 className="text-lg font-bold text-foreground">FYSE Resources</h3>
          <p className="text-muted-foreground">
            While FYSE provides peer support, it's not a substitute for professional mental health care. 
            Please reach out to a licensed therapist or contact emergency services if you're in crisis.
          </p>
          <p className="text-muted-foreground">
            If you're experiencing thoughts of self-harm or suicide, please seek immediate professional help.
          </p>
        </div>
      </div>
    </main>
  )
}
