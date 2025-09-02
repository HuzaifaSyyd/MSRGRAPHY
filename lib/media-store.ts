// IndexedDB Media Store

import { idbAdd, idbDelete, idbGetAll } from "./idb"

export type MediaType = "image" | "video"

export type MediaItem = {
  id?: number
  ownerEmail: string
  name: string
  type: MediaType
  size: number
  blobType: string
  createdAt: number
  // Blob is stored in IDB. We expose objectURL at runtime for UI.
  file: Blob
}

export async function addMedia(ownerEmail: string, file: File): Promise<number> {
  const type: MediaType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "image"
  const item: MediaItem = {
    ownerEmail,
    name: file.name,
    type,
    size: file.size,
    blobType: file.type,
    file,
    createdAt: Date.now(),
  }
  const id = await idbAdd("media", item as any)
  return Number(id)
}

export async function listMedia(ownerEmail: string): Promise<MediaItem[]> {
  const all = await idbGetAll<MediaItem>("media")
  return all.filter((m) => m.ownerEmail === ownerEmail).sort((a, b) => b.createdAt - a.createdAt)
}

export async function deleteMedia(id: number): Promise<void> {
  await idbDelete("media", id)
}

export async function countByType(ownerEmail: string): Promise<{ images: number; videos: number; total: number }> {
  const items = await listMedia(ownerEmail)
  const images = items.filter((i) => i.type === "image").length
  const videos = items.filter((i) => i.type === "video").length
  return { images, videos, total: items.length }
}
