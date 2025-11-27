// Auth utility for managing user accounts
interface User {
  id: string
  email: string
  role: 'seeker' | 'helper' | 'admin'
  createdAt: string
}

const STORAGE_KEY = 'fyse_user'
const USERS_KEY = 'fyse_users'

export function saveUser(user: User): void {
  const users = getAllUsers()
  const existingIndex = users.findIndex(u => u.id === user.id)
  
  if (existingIndex >= 0) {
    users[existingIndex] = user
  } else {
    users.push(user)
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem(STORAGE_KEY)
  return user ? JSON.parse(user) : null
}

export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function getUserByEmail(email: string): User | undefined {
  return getAllUsers().find(u => u.email === email)
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function signUp(email: string, password: string, role: string): User {
  const existingUser = getUserByEmail(email)
  if (existingUser) {
    throw new Error('Email already registered')
  }

  const user: User = {
    id: Math.random().toString(36).substring(2, 11),
    email,
    role: role as 'seeker' | 'helper' | 'admin',
    createdAt: new Date().toISOString()
  }

  saveUser(user)
  return user
}

export function login(email: string, password: string): User {
  const user = getUserByEmail(email)
  if (!user) {
    throw new Error('Email not found')
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}
