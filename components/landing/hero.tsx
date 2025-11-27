import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="w-full py-20 md:py-32 px-4 bg-gradient-to-b from-background via-blue-50/20 to-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Fit Yourself <span className="text-primary">—</span>
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              You Are Not Alone
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Connect with empathetic peer helpers, share your recovery journey, and find the emotional support you need. A safe space where real people help real people.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/auth/signup?role=seeker">I'm Seeking Support</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup?role=helper">I Want to Help</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="#testimonials">Read Stories</Link>
            </Button>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative w-full aspect-square max-w-sm">
            <svg viewBox="0 0 400 400" className="w-full h-full text-primary/20">
              <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <circle cx="150" cy="180" r="30" fill="currentColor" opacity="0.6" />
              <circle cx="250" cy="180" r="30" fill="currentColor" opacity="0.4" />
              <path d="M 180 220 Q 200 240 220 220" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.8" />
              <text x="200" y="330" textAnchor="middle" className="text-2xl font-bold" fill="currentColor" opacity="0.3">
                Emotional Support
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
