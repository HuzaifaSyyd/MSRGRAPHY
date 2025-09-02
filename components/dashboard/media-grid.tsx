"use client"

import { useEffect, useMemo, useState } from "react"
import { type MediaItem, deleteMedia, listMedia } from "@/lib/media-store"
import { getSessionEmail } from "@/lib/auth-local"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = {
  refreshKey?: number
  onChanged?: () => void
}

function useObjectURL(blob?: Blob) {
  const url = useMemo(() => (blob ? URL.createObjectURL(blob) : ""), [blob])
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])
  return url
}

export default function MediaGrid({ refreshKey, onChanged }: Props) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const email = getSessionEmail()
    if (!email) return
    setLoading(true)
    try {
      const data = await listMedia(email)
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  async function handleDelete(id?: number) {
    if (!id) return
    await deleteMedia(id)
    if (onChanged) onChanged()
    await load()
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading your media...</p>
  }

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No uploads yet. Use the form above to add images or videos.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((m) => (
        <MediaCard key={m.id} item={m} onDelete={() => handleDelete(m.id)} />
      ))}
    </div>
  )
}

function MediaCard({ item, onDelete }: { item: MediaItem; onDelete: () => void }) {
  const url = useObjectURL(item.file)
  const isImage = item.type === "image"
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url || "/placeholder.svg"} alt={item.name} className="w-full h-56 object-cover" />
          ) : (
            <video src={url} controls className="w-full h-56 object-cover" />
          )}
        </div>
        <div className="p-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{item.type}</Badge>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
