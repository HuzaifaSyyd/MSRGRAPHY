export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">About the Filmmaker</h2>
          <p className="mt-4 leading-relaxed">
            I’m a wedding cinematographer focused on authentic storytelling. From quiet, intimate moments to the energy
            of the dance floor, I capture your day with cinematic composition, natural light, and clean, timeless color.
            My approach is calm, unobtrusive, and detail-oriented—so you can be fully present while I preserve the
            memories.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>• Documentary style with editorial polish</li>
            <li>• True-to-life color with subtle film-inspired tones</li>
            <li>• Licensed music and clean audio capture</li>
          </ul>
        </div>
        <div className="rounded-md border bg-muted/30 p-4">
          <video className="h-full w-full rounded-md" autoPlay  poster="/Videos/video.mp4">
            <source
              src="/Videos/video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      


    </section>
    
  )
}
