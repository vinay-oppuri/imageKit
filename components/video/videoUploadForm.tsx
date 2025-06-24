"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import FileUpload from "@/components/video/fileUpload"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { upload } from "@imagekit/next"

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

      // Step 1: Get auth
      const authRes = await axios.get("/api/auth/imagekit-auth")
      const auth = authRes.data

      // Step 2: Upload to ImageKit
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

      // Step 3: Save metadata to your DB
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
    <form onSubmit={(e) => e.preventDefault()} className="mt-15 space-y-4 max-w-md mx-auto">
      <Input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg p-4"
        required
      />
      <Input
        type="text"
        placeholder="Video description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg p-4"
        required
      />

      <FileUpload
        fileType="video"
        onFileSelected={(selectedFile) => setFile(selectedFile)}
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
        onClick={handleSubmit}
        disabled={isSubmitting || !title || !description || !file}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? "Uploading..." : "Upload"}
      </Button>
    </form>
  )
}