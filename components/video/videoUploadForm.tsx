'use client'

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import FileUpload from "@/components/video/fileUpload"
import { Button } from "../ui/button"
import { upload } from "@imagekit/next"
import { Heading, Text } from "lucide-react"

export default function VideoUploadForm({ onUploaded }: { onUploaded?: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [progress, setProgress] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select a file first.")
      return
    }

    try {
      setIsSubmitting(true)

      const authRes = await axios.get("/api/auth/imagekit-auth")
      const auth = authRes.data

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100
            setProgress(Math.round(percent))
          }
        },
      })

      const fullVideoUrl = `${process.env.NEXT_PUBLIC_URL_ENDPOINT}/${res.filePath}`
      await axios.post("/api/videos", {
        title,
        description,
        videoUrl: fullVideoUrl,
        thumbnailUrl: `${fullVideoUrl}?tr=w-400,so-1`,
      })

      toast.success("Video uploaded successfully!")
      setTitle("")
      setDescription("")
      setFile(null)
      if (onUploaded) onUploaded()
    } catch (error) {
      toast.error("Upload failed.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
      setProgress(null)
    }
  }

  return (
    <div className="backdrop-blur-md bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-zinc-700/40 rounded-xl shadow-xl p-6 max-w-md mx-auto mt-20 space-y-4">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Video title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-background outline-none"
          />
          <Heading className="text-foreground mr-3" size={18} />
        </div>

        <div tabIndex={0} className="flex items-center bg-background group border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Video description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 rounded-lg bg-background outline-none"
          />
          <Text className="text-foreground mr-3" size={18} />
        </div>

        <FileUpload
          fileType="video"
          onFileSelected={(selectedFile) => setFile(selectedFile)}
        />

        {progress !== null && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || !title || !description || !file}
          className="w-full"
        >
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  )
}