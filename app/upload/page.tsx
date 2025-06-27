'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import VideoUploadForm from '@/components/video/videoUploadForm'

export default function UploadPage() {
  const steps = [
    {
      title: "1. Record or Select Video",
      desc: "Shoot a new video or pick one from your device.",
    },
    {
      title: "2. Upload & Add Details",
      desc: "Title, description, tags—let your audience discover your masterpiece.",
      link: true,
    },
    {
      title: "3. Share & Inspire",
      desc: "Publish your video and get discovered!",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 gap-8 px-4 md:px-20 py-12 mb-10 text-foreground"
    >
      {/* Steps Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Share Your Story in 3 Easy Steps</h2>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Whether it&apos;s a travel adventure, tutorial, or funny moment—record and share your world with others.
        </p>

        <div className="grid gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-muted/40 backdrop-blur-md border border-border p-6 rounded-xl shadow-md"
            >
              <h4 className="font-bold mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              {step.link && (
                <Link href="/upload" className="text-primary mt-2 inline-block">
                  Learn More →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upload Form Section */}
      <div className="w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Upload Here</h1>
        <div className="backdrop-blur-md bg-muted/30 border border-border p-6 rounded-xl shadow-lg">
          <VideoUploadForm />
        </div>
      </div>
    </motion.div>
  )
}