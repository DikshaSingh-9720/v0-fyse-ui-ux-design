'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UserManagement() {
  const [filter, setFilter] = useState('all')

  const users = [
    {
      id: 1,
      name: 'Alex',
      role: 'Seeker',
      email: 'alex@example.com',
      status: 'active',
      joined: '2024-01-15',
      interactions: 12
    },
    {
      id: 2,
      name: 'Morgan',
      role: 'Helper',
      email: 'morgan@example.com',
      status: 'verified',
      joined: '2023-11-20',
      interactions: 45
    },
    {
      id: 3,
      name: 'Jordan',
      role: 'Seeker',
      email: 'jordan@example.com',
      status: 'suspended',
      joined: '2024-02-01',
      interactions: 3
    },
  ]

  const getRoleColor = (role: string) => {
    return role === 'Helper' ? 'from-secondary to-purple-400' : 'from-primary to-blue-400'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'verified':
        return 'bg-blue-100 text-blue-700'
      case 'suspended':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">User Management</h1>

        <div className="mb-6 flex gap-4 items-center">
          <Input
            placeholder="Search users..."
            className="rounded-lg flex-1"
          />
          <select className="px-4 py-2 border border-border rounded-lg text-foreground">
            <option value="all">All Roles</option>
            <option value="seeker">Seekers</option>
            <option value="helper">Helpers</option>
          </select>
        </div>

        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleColor(user.role)} flex items-center justify-center text-white font-bold`}>
                        {user.name[0]}
                      </div>
                      <span className="font-semibold text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.role}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="rounded text-xs">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="rounded text-xs">
                        {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
