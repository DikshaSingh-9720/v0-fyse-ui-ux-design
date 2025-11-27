export default function HelperInsights() {
  return (
    <div className="md:col-span-2 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm mb-2">This Week</p>
          <h3 className="text-3xl font-bold text-primary mb-1">12</h3>
          <p className="text-sm text-muted-foreground">People helped</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Impact</p>
          <h3 className="text-3xl font-bold text-accent mb-1">127</h3>
          <p className="text-sm text-muted-foreground">Lives touched</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <p className="text-muted-foreground text-sm mb-2">Avg. Rating</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-yellow-500">4.9</h3>
            <span className="text-xs text-muted-foreground">/5</span>
          </div>
          <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Your Impact This Month</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Chats Completed</span>
            <span className="font-bold text-foreground">34</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Avg. Chat Length</span>
            <span className="font-bold text-foreground">28 min</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-accent h-2 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
