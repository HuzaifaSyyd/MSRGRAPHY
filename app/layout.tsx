import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/landing/footer";
import "./globals.css"

export const metadata: Metadata = {
  title: "Msr Graphy",
  description: "Cinematographer",
  generator: "Whozaifa.vercel.app",
  icons: {
    icon: "/Msrlogo.png",        // ✅ Default
    shortcut: "/Msrlogo.png",    // ✅ For Safari
    apple: "/Msrlogo.png", // ✅ For iOS
  },
}

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
