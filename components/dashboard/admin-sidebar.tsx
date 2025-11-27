'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard/admin', label: 'Dashboard', icon: 'chart' },
    { href: '/dashboard/admin/users', label: 'User Management', icon: 'users' },
    { href: '/dashboard/admin/stories', label: 'Story Moderation', icon: 'flag' },
    { href: '/dashboard/admin/reports', label: 'Chat Reports', icon: 'alert' },
    { href: '/dashboard/admin/analytics', label: 'Analytics', icon: 'graph' },
  ]

  const isActive = (href: string) => pathname === href

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">ADM</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">FYSE</h1>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive(item.href) ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 rounded-lg ${
                isActive(item.href)
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <IconMap icon={item.icon} />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button onClick={handleSignOut} variant="outline" className="w-full justify-start rounded-lg">
          Sign Out
        </Button>
      </div>
    </aside>
  )
}

function IconMap({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    chart: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
    users: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 6a4 4 0 11-8 0 4 4 0 018 0zM4.5 12a2.5 2.5 0 00-2.5 2.5v1a3 3 0 003 3h7a3 3 0 003-3v-1a2.5 2.5 0 00-2.5-2.5H4.5zM17.5 12c.276 0 .5.224.5.5v1a3 3 0 01-3 3h-2.5a1 1 0 110-2h2.5a1 1 0 001-1v-1c0-.276.224-.5.5-.5z" />
      </svg>
    ),
    flag: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.82 1.573l-12 8a1 1 0 01-1.74-1.114L5.07 6H6a1 1 0 000-2H3a1 1 0 00-1 1v10a1 1 0 001 1h3a1 1 0 000-2H4V6z" clipRule="evenodd" />
      </svg>
    ),
    alert: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    graph: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  }

  return icons[icon] || null
}
