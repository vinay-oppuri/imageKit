import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Clipo - Discover & Share Videos",
  description: "Explore and share amazing videos from creators around the world on VidShare.",
}

export default function Home() {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20 py-10 md:py-20 bg-muted">
        <div className="max-w-lg">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Share Your Moments
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Discover <br /> Amazing Videos From Creators!
          </h1>
          <Button className="bg-primary hover:opacity-90 text-primary-foreground px-6 py-3 rounded-full">
            <Link href="/explore">Explore Now</Link>
          </Button>
        </div>
        <div className="relative w-full md:w-1/2 mb-10 md:mb-0">
          <div className="w-full h-48 md:h-80 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
            <span className="text-xl text-primary font-semibold">🎬 Featured Video Preview</span>
          </div>
        </div>
      </section>
  )
}