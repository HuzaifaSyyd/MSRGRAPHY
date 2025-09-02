// Client-side local auth (demo). Stores users in IndexedDB and session email in localStorage.
// Passwords are hashed with SHA-256 + email salt (not for production).

import { idbGet, idbPut } from "./idb"

type User = {
  email: string
  passwordHash: string
  createdAt: number
}

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function hashPassword(email: string, password: string) {
  const enc = new TextEncoder()
  const data = enc.encode(email + ":" + password)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return toHex(digest)
}

const SESSION_KEY = "local-auth-session"

// Helper to notify listeners when auth changes
function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:changed"))
  }
}

export async function signUp(email: string, password: string) {
  const existing = await idbGet<User>("users", email)
  if (existing) throw new Error("User already exists")
  const passwordHash = await hashPassword(email, password)
  const user: User = { email, passwordHash, createdAt: Date.now() }
  await idbPut("users", user)
  localStorage.setItem(SESSION_KEY, email)
  notifyAuthChanged() // Broadcast auth state change
  return user
}

export async function signIn(email: string, password: string) {
  const user = await idbGet<User>("users", email)
  if (!user) throw new Error("Invalid credentials")
  const passwordHash = await hashPassword(email, password)
  if (passwordHash !== user.passwordHash) throw new Error("Invalid credentials")
  localStorage.setItem(SESSION_KEY, email)
  notifyAuthChanged() // Broadcast auth state change
  return user
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY)
  notifyAuthChanged() // Broadcast auth state change
}

export function getSessionEmail(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}
