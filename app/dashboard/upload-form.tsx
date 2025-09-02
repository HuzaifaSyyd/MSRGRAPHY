"use client"

import type React from "react"
import { supabase } from "@/lib/supabase/client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function UploadForm() {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [type, setType] = useState<"image" | "video">("image")
  const [category, setCategory] = useState<string>("Wedding")
  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError("Please select a file.")
      return
    }
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("You must be signed in.")
      setLoading(false)
      return
    }

    const ext = file.name.split(".").pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const path = `${user.id}/${type}/${filename}`

    const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    })
    if (upErr) {
      setError(upErr.message)
      setLoading(false)
      return
    }

    const { error: dbErr } = await supabase.from("media").insert({
      user_id: user.id,
      type,
      category,
      title: title || null,
      description: null,
      file_path: path,
      width: null,
      height: null,
      duration: null,
    })
    if (dbErr) {
      setError(dbErr.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setFile(null)
    setTitle("")
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={type} onValueChange={(v) => setType(v as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Category</Label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value)}
          placeholder="e.g. Wedding, Reception, Details"
        />
      </div>
      <div className="space-y-2">
        <Label>Title (optional)</Label>
        <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Short title" />
      </div>
      <div className="space-y-2">
        <Label>File</Label>
        <Input
          type="file"
          accept={`${type === "image" ? "image/*" : "video/*"}`}
          onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  )
}
