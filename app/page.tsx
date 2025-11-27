import Header from '@/components/landing/header'
import Hero from '@/components/landing/hero'
import HowItWorks from '@/components/landing/how-it-works'
import Testimonials from '@/components/landing/testimonials'
import Safety from '@/components/landing/safety'
import CTA from '@/components/landing/cta'
import Footer from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Header />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Safety />
      <CTA />
      <Footer />
    </main>
  )
}
