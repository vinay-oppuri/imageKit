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
      className="min-h-screen px-4 md:px-20 py-10 bg-background overflow-x-hidden"
    >
      <div className="flex flex-col lg:flex-row gap-10 items-start justify-between max-w-7xl mx-auto">
        {/* Steps Section */}
        <section className="w-full lg:w-1/2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Share Your Story in 3 Easy Steps</h2>
            <p className="text-muted-foreground max-w-xl">
              Whether it&apos;s a travel adventure, tutorial, or funny moment—record and share your world with others.
            </p>
          </div>

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
        <section className="w-full lg:w-1/2 mb-20 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md border border-white/20 dark:border-zinc-800/30 rounded-xl shadow-xl p-6 md:p-10"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground">Upload Your Video</h1>
            <VideoUploadForm />
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}