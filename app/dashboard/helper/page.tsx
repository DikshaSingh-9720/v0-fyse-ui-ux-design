import HelperInsights from "@/components/dashboard/helper-insights"
import UpcomingRequests from "@/components/dashboard/upcoming-requests"
import RatingsOverview from "@/components/dashboard/ratings-overview"
import { getCurrentUser } from "@/lib/auth"

export default function HelperHome() {
  const currentUser = getCurrentUser()
  const helperName = currentUser?.profile?.name || "Helper"

  return (
    <main className="flex-1 p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {helperName}</h1>
        <p className="text-muted-foreground">You're making a real difference in people's lives</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <HelperInsights />
        <RatingsOverview />
      </div>

      <UpcomingRequests />
    </main>
  )
}
