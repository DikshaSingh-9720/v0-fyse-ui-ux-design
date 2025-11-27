import HelperSidebar from '@/components/dashboard/helper-sidebar'

export default function HelperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <HelperSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
