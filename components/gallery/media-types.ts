export type MediaType = "image" | "video"

export type MediaItem = {
  id: string
  user_id: string
  type: MediaType
  category: string | null
  title: string | null
  description: string | null
  file_path: string
  width: number | null
  height: number | null
  duration: number | null
  created_at: string
}
