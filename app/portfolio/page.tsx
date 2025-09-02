import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerSupabase } from "@/lib/supabase/server"
import { MasonryGrid } from "@/components/gallery/masonry-grid"
import type { MediaItem } from "@/components/gallery/media-types"
import { SiteHeader } from "@/components/site-header"
import { Suspense } from "react"

async function getMedia() {
  const supabase = await getServerSupabase() // ✅ fix
  const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })
  if (error) {
    console.error("[v0] fetch media error:", error.message)
    return []
  }
  return (data ?? []) as MediaItem[]
}

function filterBy(items: MediaItem[], type: "image" | "video", category: string | null) {
  const base = items.filter((i) => i.type === type)
  if (!category || category === "all") return base
  return base.filter((i) => (i.category ?? "").toLowerCase() === category.toLowerCase())
}

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams // ✅ await it
  const category = params?.category ?? "all"

  const items = await getMedia()
  const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[]

  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl">Gallery</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Category:</span>
            <a href="/portfolio?category=all" className={`text-sm ${category === "all" ? "text-primary" : ""}`}>
              All
            </a>
            {categories.map((c) => (
              <a
                key={c}
                href={`/portfolio?category=${encodeURIComponent(c!)}`}
                className={`text-sm ${category === c ? "text-primary" : ""}`}
              >
                {c}
              </a>
            ))}
          </div>
        </div>

        <Tabs defaultValue="photos" className="mt-6">
          <TabsList>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="mt-6">
            <Suspense>
              <MasonryGrid items={filterBy(items, "image", category)} />
            </Suspense>
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <Suspense>
              <MasonryGrid items={filterBy(items, "video", category)} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
