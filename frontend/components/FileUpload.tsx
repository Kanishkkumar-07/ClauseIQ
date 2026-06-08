'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FileUpload() {

  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {

    if (!file) return

    setLoading(true)

    try {

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(
        "http://localhost:8000/upload",
        {
          method: "POST",
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      router.push(`/chat/${data.document_id}`)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {file && (
        <>
          <p>Selected: {file.name}</p>

          <button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

    </div>
  )
}