'use client'

import { CommunityCreate } from '@/components/dialogs'
import Link from 'next/link'
import { Communities } from '@/components/communites'
import { MotionButton } from '@/components/ui/motion-button'
import { motion } from 'framer-motion'

export default function Community() {
  return (
    <div className="mb-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-10 bg-muted/40 backdrop-blur-md border border-border text-foreground rounded-xl mx-4 md:mx-20 mt-10 mb-10 shadow-lg">
        {/* Left: Highlight Preview */}
        <div className="mb-6 md:mb-0 w-full md:w-1/3 h-48 md:h-60 bg-primary/20 rounded-xl flex items-center justify-center">
          <span className="text-primary font-semibold text-lg">🌟 Creator Highlight</span>
        </div>

        {/* Center: Heading + Subtext */}
        <div className="text-center md:text-left max-w-md md:mx-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">UNLEASH YOUR CREATIVITY</h2>
          <p className="text-muted-foreground mb-4">
            Make your voice heard, share your stories, and connect with the world through video.
          </p>
          <p className="text-primary font-bold">🎉 Get featured this week!</p>
        </div>

        {/* Right: Upload Button */}
        <MotionButton
          whileHover={{ scale: 1.05 }}
          className="mt-4 md:mt-0 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-md"
        >
          <Link href="/upload">Upload Now</Link>
        </MotionButton>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-4 md:px-20 py-12 bg-primary text-primary-foreground text-center rounded-xl mx-4 md:mx-20 mb-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Start Creating Today</h2>
        <p className="mb-6">Join thousands of creators sharing their stories and skills.</p>
        <div className="flex flex-row justify-center gap-3">
          <CommunityCreate />
        </div>
      </motion.section>

      {/* Community Cards */}
      <Communities />
    </div>
  )
}