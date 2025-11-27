export default function AdminCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Daily Active Users</h3>
        <div className="space-y-4">
          {[7, 5, 8, 6, 9, 8, 7].map((days, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground min-w-10">Day {idx + 1}</span>
              <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-lg"
                  style={{ width: `${(days / 10) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-foreground min-w-12">{days}k</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Conversation Outcomes</h3>
        <div className="space-y-4">
          {[
            { label: 'Positive', value: 68, color: 'from-green-400 to-emerald-500' },
            { label: 'Neutral', value: 22, color: 'from-blue-400 to-cyan-500' },
            { label: 'Unresolved', value: 10, color: 'from-orange-400 to-red-500' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground min-w-20">{item.label}</span>
              <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} rounded-lg`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-foreground min-w-8">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
