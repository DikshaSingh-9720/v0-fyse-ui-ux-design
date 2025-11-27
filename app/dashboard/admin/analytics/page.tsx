export default function AnalyticsPage() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Analytics Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Platform Growth</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Total Users</span>
                  <span className="font-bold text-foreground">3,842</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-foreground">Monthly Active</span>
                  <span className="font-bold text-foreground">2,156</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Success Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Chat Completion Rate</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">User Satisfaction</span>
                <span className="font-bold text-green-600">4.7/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg. Response Time</span>
                <span className="font-bold text-green-600">2.3 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
