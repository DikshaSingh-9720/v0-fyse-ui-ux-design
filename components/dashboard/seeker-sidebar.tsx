'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from '@/lib/auth'

export default function SeekerSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { href: '/dashboard/seeker', label: 'Home', icon: 'home' },
    { href: '/dashboard/seeker/find-helper', label: 'Find Helper', icon: 'search' },
    { href: '/dashboard/seeker/stories', label: 'Stories', icon: 'book' },
    { href: '/dashboard/seeker/chats', label: 'Chats', icon: 'message' },
    { href: '/dashboard/seeker/profile', label: 'Profile', icon: 'user' },
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">FYSE</h1>
            <p className="text-xs text-muted-foreground">Seeker</p>
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
                  ? 'bg-primary text-white'
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
        <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-3 text-xs text-foreground">
          <p className="font-semibold mb-1">In Crisis?</p>
          <p className="text-muted-foreground mb-2">Call 988 Suicide & Crisis Lifeline</p>
          <Link href="/crisis">
            <Button size="sm" variant="outline" className="w-full text-xs">
              Get Help
            </Button>
          </Link>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="w-full justify-start rounded-lg">
          Sign Out
        </Button>
      </div>
    </aside>
  )
}

function IconMap({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    search: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    ),
    book: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.968 7.968 0 009 4.804z" />
      </svg>
    ),
    message: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
      </svg>
    ),
    user: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
  }

  return icons[icon] || null
}
