// components/video/FileUpload.tsx
"use client"

import React from "react"
import toast from "react-hot-toast"

interface FileUploadProps {
  onFileSelected: (file: File) => void
  fileType?: "image" | "video"
}

export default function FileUpload({ onFileSelected, fileType }: FileUploadProps) {
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
    onFileSelected(file)
  }

  return (
    <div>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
      />
    </div>
  )
}