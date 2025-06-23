"use client"

import React, { useState } from "react"
import { upload } from "@imagekit/next"
import axios from "axios"
import toast from "react-hot-toast"

interface FileUploadProps {
  onSuccess: (res: any) => void
  onProgress?: (progress: number) => void
  fileType?: "image" | "video"
}

export default function FileUpload({ onSuccess, onProgress, fileType }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const validateFile = (file: File) => {
    if (fileType === 'video' && !file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file.")
      return false
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File size must be less than 100MB.")
      return false
    }
    return true
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !validateFile(file)) return

    setUploading(true)

    try {
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
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100
            onProgress(Math.round(percent))
          }
        },
      })

      toast.success("Upload successful!")
      onSuccess(res)
    } catch (error) {
      toast.error("Upload failed.")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  )
} 