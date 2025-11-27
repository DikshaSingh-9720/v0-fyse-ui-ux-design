import AdminStats from '@/components/dashboard/admin-stats'
import AdminCharts from '@/components/dashboard/admin-charts'
import RecentActivity from '@/components/dashboard/recent-activity'

export default function AdminDashboard() {
  return (
    <main className="flex-1 p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      <AdminStats />
      <AdminCharts />
      <RecentActivity />
    </main>
  )
}
