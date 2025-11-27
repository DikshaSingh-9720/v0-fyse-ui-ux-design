import SeekerSidebar from '@/components/dashboard/seeker-sidebar'

export default function SeekerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SeekerSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
