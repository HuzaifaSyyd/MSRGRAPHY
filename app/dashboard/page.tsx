import { redirect } from "next/navigation"
import { getServerSupabase } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/site-header"
import { UploadForm } from "./upload-form"
import { DeleteButton } from "@/components/DeleteButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { MediaItem } from "@/components/gallery/media-types"

async function getUserAndData() {
  const supabase = await getServerSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { user: null, images: 0, videos: 0, items: [] as MediaItem[] }
  const [{ count: imgCount }, { count: vidCount }, { data: items }] = await Promise.all([
    supabase.from("media").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("type", "image"),
    supabase.from("media").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("type", "video"),
    supabase.from("media").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
  ])
  return { user, images: imgCount ?? 0, videos: vidCount ?? 0, items: (items ?? []) as MediaItem[] }
}

function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${base}/storage/v1/object/public/media/${path}`
}

export default async function DashboardPage() {
  const { user, images, videos, items } = await getUserAndData()
  if (!user) redirect("/login")

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold md:text-3xl">Dashboard</h1>
        
        {/* ✅ Smaller stats cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-3">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-medium">Your Images</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">{images}</CardContent>
          </Card>
          <Card className="p-3">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-medium">Your Videos</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">{videos}</CardContent>
          </Card>
          <Card className="p-3">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-medium">Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </div>

        {/* ✅ Masonry format for media */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Your Media</h2>
          <div className="mt-4 columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {items.map((m) => (
              <Card key={m.id} className="break-inside-avoid">
                <CardContent className="p-3">
                  {m.type === "image" ? (
                    <img
                      src={publicUrl(m.file_path) || "/placeholder.svg"}
                      alt={m.title ?? "Image"}
                      className="w-full rounded"
                    />
                  ) : (
                    <video controls className="w-full rounded">
                      <source src={publicUrl(m.file_path)} />
                    </video>
                  )}
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="truncate">
                      <div className="font-medium">{m.title ?? (m.type === "image" ? "Image" : "Video")}</div>
                      {m.category && <div className="text-muted-foreground">{m.category}</div>}
                    </div>
                    <DeleteButton id={m.id} storagePath={m.file_path} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
