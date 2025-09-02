"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { signIn, signOut, signUp, getSessionEmail } from "@/lib/auth-local"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  children: React.ReactNode
}

export default function AuthGate({ children }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setSessionEmail(getSessionEmail())
    setReady(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      if (mode === "signup") {
        await signUp(email.trim().toLowerCase(), password)
      } else {
        await signIn(email.trim().toLowerCase(), password)
      }
      setSessionEmail(getSessionEmail())
      setEmail("")
      setPassword("")
    } catch (err: any) {
      setError(err?.message || "Authentication error")
    }
  }

  function handleLogout() {
    signOut()
    setSessionEmail(getSessionEmail())
  }

  if (!ready) return null

  if (!sessionEmail) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">{mode === "signup" ? "Create account" : "Sign in"}</CardTitle>
            <CardDescription className="text-center">
              {mode === "signup" ? "Sign up to start uploading media." : "Sign in to access your dashboard."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button type="submit" className="w-full">
                {mode === "signup" ? "Sign up" : "Sign in"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              >
                {mode === "signup" ? "Already have an account? Sign in" : "New here? Create an account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{sessionEmail}</span>
        </p>
        <Button variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
      {children}
    </div>
  )
}
