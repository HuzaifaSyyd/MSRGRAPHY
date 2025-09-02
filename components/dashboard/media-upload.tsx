"use client"

import type React from "react"

import { useState } from "react"
import { addMedia } from "@/lib/media-store"
import { getSessionEmail } from "@/lib/auth-local"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  onUploaded?: () => void
}

export default function MediaUpload({ onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError("Please choose an image or video file.")
      return
    }
    const owner = getSessionEmail()
    if (!owner) {
      setError("Not authenticated.")
      return
    }
    setLoading(true)
    try {
      await addMedia(owner, file)
      setFile(null)
      if (onUploaded) onUploaded()
    } catch (err: any) {
      setError(err?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="grid gap-3" onSubmit={handleUpload}>
      <div className="grid gap-2">
        <Label htmlFor="media">Select image or video</Label>
        <Input id="media" type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div>
        <Button type="submit" disabled={loading || !file}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  )
}
