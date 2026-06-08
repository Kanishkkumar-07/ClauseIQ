'use client'

import { useParams } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'

export default function ChatPage() {

  const params = useParams()

  const documentId = params.documentId as string

  return (
    <ChatInterface
      documentId={documentId}
    />
  )
}
