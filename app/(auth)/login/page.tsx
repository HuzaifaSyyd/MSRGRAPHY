"use client"

import type React from "react"
import { supabase } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

   const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

if (error) {
  setError(error.message)
  setLoading(false)
  return
}

// ✅ persist session in localStorage & cookie
await supabase.auth.setSession(data.session)

router.push("/dashboard")
router.refresh()
  }

  return (
    <main>
      <SiteHeader />
      <div className="mx-auto max-w-sm px-4 py-10">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <p className="mt-4 text-sm">
          No account?{" "}
          {/* <Link href="/signup" className="text-primary underline">
            Sign up
          </Link> */}
        </p>
      </div>
    </main>
  )
}
