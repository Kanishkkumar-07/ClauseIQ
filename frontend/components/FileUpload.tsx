'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

export default function FileUpload() {

  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const selectedFile = e.dataTransfer.files?.[0]
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
    <main className="flex min-h-screen items-center justify-center bg-[oklch(0.098_0.008_264)] px-4 py-8 relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[oklch(0.68_0.22_264/0.05)] blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-[oklch(0.55_0.26_264/0.04)] blur-[100px] rounded-full" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(oklch(0.68 0.22 264) 1px, transparent 1px), linear-gradient(90deg, oklch(0.68 0.22 264) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo/Title */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[oklch(0.68_0.22_264/0.4)] rounded-2xl blur-[10px]" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.22_264)] to-[oklch(0.52_0.26_264)] text-white font-bold text-lg shadow-xl">
                CQ
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold tracking-tight text-[oklch(0.96_0.006_264)]">ClauseIQ</h1>
            </div>
          </div>
          <p className="text-xs text-[oklch(0.45_0.02_264)] tracking-wider font-light">
            AI-Powered Legal Document Analysis
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[oklch(0.22_0.015_264)]" />
          <div className="w-1 h-1 rounded-full bg-[oklch(0.68_0.22_264/0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[oklch(0.22_0.015_264)]" />
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed p-10 transition-all duration-300 group ${
            isDragging
              ? 'border-[oklch(0.68_0.22_264/0.8)] bg-[oklch(0.68_0.22_264/0.05)] shadow-[0_0_30px_oklch(0.68_0.22_264/0.15)]'
              : 'border-[oklch(0.22_0.015_264)] bg-[oklch(0.12_0.01_264)] hover:border-[oklch(0.35_0.05_264)] hover:bg-[oklch(0.13_0.012_264)]'
          }`}
        >
          {isDragging && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.68_0.22_264/0.08)] to-[oklch(0.52_0.26_264/0.04)] pointer-events-none" />
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={loading}
            className="sr-only"
            id="file-input"
          />

          <label
            htmlFor="file-input"
            className="flex cursor-pointer flex-col items-center gap-4 text-center"
          >
            <div className={`relative rounded-2xl p-4 transition-all duration-300 ${
              isDragging
                ? 'bg-[oklch(0.68_0.22_264/0.15)]'
                : 'bg-[oklch(0.17_0.012_264)] group-hover:bg-[oklch(0.20_0.015_264)]'
            }`}>
              {isDragging && (
                <div className="absolute inset-0 rounded-2xl bg-[oklch(0.68_0.22_264/0.2)] blur-sm" />
              )}
              <Upload
                className={`relative h-6 w-6 transition-all duration-300 ${
                  isDragging
                    ? 'text-[oklch(0.75_0.22_264)] scale-110'
                    : 'text-[oklch(0.52_0.02_264)] group-hover:text-[oklch(0.68_0.22_264)]'
                }`}
              />
            </div>
            <div className="space-y-1">
              <p className={`font-semibold transition-colors duration-200 ${
                isDragging ? 'text-[oklch(0.85_0.12_264)]' : 'text-[oklch(0.75_0.01_264)]'
              }`}>
                Drop your PDF here
              </p>
              <p className="text-sm text-[oklch(0.45_0.015_264)]">or click to browse files</p>
            </div>
          </label>
        </div>

        {/* Selected File Display */}
        {file && (
          <div className="rounded-xl bg-[oklch(0.13_0.01_264)] p-4 border border-[oklch(0.22_0.015_264)] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.68_0.22_264/0.15)] flex items-center justify-center flex-shrink-0">
              <span className="text-[oklch(0.68_0.22_264)] text-xs font-bold">PDF</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-[oklch(0.85_0.008_264)] truncate">{file.name}</p>
              <p className="text-xs text-[oklch(0.45_0.015_264)] mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="w-2 h-2 rounded-full bg-[oklch(0.72_0.18_150)] flex-shrink-0" />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-[oklch(0.17_0.012_264)]">
              <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.68_0.22_264)] via-[oklch(0.80_0.20_264)] to-[oklch(0.68_0.22_264)] animate-[shimmer_1.5s_linear_infinite] bg-[length:200%_100%]" />
            </div>
            <p className="text-xs text-[oklch(0.45_0.015_264)] tracking-wide font-light">Processing document…</p>
          </div>
        )}

        {/* Info Text */}
        <div className="rounded-xl bg-[oklch(0.68_0.22_264/0.06)] p-4 border border-[oklch(0.68_0.22_264/0.15)] flex items-start gap-3">
          <div className="w-1 h-full min-h-[32px] rounded-full bg-gradient-to-b from-[oklch(0.68_0.22_264)] to-[oklch(0.52_0.26_264)] flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[oklch(0.75_0.12_264)]">Supported Format</p>
            <p className="text-xs text-[oklch(0.52_0.08_264)] mt-0.5">PDF documents · up to 20 MB</p>
          </div>
        </div>

        {/* Upload Button */}
        <button
          disabled={!file || loading}
          onClick={handleUpload}
          className="relative w-full rounded-xl px-4 py-3.5 font-semibold text-white text-sm transition-all duration-200 overflow-hidden group disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.68_0.22_264)] to-[oklch(0.58_0.26_264)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.75_0.22_264)] to-[oklch(0.65_0.26_264)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="absolute inset-0 shadow-[0_8px_24px_oklch(0.68_0.22_264/0.35)] group-hover:shadow-[0_8px_32px_oklch(0.68_0.22_264/0.5)] transition-all duration-200 rounded-xl" />
          <span className="relative z-10 tracking-wide">
            {loading ? 'Uploading...' : 'Analyze Document'}
          </span>
        </button>
      </div>
    </main>
  )
}