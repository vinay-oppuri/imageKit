import VideoUploadForm from "@/components/video/videoUploadForm"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div className="p-4">
      
      <section className="bg-muted px-4 md:px-20 py-12">
        <h2 className="text-2xl font-bold mb-2">Share Your Story In 3 Easy Steps</h2>
        <p className="text-muted-foreground mb-8 max-w-xl">
          Whether it’s a travel adventure, tutorial, or funny moment—record and share your world with others.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">1. Record or Select Video</h4>
            <p className="text-muted-foreground text-sm">Shoot a new video or pick one from your device.</p>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">2. Upload & Add Details</h4>
            <p className="text-muted-foreground text-sm">
              Title, description, tags—let your audience discover your masterpiece.
            </p>
            <Link href="/upload" className="text-primary mt-2 block">Learn More →</Link>
          </div>
          <div className="bg-card p-6 rounded-xl shadow">
            <h4 className="font-bold mb-2">3. Share & Inspire</h4>
            <p className="text-muted-foreground text-sm">Publish your video and get discovered!</p>
          </div>
        </div>
      </section>

      <VideoUploadForm />
    </div>
  )
}

