"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { MediaItem } from "./media-types"
import { cn } from "@/lib/utils"

function isImage(item: MediaItem) {
  return item.type === "image"
}

function publicUrl(path: string) {
  // Supabase public bucket path helper
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${base}/storage/v1/object/public/media/${path}`
}

export function MasonryGrid({ items }: { items: MediaItem[] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<MediaItem | null>(null)

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {items.map((item) => {
          const src = publicUrl(item.file_path)
          return (
            <div key={item.id} className="mb-4 break-inside-avoid">
              {isImage(item) ? (
                <img
                  src={src || "/placeholder.svg"}
                  alt={item.title ?? "Wedding photo"}
                  className="w-full cursor-pointer rounded-md"
                  onClick={() => {
                    setActive(item)
                    setOpen(true)
                  }}
                />
              ) : (
                <video
                  className="w-full cursor-pointer rounded-md"
                  onClick={() => {
                    setActive(item)
                    setOpen(true)
                  }}
                  muted
                  autoPlay
                  poster={src}
                >
                  <source src={src} />
                </video>
              )}
            </div>
          )
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={cn("max-w-5xl")}>
          {active &&
            (isImage(active) ? (
              // Use native img to avoid Next Image domain config in this environment
              <img
                src={publicUrl(active.file_path) || "/placeholder.svg"}
                alt={active.title ?? "Full size image"}
                className="h-auto w-full rounded"
              />
            ) : (
              <video className="h-auto w-full rounded" autoPlay>
                <source src={publicUrl(active.file_path)} />
              </video>
            ))}
        </DialogContent>
      </Dialog>
    </>
  )
}
