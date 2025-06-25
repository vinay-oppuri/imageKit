import VideoUploadForm from "@/components/video/videoUploadForm"
import Link from "next/link"

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
    <div className="grid md:grid-cols-2 gap-8 px-4 md:px-20 py-12 mb-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Share Your Story in 3 Easy Steps</h2>
        <p className="text-muted-foreground mb-6 max-w-xl">
          Whether it&apos;s a travel adventure, tutorial, or funny moment—record and share your world with others.
        </p>
        <div className="grid gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl shadow">
              <h4 className="font-bold mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
              {step.link && (
                <Link href="/upload" className="text-primary mt-2 inline-block">
                  Learn More →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <div>
        <h1 className="text-center text-2xl font-bold mt-1 -mb-5">Upload Here</h1>
        <VideoUploadForm />
      </div>
    </div>
  )
}