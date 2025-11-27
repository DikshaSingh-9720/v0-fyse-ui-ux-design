import { Button } from '@/components/ui/button'

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'user_reported',
      title: 'User Reported',
      description: 'Alex reported inappropriate behavior in chat',
      severity: 'high',
      time: '5 min ago'
    },
    {
      id: 2,
      type: 'story_flagged',
      title: 'Story Flagged',
      description: 'Story "My Journey" flagged for review',
      severity: 'medium',
      time: '15 min ago'
    },
    {
      id: 3,
      type: 'helper_verified',
      title: 'Helper Verified',
      description: 'Morgan verified as peer helper',
      severity: 'low',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'user_suspended',
      title: 'User Suspended',
      description: 'User suspended due to policy violation',
      severity: 'high',
      time: '2 hours ago'
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-green-100 text-green-700'
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getSeverityColor(activity.severity)}`}>
                    {activity.severity.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-foreground">{activity.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
