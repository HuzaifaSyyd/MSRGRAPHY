import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PortfolioPreview() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Portfolio</h2>
        <Link href="/portfolio">
          <Button variant="link" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View full gallery →
          </Button>
        </Link>
      </div>
      <div className="mt-6 columns-1 gap-4 sm:columns-2 md:columns-3">
        <img
          alt="Wedding details macro"
          src="/Photos/image1.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image2.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image5.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image8.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image9.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image10.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image12.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image13.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        <img
          alt="Wedding details macro"
          src="/Photos/image15.jpg"
          className="mb-4 w-full break-inside-avoid rounded-md"
        />
        
      </div>
    </section>
  )
}
