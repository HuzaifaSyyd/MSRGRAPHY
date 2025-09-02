"use client"

import { Button } from "@/components/ui/button"
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-none md:h-[80vh]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/Videos/Backvideo.mp4"
      >
        <source src="/Videos/Backvideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white drop-shadow">
        MSR GRAPHY
        </h1>
        <p className="mt-4 max-w-2xl text-white/90 text-xl sm:text-2xl">
          <Typewriter
            words={[
              "Cinematography",
              "Wedding Cinematography",
              "Model Shoot"
            ]}
            loop={0}                 // 0 = infinite
            cursor
            cursorStyle="|"
            typeSpeed={80}           // typing speed
            deleteSpeed={50}         // deleting speed
            delaySpeed={2000}        // delay between words
          />
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/#about">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Explore
                </Button>
              </Link>
           <Link href="/portfolio">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Gallery
                </Button>
              </Link>
        </div>
      </div>
    </section>
  )
}
