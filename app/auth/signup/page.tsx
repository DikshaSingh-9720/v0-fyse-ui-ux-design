'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUp } from '@/lib/auth'

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedRole = searchParams.get('role') || null
  const [role, setRole] = useState(selectedRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      signUp(email, password, role as string)
      
      // Redirect to appropriate dashboard based on role
      const dashboardPath = `/dashboard/${role}`
      router.push(dashboardPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  if (!role) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Join FYSE</h1>
          <p className="text-muted-foreground">Choose how you'd like to participate</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setRole('seeker')}
            className="w-full h-20 bg-white border-2 border-primary hover:border-primary hover:bg-blue-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I'm Seeking Support</span>
            <span className="text-xs text-muted-foreground">Connect with peer helpers</span>
          </Button>

          <Button
            onClick={() => setRole('helper')}
            className="w-full h-20 bg-white border-2 border-secondary hover:border-secondary hover:bg-purple-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I Want to Help</span>
            <span className="text-xs text-muted-foreground">Share your experience</span>
          </Button>

          <Button
            onClick={() => setRole('admin')}
            className="w-full h-20 bg-white border-2 border-muted hover:border-muted hover:bg-gray-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I'm an Admin</span>
            <span className="text-xs text-muted-foreground">Manage the platform</span>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  const roleLabels = {
    seeker: 'Seeking Support',
    helper: 'Peer Helper',
    admin: 'Platform Admin'
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground">Signing up as {roleLabels[role as keyof typeof roleLabels]}</p>
        <button
          onClick={() => setRole(null)}
          className="text-xs text-primary hover:underline"
        >
          Change role
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Password</label>
          <Input
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="rounded-lg"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-lg">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Google
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Use
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
