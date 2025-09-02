import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  { title: "Full-Day Coverage", desc: "From prep to last dance—comprehensive coverage with two cameras." },
  { title: "Highlight Film", desc: "A 5–8 minute cinematic recap with licensed music and sound design." },
  { title: "Feature Film", desc: "12–20 minute story-driven edit with speeches and vows woven together." },
  { title: "Ceremony + Speeches", desc: "Multi-cam live audio capture and clean documentary edits." },
]

export function Services() {
  return (
    <section id="services" className="bg-muted/30 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {services.map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed">{s.desc}</CardContent>
          </Card>
        ))}
      </div>
      <div className="my-6 px-4 sm:px-6 md:px-8">
  <h2 className="text-3xl font-semibold tracking-tight md:text-3xl text-center">FAQ's</h2>

  <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mt-6">
    <AccordionItem value="q1">
      <AccordionTrigger>What’s the typical turnaround?</AccordionTrigger>
      <AccordionContent>
        First cut within 7–10 days, final delivery 2–4 weeks depending on scope.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="q2">
      <AccordionTrigger>Do you travel for shoots?</AccordionTrigger>
      <AccordionContent>
        Yes — available in India. Travel and per diem will be billed at cost, with all
        travel and food expenses borne by the client.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="q3">
      <AccordionTrigger>How do you price projects?</AccordionTrigger>
      <AccordionContent>
        Project-based estimates informed by prep days, shoot days, crew, and post.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>

    </section>
  )
}
