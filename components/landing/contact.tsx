"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Contact() {
  return (
    <section id="contact" className="bg-muted/30 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Contact</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
  {/* Email Card */}
  <Card
    onClick={() =>
      (window.location.href =
        "mailto:hello@blueframecinema.com?subject=Inquiry&body=Hey, I am interested")
    }
    className="cursor-pointer h-40 flex flex-col justify-center text-center transition hover:bg-red-500 hover:text-white"
  >
    <CardHeader>
      <CardTitle>Email</CardTitle>
    </CardHeader>
    <CardContent>iam.mansoor48@gmail.com</CardContent>
  </Card>

  {/* Phone Card */}
  <Card
    onClick={() =>
      (window.location.href =
        "https://wa.me/7888272941?text=Hey, I am interested")
    }
    className="cursor-pointer h-40 flex flex-col justify-center text-center transition hover:bg-green-500 hover:text-white"
  >
    <CardHeader>
      <CardTitle>Phone</CardTitle>
    </CardHeader>
    <CardContent>+917888272941</CardContent>
  </Card>

  {/* Location Card */}
  <Card className="h-40 flex flex-col justify-center text-center transition">
    <CardHeader>
      <CardTitle>Location</CardTitle>
    </CardHeader>
    <CardContent>Pune, India • Available all over india </CardContent>
  </Card>
</div>

      </div>
    </section>
  )
}
