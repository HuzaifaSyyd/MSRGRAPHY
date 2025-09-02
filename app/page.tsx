import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Services  } from "@/components/landing/services"
import { PortfolioPreview } from "@/components/landing/portfolio-preview"
import { Contact } from "@/components/landing/contact"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <About />
      <Services />
      <PortfolioPreview />
      <Contact />
    </main>
  )
}
