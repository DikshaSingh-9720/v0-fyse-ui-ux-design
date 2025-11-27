import MoodCards from '@/components/dashboard/mood-cards'
import QuickConnect from '@/components/dashboard/quick-connect'
import RecommendedStories from '@/components/dashboard/recommended-stories'
import EmergencyBanner from '@/components/dashboard/emergency-banner'

export default function SeekerHome() {
  return (
    <main className="flex-1 p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Alex</h1>
        <p className="text-muted-foreground">How are you doing today?</p>
      </div>

      <EmergencyBanner />
      <MoodCards />
      <QuickConnect />
      <RecommendedStories />
    </main>
  )
}
