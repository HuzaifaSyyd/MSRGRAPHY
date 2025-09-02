"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
  { href: "/portfolio", label: "Gallery" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false) // ✅ control Sheet open/close

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription?.subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Photos/Msrlogo.png"
            alt="Msr Graphy Logo"
            width={50}
            height={50}
            
          />
          
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5">
          {links.map((l) => {
            const active = l.href === pathname
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  active && "text-primary"
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Desktop buttons */}
          <div className="hidden md:flex gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await supabase.auth.signOut()
                    setUser(null)
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 sm:w-80 p-6"> {/* ✅ Added padding */}
                <nav className="flex flex-col gap-4 mt-4">
                  {links.map((l) => {
                    const active = l.href === pathname
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)} // ✅ close on click
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          active && "text-primary"
                        )}
                      >
                        {l.label}
                      </Link>
                    )
                  })}

                  <div className="mt-6 flex flex-col gap-3">
                    {user ? (
                      <>
                        <Link href="/dashboard" onClick={() => setOpen(false)}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={async () => {
                            await supabase.auth.signOut()
                            setUser(null)
                            setOpen(false) // ✅ close after signout
                          }}
                        >
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign in
                        </Button>
                      </Link>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
