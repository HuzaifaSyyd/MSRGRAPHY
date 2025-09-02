"use client"

import { deleteMedia } from "@/app/dashboard/server-actions"
import { Button } from "@/components/ui/button"

export function DeleteButton({ id, storagePath }: { id: string; storagePath: string }) {
  async function action() {
    await deleteMedia(id, storagePath)
  }

  return (
    <form action={action}>
      <Button variant="destructive" size="sm">
        Delete
      </Button>
    </form>
  )
}
