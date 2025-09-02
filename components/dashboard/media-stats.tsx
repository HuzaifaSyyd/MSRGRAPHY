"use client"

import { useEffect, useState } from "react"
import { countByType } from "@/lib/media-store"
import { getSessionEmail } from "@/lib/auth-local"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MediaStats({ refreshKey }: { refreshKey?: number }) {
  const [stats, setStats] = useState<{ images: number; videos: number; total: number }>({
    images: 0,
    videos: 0,
    total: 0,
  })

  async function load() {
    const email = getSessionEmail()
    if (!email) return
    const s = await countByType(email)
    setStats(s)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Total" value={stats.total} />
      <StatCard label="Images" value={stats.images} />
      <StatCard label="Videos" value={stats.videos} />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
