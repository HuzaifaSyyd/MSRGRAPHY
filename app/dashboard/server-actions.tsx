"use server"

import { getServerSupabase } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteMedia(id: string, storagePath: string) {
  const supabase = await getServerSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Unauthorized")

  // Ensure the media item belongs to the user
  const { data: media, error: getErr } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single()

  if (getErr || !media) throw new Error("Media not found")
  if (media.user_id !== user.id) throw new Error("Not allowed")

  const { error: dbErr } = await supabase.from("media").delete().eq("id", id)
  if (dbErr) throw new Error(dbErr.message)

  const { error: stErr } = await supabase.storage.from("media").remove([storagePath])
  if (stErr) throw new Error(stErr.message)

  revalidatePath("/dashboard")
}
