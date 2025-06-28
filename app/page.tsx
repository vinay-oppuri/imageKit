'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { MotionButton } from "@/components/ui/motion-button"
import GlassCard from "@/components/ui/glass-card"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20 py-8 md:py-10 mt-20 md:mt-24 bg-background overflow-hidden">
        <div className="max-w-xl z-10">
          <motion.h2
            className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          >
            Share Your Moments
          </motion.h2>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground mb-6"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Discover <br /> Amazing Videos From Creators!
          </motion.h1>

          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-primary/60 backdrop-blur-md text-foreground border border-border px-6 py-3 rounded-full shadow-md"
          >
            <Link href="/explore">Explore Now</Link>
          </MotionButton>
        </div>

        {/* Preview Box */}
        <div className="relative w-full md:w-1/2 mb-12 md:mb-0 z-0">
          <div className="w-full h-60 md:h-96 rounded-2xl backdrop-blur-lg bg-muted/40 border border-border flex items-center justify-center shadow-xl">
            <span className="text-xl text-foreground font-medium">🎬 Featured Video Preview</span>
          </div>
          <div className="absolute -inset-2 rounded-2xl border-2 border-primary opacity-20 blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-20 py-10 text-center md:text-left bg-background mb-20 md:mb-5">
        <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard
            title="🎥 Seamless Uploads"
            description="Easily share videos with the world using our user-friendly platform."
          />
          <GlassCard
            title="👥 Vibrant Community"
            description="Connect with fellow creators and viewers who share your passion."
          />
          <GlassCard
            title="🚀 Grow Your Audience"
            description="Get featured and boost your reach through our weekly spotlight."
          />
        </div>
      </section>
    </>
  )
}