'use client'

import { useState } from "react"
import FileUpload from "@/components/FileUpload"

export default function Home() {

  const [documentId, setDocumentId] = useState("")

  return (
    <main>

      <h1>ClauseIQ</h1>

      <FileUpload
      />

      {documentId && (
        <p>Document ID: {documentId}</p>
      )}

    </main>
  )
}