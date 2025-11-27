import { Button } from '@/components/ui/button'

export default function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-foreground mb-1">Need immediate help?</h3>
        <p className="text-sm text-muted-foreground">If you're in crisis, please reach out to emergency services</p>
      </div>
      <Button className="bg-red-500 hover:bg-red-600 text-white rounded-lg whitespace-nowrap">
        Call 988
      </Button>
    </div>
  )
}
