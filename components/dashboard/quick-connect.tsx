import { Button } from '@/components/ui/button'

export default function QuickConnect() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-primary/20 rounded-2xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Ready to connect?</h3>
          <p className="text-muted-foreground max-w-md">
            Connect instantly with an available peer helper who understands what you're going through.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg whitespace-nowrap">
          Find a Helper Now
        </Button>
      </div>
    </div>
  )
}
