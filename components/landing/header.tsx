'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">FYSE</h1>
            <p className="text-xs text-muted-foreground">You Are Not Alone</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm text-foreground hover:text-primary transition">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm text-foreground hover:text-primary transition">
            Stories
          </Link>
          <Link href="#safety" className="text-sm text-foreground hover:text-primary transition">
            Safety
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
