"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import FileUpload from "@/components/video/fileUpload"
import { Button } from "../ui/button"

export default function VideoUploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [progress, setProgress] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUploadSuccess = async (res: any) => {
    try {
      setIsSubmitting(true)

      await axios.post("/api/videos", {
        title,
        description,
        videoUrl: res.filePath,
      })

      toast.success("Video metadata saved!")
      setTitle("")
      setDescription("")
      if (onUploaded) onUploaded()
    } catch (error) {
      toast.error("Failed to save video metadata.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
      setProgress(null)
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="mt-15 space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />
      <input
        type="text"
        placeholder="Video description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg p-3"
        required
      />

      <FileUpload
        fileType="video"
        onSuccess={handleUploadSuccess}
        onProgress={(val) => setProgress(val)}
      />

      {progress !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !title || !description || progress !== null}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? "Saving..." : "Upload"}
      </Button>
    </form>
  )
}