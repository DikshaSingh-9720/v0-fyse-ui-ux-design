'use client'

import { Button } from '@/components/ui/button'

export default function ChatReportsPage() {
  const reports = [
    {
      id: 1,
      reporterName: 'User123',
      reportedUserName: 'Helper456',
      reason: 'Inappropriate behavior',
      severity: 'high',
      description: 'Helper made inappropriate comments during conversation',
      reportedDate: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      reporterName: 'Seeker789',
      reportedUserName: 'Helper123',
      reason: 'Lack of professionalism',
      severity: 'medium',
      description: 'Helper did not listen properly',
      reportedDate: '1 day ago',
      status: 'reviewing'
    },
    {
      id: 3,
      reporterName: 'User456',
      reportedUserName: 'Helper789',
      reason: 'Abusive language',
      severity: 'critical',
      description: 'Helper used abusive language',
      reportedDate: '2 days ago',
      status: 'resolved'
    },
  ]

  return (
    <main className="flex-1 p-8">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Chat Reports</h1>
        <p className="text-muted-foreground mb-8">Review and manage user reports</p>

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white border border-border rounded-2xl p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reported by</p>
                  <p className="font-semibold text-foreground">{report.reporterName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reported User</p>
                  <p className="font-semibold text-foreground">{report.reportedUserName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Reason</p>
                  <p className="font-semibold text-foreground">{report.reason}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Severity</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    report.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : report.severity === 'high'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {report.severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 bg-muted p-3 rounded-lg">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  report.status === 'pending'
                    ? 'bg-blue-100 text-blue-700'
                    : report.status === 'reviewing'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {report.status.toUpperCase()}
                </span>
                <p className="text-xs text-muted-foreground">{report.reportedDate}</p>
              </div>
              {report.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                    Suspend User
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-lg">
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
